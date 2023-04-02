<template>
  <div class="driver-page">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="司机账号:" label-width="120px">
              <el-input v-model="searchText.account" placeholder="请输入司机账号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机姓名:" label-width="120px">
              <el-input v-model="searchText.name" placeholder="请输入司机姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机手机号:" label-width="120px">
              <el-input v-model="searchText.phone" placeholder="请输入司机手机号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属机构:" label-width="120px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.agentId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left: 50px">
            <el-button type="primary" @click="getList()">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :row-style="{fontSize:'13px'}" v-loading="loading" :data="tableData"
                :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column label="序号" type="index"/>
        <el-table-column label="司机账号" prop="account"/>
        <el-table-column label="司机姓名" prop="name"/>
        <el-table-column label="司机手机号" prop="mobile"/>
        <el-table-column label="所属机构" prop="agency.name"/>
        <el-table-column label="工作状态">
          <template #default="{row}">
            <MyStatus :text="['休息','上班']" :status="row.workStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="$router.push(`/transit/driver-detail?formUrlName=司机管理&id=${row.userId}`)"
                       :underline="false"
                       style="color: #419eff">查看
              </el-link>
              <div class="split"></div>
              <el-link style="color: #419eff" :underline="false" @click="handleDisposition(row)">配置车辆</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 26px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[1,2,5,10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </el-card>
    <MyDialog @submit="handleSave" @cancel="cancel" :dialog-visible.sync="dialogVisible" title="配置车辆"
              class="dispathDialog">
      <template #content>
        <div class="header">
          <div class="name-l">
            <label>司机编号：</label>
            <span>{{ formData.userId }}</span>
          </div>
          <div class="name-r">
            <label>司机名称：</label>
            <span>{{ formData.name }}</span>
          </div>
          <div class="item-l">
            <label>司机电话：</label>
            <span>{{ formData.mobile }}</span>
          </div>
          <div class="item-r">
            <label>所属机构：</label>
            <span>{{ formData.agency.name }}</span>
          </div>
        </div>
        <div class="select-box">
          <div class="label">配置车辆</div>
          <el-select @change="handleTruckChange" v-model="formData.truck.id">
            <el-option v-for="item in unWorkingTruckList" :key="item.id" :label="item.licensePlate"
                       :value="item.id"/>
          </el-select>
        </div>
        <el-table :row-style="{fontSize:'13px'}" :data="carList"
                  :header-cell-style="{background:'#f8faff'}" stripe>
          <template #empty>
            <empty-img/>
          </template>
          <el-table-column label="车牌号" prop="licensePlate"/>
          <el-table-column label="车辆状态">
            <template #default="{row}">
              <MyStatus :text="['停用','启用']" :status="row.workStatus"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="165">
            <template #default="{row}">
              <div style="display: flex;align-items: center">
                <el-link @click="$router.push(`/transit/vehicle-detail/?id=${row.id}&formUrlName=车辆管理`)"
                         :underline="false" style="color: #419eff">查看
                </el-link>
                <div class="split"></div>
                <el-link type="danger" :underline="false" @click="handleDel">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getTreeOrganApi } from '@/api/organization-manage'
import { assignTruckToDriver, getDriverListPage, getUnworkTrucks } from '@/api/employees'

export default {
  name: 'operational-range',
  components: {
    Treeselect
  },
  data () {
    return {
      searchText: {},
      treeData: [],
      loading: false,
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      formData: {
        agency: { name: '' },
        truck: { id: '' }
      },
      unWorkingTruckList: [],
      carList: []
    }
  },
  methods: {
    async getTreeOrgan () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    },
    normalizer (node) {
      return {
        ...node,
        label: node.name
      }
    },
    reset () {
      this.searchText = {}
      this.getList()
    },
    async getList () {
      this.loading = true
      const { data } = await getDriverListPage({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
      this.loading = false
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange (current) {
      this.current = current
      this.getList()
    },
    async handleDisposition (row) {
      await this.$confirm('<p style="margin-bottom: 9px; color: rgb(51, 41, 41);">配置车辆需满足以下条件：</p><span style="width: 16px; height: 16px; background: rgb(250, 252, 255); border: 1px solid rgb(235, 238, 245); border-radius: 50%; display: inline-block; text-align: center; margin-right: 6px; line-height: 14px;">1</span><span data-v-0bfaddaa="" style="color: rgb(51, 41, 41);">司机信息已完善</span><span data-v-0bfaddaa="" style="width: 16px; height: 16px; background: rgb(250, 252, 255); border: 1px solid rgb(235, 238, 245); margin-left: 90px; border-radius: 50%; display: inline-block; text-align: center; line-height: 14px; margin-right: 6px;">2</span><span style="color: rgb(51, 41, 41); margin-right: 20px;">司机已设置排班</span><br/><span style="width: 16px; height: 16px; background: rgb(250, 252, 255); border: 1px solid rgb(235, 238, 245); margin-top: 10px; border-radius: 50%; display: inline-block; text-align: center; line-height: 14px; margin-right: 6px;">3</span><span data-v-0bfaddaa="" style="color: rgb(51, 41, 41);">司机绑定车辆未在启用状态</span>', '车辆配置', { dangerouslyUseHTMLString: true })
      this.formData = row
      this.carList = [this.formData.truck]
      this.dialogVisible = true
    },
    async getUnworkTrucks () {
      const { data } = await getUnworkTrucks()
      this.unWorkingTruckList = data
    },
    handleTruckChange (id) {
      this.carList = [this.unWorkingTruckList.find(item => item.id === id)]
    },
    handleDel () {
      this.formData.truck.id = ''
      this.carList = []
    },
    async handleSave () {
      await assignTruckToDriver({
        driverId: this.formData.userId,
        id: this.formData.id,
        truckId: this.formData.truck.id,
        transportTripsId: 0
      })
      this.$message.success('成功配置车辆')
      this.cancel()
    },
    cancel () {
      this.dialogVisible = false
      this.formData = {
        agency: { name: '' },
        truck: { id: '' }
      }
      this.carList = []
    }
  },
  created () {
    this.getTreeOrgan()
    this.getList()
    this.getUnworkTrucks()
  }
}
</script>

<style scoped lang="scss">
::v-deep .vue-treeselect__placeholder {
  line-height: 40px;
}

::v-deep .vue-treeselect__single-value {
  line-height: 40px;
}

.top-card {
  ::v-deep .el-card__body {
    padding-bottom: 0 !important;
  }
}

.el-table {
  border: 1px solid #eee;
  border-bottom: none;
  margin-bottom: 10px;

  .split {
    height: 14px;
    width: 1px;
    background: #d7dae2;
    margin: 0 10px;
  }
}

::v-deep .el-link--inner {
  font-size: 13px;
  font-weight: normal;
}

.dispathDialog {
  ::v-deep .el-dialog__body {
    padding: 20px;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    padding: 21px 52px;
    background-color: #fbfafa;

    .name-l, .item-l {
      width: 288px;
    }

    .name-l, .name-r {
      margin-bottom: 10px;
    }
  }

  .select-box {
    display: flex;
    align-items: center;
    margin: 20px 0;

    .label {
      margin-right: 10px;
    }
  }
}
</style>
