<template>
  <div class="order-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号" label-width="100px">
              <el-input v-model="searchText.id" placeholder="请输入订单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态" label-width="100px">
              <el-select v-model="searchText.status" placeholder="请输入订单状态" clearable>
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付费状态" label-width="100px">
              <el-select v-model="searchText.paymentStatus" placeholder="请输入付费状态" clearable>
                <el-option v-for="item in paymentStatusOptions" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发件人姓名" label-width="100px">
              <el-input v-model="searchText.senderName" placeholder="请输入发件人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件人电话" label-width="100px">
              <el-input v-model="searchText.senderPhone" placeholder="请输入发件人电话"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件人地址" label-width="100px">
              <el-row type="flex">
                <el-select v-model="searchText.senderProvinceId" placeholder="请选择省"
                           @change="handleChangeProvince('sender')">
                  <el-option v-for="item in sendProvinceList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select style="margin-left: 10px" v-model="searchText.senderCityId" placeholder="请选择市"
                           @change="handleChangeCity('sender')">
                  <el-option v-for="item in sendCityList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select style="margin-left: 10px" v-model="searchText.senderCountyId" placeholder="请选择县/区">
                  <el-option v-for="item in sendCountyList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收件人姓名" label-width="100px">
              <el-input v-model="searchText.receiverName" placeholder="请输入收件人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人电话" label-width="100px">
              <el-input v-model="searchText.receiverPhone" placeholder="请输入收件人电话"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人地址" label-width="100px">
              <el-row type="flex">
                <el-select v-model="searchText.receiverProvinceId" placeholder="请选择省"
                           @change="handleChangeProvince('receiver')">
                  <el-option v-for="item in receiverProvinceList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select style="margin-left: 10px" v-model="searchText.receiverCityId" placeholder="请选择市"
                           @change="handleChangeCity('receiver')">
                  <el-option v-for="item in receiverCityList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select style="margin-left: 10px" v-model="searchText.receiverCountyId" placeholder="请选择县/区">
                  <el-option v-for="item in receiverCountyList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left: 10px">
          <el-button type="primary" @click="getList('search')">搜索</el-button>
          <el-button @click="reset">重置</el-button>
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
        <el-table-column label="订单编号" prop="id" width="180px"/>
        <el-table-column label="运单编号" prop="transportOrder.id"/>
        <el-table-column label="下单时间" prop="createTime"/>
        <el-table-column label="订单状态" prop="status"/>
        <el-table-column label="发件人姓名" prop="senderName"/>
        <el-table-column label="发件人电话" prop="senderPhone"/>
        <el-table-column label="发件人地址">
          <template #default="{row}">
            {{ row.senderProvince.name }} {{ row.senderCity.name }} {{ row.senderCounty.name }}
          </template>
        </el-table-column>
        <el-table-column label="收件人姓名" prop="receiverName"/>
        <el-table-column label="收件人电话" prop="receiverPhone"/>
        <el-table-column label="收件人地址">
          <template #default="{row}">
            {{ row.receiverProvince.name }} {{ row.receiverCity.name }} {{ row.receiverCounty.name }}
          </template>
        </el-table-column>
        <el-table-column label="取件类型">
          <template #default="{row}">
            {{ row.pickupType === 1 ? '网点自寄' : '上门取件' }}
          </template>
        </el-table-column>
        <el-table-column label="付费类型" prop="licensePlate">
          <template #default="{row}">
            {{ row.paymentMethod === 1 ? '预结' : '到付' }}
          </template>
        </el-table-column>
        <el-table-column label="付费状态">
          <template #default="{row}">
            {{ row.paymentStatus === 1 ? '未付' : '已付' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link
                @click="$router.push(`/business/edit-order?orderId=${row.id}&status=${row.status}&pickUpType=${row.pickUpType}`)"
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
import { getCityOrArea, getProvince } from '@/api/organization-manage'
import { getOrderList } from '@/api/order-manage'

export default {
  name: 'order-manage',
  mixins: [tableInit, searchBox],
  data () {
    return {
      statusOptions: [
        {
          label: '待取件',
          value: 23000
        },
        {
          label: '已取件',
          value: 23001
        },
        {
          label: '网点自寄',
          value: 23002
        },
        {
          label: '网点入库',
          value: 23003
        },
        {
          label: '待装车',
          value: 23004
        },
        {
          label: '运输中',
          value: 23005
        },
        {
          label: '网点出库',
          value: 23006
        },
        {
          label: '待派送',
          value: 23007
        },
        {
          label: '派送中',
          value: 23008
        },
        {
          label: '已签收',
          value: 23009
        },
        {
          label: '拒收',
          value: 23010
        },
        {
          label: '已取消',
          value: 23011
        }
      ],
      paymentStatusOptions: [
        {
          label: '未付',
          value: 1
        },
        {
          label: '已付',
          value: 2
        }
      ],
      sendProvinceList: [],
      sendCityList: [],
      sendCountyList: [],
      receiverProvinceList: [],
      receiverCityList: [],
      receiverCountyList: []
    }
  },
  methods: {
    async getList () {
      const { data } = await getOrderList({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
    },
    async getProvince () {
      const { data } = await getProvince()
      this.sendProvinceList = data
      this.receiverProvinceList = data
    },
    async handleChangeProvince (type) {
      if (type === 'sender') {
        const { data } = await getCityOrArea(this.searchText.senderProvinceId)
        this.sendCityList = data
      } else {
        const { data } = await getCityOrArea(this.searchText.receiverProvinceId)
        this.receiverCityList = data
      }
    },
    async handleChangeCity (type) {
      if (type === 'sender') {
        const { data } = await getCityOrArea(this.searchText.senderCityId)
        this.sendCountyList = data
      } else {
        const { data } = await getCityOrArea(this.searchText.receiverCityId)
        this.receiverCountyList = data
      }
    }
  },
  created () {
    this.getProvince()
  }
}
</script>

<style scoped lang="scss">
.order-manage {
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
}
</style>
