<template>
  <div class="order-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="运单编号" label-width="100px">
              <el-input v-model="searchText.id" placeholder="请输入运单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号" label-width="100px">
              <el-input v-model="searchText.orderId" placeholder="请输入运单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调度状态" label-width="100px">
              <el-select v-model="searchText.schedulingStatus" placeholder="请选择" clearable>
                <el-option v-for="item in schedulingStatusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <el-col :span="8">
            <el-form-item label="当前所在机构" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.currentAgencyId"
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
        <div class="item" :class="{active:!searchText.status}" @click="changeStatus(null)">
          <span>全部 </span>{{ totalCount }}
        </div>
        <div class="item" :class="{active:searchText.status==='1'}" @click="changeStatus('1')">
          <span>新建 </span>{{ statusCount[1] }}
        </div>
        <div class="item" :class="{active:searchText.status==='2'}" @click="changeStatus('2')">
          <span>已装车 </span>{{ statusCount[2] }}
        </div>
        <div class="item" :class="{active:searchText.status==='3'}" @click="changeStatus('3')">
          <span>运输中 </span>{{ statusCount[3] }}
        </div>
        <div class="item" :class="{active:searchText.status==='4'}" @click="changeStatus('4')">
          <span>到达终端网点 </span>{{ statusCount[4] }}
        </div>
        <div class="item" :class="{active:searchText.status==='6'}" @click="changeStatus('6')">
          <span>拒收 </span>{{ statusCount[6] }}
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
        <el-table-column label="运单编号" prop="id" width="180px"/>
        <el-table-column label="运单编号" prop="orderId"/>
        <el-table-column label="运单状态" prop="status"/>
        <el-table-column label="起始营业部" prop="startAgencyName"/>
        <el-table-column label="终点营业部" prop="endAgencyName"/>
        <el-table-column label="当前所在机构" prop="currentAgencyName"/>
        <el-table-column label="下一个机构" prop="nextAgencyName"/>
        <el-table-column label="货品总体积（立方米）" prop="totalVolume" width="180px"/>
        <el-table-column label="货品总重量（千克）" prop="totalWeight" width="180px"/>
        <el-table-column label="创建时间" prop="created"/>
        <el-table-column label="更新时间" prop="updated"/>
        <el-table-column label="操作" width="120px" fixed="right">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link
                @click="$router.push(`/business/waybill-detail?id=${row.id}`)"
                :underline="false"
                style="color: #419eff">查看详情
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
import tableInit from '@/mixins/tableInit'
import searchBox from '@/mixins/searchBox'
import { getTransportCount, getTransportOrderList } from '@/api/order-manage'

export default {
  name: 'order-manage',
  mixins: [tableInit, searchBox],
  data () {
    return {
      schedulingStatusOptions: [
        {
          label: '待调度',
          value: 1
        },
        {
          label: '未匹配线路',
          value: 2
        },
        {
          label: '到达终端网点',
          value: 3
        }
      ],
      searchText: {
        status: null
      },
      statusCount: {}
    }
  },
  methods: {
    async getList () {
      const { data } = await getTransportOrderList({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
    },
    async changeStatus (newStatus) {
      this.searchText.status = newStatus
      this.getList()
    },
    async getTransportCount () {
      const { data } = await getTransportCount()
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
