<template>
  <div class="vehicle">
    <el-card class="search-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车辆类型" label-width="80px">
              <el-select clearable v-model="searchContent.truckTypeId" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in truckTypeIdOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号码" label-width="80px">
              <el-input v-model="searchContent.licensePlate" placeholder="请输入车牌号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="getList('search')">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tab-item">
      <el-row type="flex" justify="left">
        <div class="item" :class="{active:workStatus===''}" @click="changeStatus('')">
          <span>全部 </span>{{ statusPlus }}
        </div>
        <div class="item" :class="{active:workStatus===1}" @click="changeStatus(1)">
          <span>可用 </span>{{ statusCount['1'] }}
        </div>
        <div class="item" :class="{active:workStatus===0}" @click="changeStatus(0)">
          <span>停用 </span>{{ statusCount['0'] }}
        </div>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" style="margin-bottom: 20px" @click="handleAdd">新增车辆</el-button>
      <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <div class="empty-box">
            <img src="@/assets/icon-empty.png">
            <div>没有找到您要的内容哦~</div>
          </div>
        </template>
        <el-table-column label="序号" type="index" width="80px"/>
        <el-table-column label="车牌号码" prop="licensePlate"/>
        <el-table-column label="车辆类型" prop="truckTypeName"/>
        <el-table-column label="司机数量" prop="driverNum"/>
        <el-table-column label="车辆状态">
          <template #default="{row}">
            <MyStatus :status="row.workStatus" :text="['停用','可用']"/>
          </template>
        </el-table-column>
        <el-table-column label="GPS设备ID" prop="deviceGpsId"/>
        <el-table-column label="实载重量（T）" prop="allowableLoad"/>
        <el-table-column label="实载体积（方）" prop="allowableVolume"/>
        <el-table-column label="操作" width="220">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="$router.push(`/transit/vehicle-detail/?id=${row.id}&formUrlName=车辆管理`)"
                       :underline="false"
                       style="color: #419eff">
                查看详情
              </el-link>
              <div class="split"></div>
              <el-link type="danger" :underline="false" @click="handleDel(row.id)">停用</el-link>
              <div class="split"></div>
              <el-link @click="handleEdit(row)" :underline="false" style="color: #419eff">配置司机</el-link>
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
    <my-dialog :dialog-visible.sync="dialogVisible" @cancel="cancel" @submit="submit" title="新增车辆">
      <template #content>
        <el-form :model="formData" :rules="rules" ref="addForm">
          <el-form-item label="车辆类型" label-width="130px" prop="truckTypeId">
            <el-select v-model="formData.truckTypeId" style="width: 100%">
              <el-option v-for="item in truckTypeIdOptions" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号码" label-width="130px" prop="licensePlate">
            <el-input v-model="formData.licensePlate"/>
          </el-form-item>
          <el-form-item label="GPS设备ID" label-width="130px" prop="deviceGpsId">
            <el-input v-model="formData.deviceGpsId"/>
          </el-form-item>
        </el-form>
      </template>
    </my-dialog>
  </div>
</template>

<script>
import {
  addCarApi,
  getTruckPageApi,
  getTruckTypeSimpleApi,
  getWorkStatusApi
} from '@/api/car-manager'
import MyStatus from '@/components/MyStatus/index.vue'

export default {
  name: 'vehiclePage',
  components: { MyStatus },
  data () {
    const valiLicence = (rule, value, callback) => {
      const licenceRule = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/
      const res = licenceRule.test(value)
      if (!res) callback(new Error('请输入正确格式的车牌号'))
      callback()
    }
    return {
      truckTypeOptions: [],
      searchContent: {},
      truckTypeIdOptions: [],
      tableData: [],
      loading: false,
      workStatus: '',
      current: 1,
      pageSize: 10,
      total: 0,
      statusCount: {},
      formData: {},
      dialogVisible: false,
      rules: {
        truckTypeId: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        licensePlate: [{
          required: true,
          trigger: 'blur',
          validator: valiLicence
        }],
        deviceGpsId: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }]
      }
    }
  },
  methods: {
    async getList (text) {
      this.loading = true
      await this.getStatusCount()
      let params = {
        page: this.current,
        pageSize: this.pageSize
      }
      if (text) {
        params = {
          ...params,
          ...this.searchContent
        }
      }
      if (this.workStatus !== '') {
        params.workStatus = this.workStatus
      }
      const { data } = await getTruckPageApi(params)
      this.tableData = data.items
      this.total = parseInt(data.counts)
      this.loading = false
    },
    reset () {
      this.searchContent = {}
      this.getList()
    },
    async getTruckTypeSimple () {
      const { data } = await getTruckTypeSimpleApi()
      this.truckTypeIdOptions = data
    },
    handleAdd () {
      this.dialogVisible = true
    },
    changeStatus (status) {
      this.workStatus = status
      this.getList()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange (page) {
      this.current = page
      this.getList()
    },
    async getStatusCount () {
      const { data } = await getWorkStatusApi()
      this.statusCount = data
    },
    cancel () {
      this.$refs.addForm.resetFields()
      this.formData = {}
      this.dialogVisible = false
    },
    async submit () {
      await this.$refs.addForm.validate()
      await addCarApi(this.formData)
      this.$message.success('新增车辆成功')
      this.cancel()
      this.getList()
    }
  },
  created () {
    this.getTruckTypeSimple()
    this.getList()
  },
  computed: {
    statusPlus () {
      return parseInt(this.statusCount['0']) + parseInt(this.statusCount['1']) || ''
    }
  }
}
</script>

<style scoped lang="scss">
.vehicle {
  padding: 0 10px;

  .search-card {
    .el-col {
      padding: 0 10px;
    }

    ::v-deep .el-card__body {
      padding-bottom: 0;
    }
  }

  .tab-item {
    margin-top: 20px;

    ::v-deep .el-card__body {
      padding: 0;
    }

    .item {
      width: 120px;
      height: 48px;
      color: #e15536;
      text-align: center;
      line-height: 48px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;

      span {
        font-weight: normal;
      }
    }

    .active {
      background: #ffeeeb;
    }
  }

  .el-table {
    border: 1px solid #eee;
    border-bottom: none;
    margin-bottom: 10px;

    .empty-box {
      img {
        width: 336px;
        height: 236px;
      }
    }

    .split {
      height: 14px;
      width: 1px;
      background: #d7dae2;
      margin: 0 10px;
    }

    ::v-deep .el-input__suffix {
      display: block;
      padding-right: 10px;
      color: #000 !important;
    }
  }

}
</style>
