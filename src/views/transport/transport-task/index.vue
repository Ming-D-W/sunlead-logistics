<template>
  <div class="order-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务编号" label-width="100px">
              <el-input v-model="searchText.id" placeholder="请输入任务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务分配状态" label-width="100px">
              <el-select v-model="searchText.assignedStatus" placeholder="请选择" clearable>
                <el-option v-for="item in assignedStatusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="满载状态" label-width="100px">
              <el-select v-model="searchText.loadingStatus" placeholder="请选择" clearable>
                <el-option v-for="item in loadingStatusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车牌号码" label-width="100px">
              <el-input v-model="searchText.licensePlate" placeholder="请输入车牌号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始地机构" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.startAgencyId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目的地机构" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.endAgencyId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left: 10px">
          <el-button type="primary" @click="getList('search')">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tab-item">
      <el-row type="flex" justify="left">
        <div class="item" :class="{active:!searchText.status}" @click="changeStatus(1)">
          <span>全部 </span>{{ totalCount }}
        </div>
        <div class="item" :class="{active:searchText.status===1}" @click="changeStatus(1)">
          <span>待提货 </span>{{ statusCount[1] }}
        </div>
        <div class="item" :class="{active:searchText.status===2}" @click="changeStatus(2)">
          <span>进行中 </span>{{ statusCount[2] }}
        </div>
        <div class="item" :class="{active:searchText.status===4}" @click="changeStatus(4)">
          <span>已完成 </span>{{ statusCount[4] }}
        </div>
        <div class="item" :class="{active:searchText.status===5}" @click="changeStatus(5)">
          <span>已取消 </span>{{ statusCount[5] }}
        </div>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :row-style="{fontSize:'13px'}" v-loading="loading" :data="tableData"
                :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column label="序号" type="index"/>
        <el-table-column label="运输任务编号" prop="id" width="180px"/>
        <el-table-column label="车牌号码" prop="truck.licensePlate"/>
        <el-table-column label="起始地" prop="startAgency.name"/>
        <el-table-column label="目的地" prop="endAgency.name"/>
        <el-table-column label="运输任务状态" prop="status"/>
        <el-table-column label="车辆满载状态" prop="loadingStatus"/>
        <el-table-column label="任务分配状态" prop="assignedStatus" />
        <el-table-column label="计划发车时间" prop="planDepartureTime" width="160px"/>
        <el-table-column label="实际发车时间" prop="actualDepartureTime" width="160px"/>
        <el-table-column label="更新时间" prop="updated" width="160px"/>
        <el-table-column label="操作" width="160px" fixed="right">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link
                @click="$router.push(`/business/waybill-detail?id=${row.id}`)"
                :underline="false"
                style="color: #419eff">查看
              </el-link>
              <div class="split"></div>
              <el-link disabled :underline="false" @click="handleDel">删除</el-link>
              <div class="split"></div>
              <el-link disabled :underline="false" @click="handleDel">删除</el-link>
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
import tableInit from '@/mixins/tableInit'
import searchBox from '@/mixins/searchBox'
import { getTransportTaskCount, getTransportTaskList } from '@/api/transport'

export default {
  name: 'order-manage',
  mixins: [tableInit, searchBox],
  data () {
    return {
      assignedStatusOptions: [
        {
          label: '已分配',
          value: 2
        },
        {
          label: '待人工分配',
          value: 3
        }
      ],
      loadingStatusOptions: [
        {
          label: '满载',
          value: 2
        },
        {
          label: '空载',
          value: 3
        }
      ],
      searchText: {
        status: null
      },
      statusCount: {},
      transportStatusArray: []
    }
  },
  methods: {
    async getList () {
      this.loading = true
      const { data } = await getTransportTaskList({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
      this.loading = false
    },
    async changeStatus (newStatus) {
      this.searchText.status = newStatus
      this.getList()
    },
    async getTransportCount () {
      const { data } = await getTransportTaskCount()
      this.statusCount = data
    }
  },
  created () {
    this.getTransportCount()
  },
  computed: {
    totalCount () {
      let count = 0
      for (const key in this.statusCount) {
        count += parseInt(this.statusCount[key])
      }
      return count
    }
  }

}
</script>

<style scoped lang="scss">
.order-manage {
  ::v-deep .vue-treeselect__placeholder {
    line-height: 40px;
  }

  ::v-deep .vue-treeselect__single-value {
    line-height: 40px;
  }

  padding: 0 10px;

  .el-form-item {
    padding-right: 60px;
  }

  ::v-deep .el-select {
    width: 100%;
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

  .tab-item {
    margin-top: 20px;

    ::v-deep .el-card__body {
      padding: 0;
    }

    .item {
      width: 120px;
      height: 48px;
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
      color: #e15536;
    }
  }
}
</style>
