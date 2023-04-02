<template>
  <div class="car-register">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="运输任务编号:" label-width="120px">
              <el-input v-model="searchText.transportTaskId" placeholder="请输入运输任务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始地机构:" label-width="120px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.startAgencyId"
                placeholder="请选择目的地机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目的地机构:" label-width="120px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.endAgencyId"
                placeholder="请选择目的地机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="回车时间:" label-width="120px">
              <el-date-picker
                style="width: 100%"
                v-model="searchText.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆是否可用:" label-width="120px">
              <el-select style="width: 100%" v-model="searchText.isAvailable" placeholder="请选择">
                <el-option v-for="item in isAvailableOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
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
        <el-table-column label="运输任务编号" prop="transportTaskId"/>
        <el-table-column label="起始地机构" prop="startAgencyName"/>
        <el-table-column label="目的地机构" prop="endAgencyName"/>
        <el-table-column label="运单数量" prop="transportOrderNumber"/>
        <el-table-column label="出车时间" prop="outStorageTime"/>
        <el-table-column label="回车时间" prop="intoStorageTime"/>
        <el-table-column label="车牌号码" prop="licensePlate"/>
        <el-table-column label="车辆是否可用">
          <template #default="{row}">
            <MyStatus :text="['不可用','可用']" :status="row.isAvailable?1:0"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="$router.push(`/transit/car-register-info?id=${row.id}`)" :underline="false"
                       style="color: #419eff">查看
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTruckReturnListApi } from '@/api/car-manager'
import MyStatus from '@/components/MyStatus/index.vue'
import { getTreeOrganApi } from '@/api/organization-manage'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'car-register',
  components: {
    MyStatus,
    Treeselect
  },
  data () {
    return {
      searchText: {},
      isAvailableOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '可用',
          value: 1
        },
        {
          label: '不可用',
          value: 0
        }
      ],
      loading: false,
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      treeData: []
    }
  },
  methods: {
    async getList () {
      this.loading = true
      if (this.searchText.date) {
        this.searchText.intoStorageStartTime = this.$moment(this.searchText.date[0]).format('YYYY-MM-DD HH:mm:ss')
        this.searchText.intoStorageEndTime = this.$moment(this.searchText.date[1]).format('YYYY-MM-DD HH:mm:ss')
        delete this.searchText.date
      }
      const { data } = await getTruckReturnListApi({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = data.counts
      this.loading = false
    },
    reset () {
      this.searchText = {}
      this.getList()
    },
    async getTreeOrgan () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    },
    handleNodeClick () {
    },
    normalizer (node) {
      return {
        ...node,
        label: node.name
      }
    }
  },
  created () {
    this.getList()
    this.getTreeOrgan()
  }
}
</script>

<style scoped lang="scss">
.car-register {
  padding: 0 10px;

  .search-card {
    .el-col {
      padding: 0 10px;
    }

    ::v-deep .el-card__body {
      padding-bottom: 0;
    }
  }

  .el-table {
    border: 1px solid #eee;
    border-bottom: none;
    margin-bottom: 10px;
  }

  ::v-deep .vue-treeselect__placeholder {
    line-height: 40px;
  }

  ::v-deep .vue-treeselect__single-value {
    line-height: 40px;
  }
}
</style>
