<template>
  <div class="operational-range">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="快递员账号:" label-width="120px">
              <el-input v-model="searchText.account" placeholder="请输入快递员账号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快递员姓名:" label-width="120px">
              <el-input v-model="searchText.name" placeholder="请输入快递员姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快递员手机号:" label-width="120px">
              <el-input v-model="searchText.phone" placeholder="请输入快递员手机号"/>
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
            <el-button type="primary" plain @click="reset">重置</el-button>
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
        <el-table-column label="快递员账号" prop="account"/>
        <el-table-column label="快递员姓名" prop="name"/>
        <el-table-column label="快递员手机号" prop="mobile"/>
        <el-table-column label="所属机构" prop="agency.name"/>
        <el-table-column label="工作状态">
          <template #default="{row}">
            <MyStatus :text="['上班','下班']" :status="row.workStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="$router.push(`/branches/MapContent?agencyName=${row.agency.name}&id=${row.userId}`)"
                       :underline="false"
                       style="color: #419eff">作业范围分配
              </el-link>
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
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getTreeOrganApi } from '@/api/organization-manage'
import { getDeliveryManApi } from '@/api/employees'

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
      total: 0
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
    },
    async getList () {
      this.loading = true
      const { data } = await getDeliveryManApi({
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
    }
  },
  created () {
    this.getTreeOrgan()
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.operational-range {
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
  }
}
</style>
