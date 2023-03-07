<template>
  <div class="order-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="取件任务编号:" label-width="100px">
              <el-input v-model="searchText.id" placeholder="请输入取件任务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号:" label-width="100px">
              <el-input v-model="searchText.orderId" placeholder="请输入取件订单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属营业部:" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.agencyId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预计完成时间:" label-width="100px">
              <el-date-picker
                v-model="searchText.endTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际完成时间:" label-width="100px">
              <el-date-picker
                v-model="searchText.actualTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务分配状态:" label-width="100px">
              <el-select v-model="searchText.assignedStatus" placeholder="请选择" clearable>
                <el-option v-for="item in assignedStatusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
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
        <div class="item" :class="{active:!searchText.status}" @click="changeStatus(null)">
          <span>全部 </span>
        </div>
        <div class="item" :class="{active:searchText.status===1}" @click="changeStatus(1)">
          <span>新任务 </span>
        </div>
        <div class="item" :class="{active:searchText.status===2}" @click="changeStatus(2)">
          <span>已完成 </span>
        </div>
        <div class="item" :class="{active:searchText.status===5}" @click="changeStatus(5)">
          <span>已取消 </span>
        </div>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" @click="handleAssign" style="margin-bottom: 20px">人工分配</el-button>
      <el-table :row-style="{fontSize:'13px'}" v-loading="loading" :data="tableData"
                :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column
          :selectable="selectableFunc"
          type="selection"
          width="55"/>
        <el-table-column label="序号" type="index"/>
        <el-table-column label="取件作业编号" prop="id" width="180px"/>
        <el-table-column label="所在营业部" prop="agencyName"/>
        <el-table-column label="任务分配状态">
          <template #default="{row}">
            <MyStatus :text="['已分配','待人工分配']" :status="row.assignedStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="快递员姓名" prop="courierName"/>
        <el-table-column label="订单编号" prop="orderId"/>
        <el-table-column label="预计开始时间" prop="estimatedStartTime"/>
        <el-table-column label="预计完成时间" prop="estimatedEndTime"/>
        <el-table-column label="实际完成时间" prop="actualEndTime"/>
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
import { getPickupMissionList } from '@/api/transport'

export default {
  name: 'pick-page',
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
      searchText: {
        taskType: 1,
        status: null
      },
      statusCount: {},
      transportStatusArray: []
    }
  },
  methods: {
    async getList () {
      this.loading = true
      if (this.searchText.endTime) {
        this.searchText.minEstimatedEndTime = this.$moment(this.searchText.endTime[0].format('YYYY-MM-DD HH:mm:ss'))
        this.searchText.maxEstimatedEndTime = this.$moment(this.searchText.endTime[1].format('YYYY-MM-DD HH:mm:ss'))
      }
      if (this.searchText.actualTime) {
        this.searchText.minActualEndTime = this.$moment(this.searchText.actualTime[0].format('YYYY-MM-DD HH:mm:ss'))
        this.searchText.maxActualEndTime = this.$moment(this.searchText.actualTime[1].format('YYYY-MM-DD HH:mm:ss'))
      }
      const { data } = await getPickupMissionList({
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
    selectableFunc (row, index) {
      return false
    },
    handleAssign () {
      this.$message.error('请选择要分配的作业')
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

  ::v-deep .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
  }
}
</style>
