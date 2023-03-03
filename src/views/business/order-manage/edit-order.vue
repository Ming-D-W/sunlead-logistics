<template>
  <div class="edit-order">
    <el-card class="top-card">
      <el-row style="margin-bottom: 25px">
        <el-col :span="6">
          <div class="text-box">
            <div class="title">订单编号：</div>
            <div class="content">{{ $route.query.orderId }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">运单编号：</div>
            <div class="content">
              {{ orderInfo?.transportOrder?.id || '--' }}
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">下单时间：</div>
            <div class="content">{{ orderInfo.createTime }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">订单状态：</div>
            <div class="content">{{ orderInfo.status }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">预计到达日期：</div>
            <div class="content">{{ orderInfo.estimatedArrivalTime }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-collapse value="1">
      <el-collapse-item title="基本信息" name="1">
        <div style="padding: 25px 44px 0">
          <div class="send-box">
            <div class="top">
              <img src="@/assets/detail/location.png" alt=""/>
              发货方
            </div>
            <div class="content">
              <div class="cell">
                <span>发货方姓名:</span>{{ orderInfo.senderName }}
              </div>
              <div class="cell">
                <span>发货方电话:</span>{{ orderInfo.senderPhone }}
              </div>
            </div>
            <div class="content">
              <div class="cell"><span>发货方地址:</span>{{ senderPCC }}</div>
              <div class="cell">
                <span>详细地址:</span>{{ orderInfo.senderAddress }}
              </div>
            </div>
          </div>
          <div class="send-box">
            <div class="top">
              <img
                src="@/assets/detail/point.png"
                alt=""
                style="width: 17px; height: 17px"
              />
              收货方
            </div>
            <div class="content">
              <div class="cell">
                <span>收货方姓名:</span>{{ orderInfo.receiverPhone }}
              </div>
              <div class="cell">
                <span>收货方电话:</span>{{ orderInfo.receiverPhone }}
              </div>
            </div>
            <div class="content">
              <div class="cell"><span>收货方地址:</span>{{ receiverPCC }}</div>
              <div class="cell">
                <span>详细地址:</span>{{ orderInfo.receiverAddress }}
              </div>
            </div>
          </div>
          <div class="send-box">
            <div class="top bottom">
              <img src="@/assets/detail/flag.png" alt=""/>
              <div>
                <div>
                  距离：<span class="distance"
                >{{
                    GetDistance(
                      orderInfo?.senderCounty?.lat,
                      orderInfo?.senderCounty?.lng,
                      orderInfo?.receiverCounty?.lat,
                      orderInfo?.receiverCounty?.lng
                    )
                  }}km</span
                >
                </div>
                <div style="margin-top: 10px">备注：暂无</div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="取件信息" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-row>
            <el-col :span="6">
              所在网点：<span>{{ orderInfo?.taskPickup?.agency.name }}</span>
            </el-col>
            <el-col :span="6">
              取件类型：<span>{{ orderInfo?.taskPickup?.taskType === 0 ? '上门取件' : '' }}</span>
            </el-col>
            <el-col :span="6">
              作业状态：<span>{{ orderInfo?.taskPickup?.status === 1 ? '新任务' : '' }}</span>
            </el-col>
            <el-col :span="6">
              取件快递员：<span>{{ orderInfo?.taskPickup?.courier.name }}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="6">
              快递员电话：<span>{{ orderInfo?.taskPickup?.courier.mobile }}</span>
            </el-col>
            <el-col :span="6">
              预计取件时间： <span>{{ orderInfo?.taskPickup?.estimatedStartTime }}</span>
            </el-col>
            <el-col :span="6">
              取件完成时间：<span>{{ orderInfo?.taskPickup?.actualEndTime }}</span>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="运费信息" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-row>
            <el-col :span="8">
              运费：<span
              style="font-size: 18px;color: #ffb302;margin-right: 5px">{{ orderInfo?.amount }}</span><span>元</span>
            </el-col>
            <el-col :span="8">
              支付方式：<span>{{ orderInfo?.taskPickup?.paymentMethod === 1 ? '预结' : '到付' }}</span>
            </el-col>
            <el-col :span="8">
              付款状态：<span>{{ orderInfo?.taskPickup?.status === 1 ? '未付' : '已付' }}</span>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="运费信息" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-table show-summary v-loading="loading" :data="tableData" :header-cell-style="{background:'#f8faff'}"
                    stripe>
            <template #empty>
              <div class="empty-box">
                <img src="@/assets/icon-empty.png">
                <div>没有找到您要的内容哦~</div>
              </div>
            </template>
            <el-table-column label="序号" type="index" width="80px"/>
            <el-table-column label="货品名称">
              <template #default="{row}">
                <el-input v-if="type" clearable v-model="formData.name" size="mini"/>
                <span v-else>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="货品类型">
              <template #default="{row}">
                <el-select v-if="type" v-model="formData.goodsType.id" size="mini">
                  <el-option v-for="item in cargoTypeList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                <span v-else>{{ row.goodsType.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="重量（千克）" prop="totalWeight">
              <template #default="{row}">
                <el-input v-if="type" clearable v-model="formData.totalWeight" size="mini"/>
                <span v-else>{{ row.totalWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column label="体积（立方）" prop="totalVolume">
              <template #default="{row}">
                <el-input v-if="type" clearable v-model="formData.totalVolume" size="mini"/>
                <span v-else>{{ row.totalVolume }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{row}">
                <div style="display: flex;align-items: center">
                  <el-link @click="handleEdit(row)" :underline="false" style="color: #419eff">{{ btn1 }}</el-link>
                  <div class="split"></div>
                  <el-link type="danger" :underline="false" @click="handleDel(row.id)">{{ btn2 }}</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getCargoList, getOrderDetail, updateCargo } from '@/api/order-manage'
import tableInit from '@/mixins/tableInit'
import { delCargo, getCargoTypeList } from '@/api/employees'

export default {
  name: 'edit-order',
  mixins: [tableInit],
  data () {
    return {
      orderInfo: {},
      baseInfoUnfold: true,
      pickInfoUnfold: true,
      expendInfoUnfold: true,
      goodsInfoUnfold: true,
      type: false,
      formData: {
        goodsType: {
          name: ''
        }
      },
      cargoTypeList: []
    }
  },
  methods: {
    async getDetail () {
      const { data } = await getOrderDetail(this.$route.query.orderId)
      this.orderInfo = data
    },
    Rad (d) {
      return (d * Math.PI) / 180.0 // 经纬度转换成三角函数中度分表形式。
    },
    GetDistance (lat1, lng1, lat2, lng2) {
      const radLat1 = this.Rad(lat1)
      const radLat2 = this.Rad(lat2)
      const a = radLat1 - radLat2
      const b = this.Rad(lng1) - this.Rad(lng2)
      let s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)
          )
        )
      s = s * 6378.137 // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000 // 输出为公里
      s = s.toFixed(4)
      return s
    },
    async getList () {
      const { data } = await getCargoList(this.$route.query.orderId)
      this.tableData = data
    },
    async handleEdit (row) {
      if (!this.type) {
        this.formData = row
      } else {
        await this.validate()
        this.formData.goodsTypeId = this.formData.goodsType.id
        delete this.formData.goodsType
        await updateCargo(this.formData)
        this.$message.success('更新成功')
      }
      this.type = !this.type
    },
    validate () {
      return new Promise((resolve, reject) => {
        if (this.formData.goodsType.id === '' || this.formData.name === '' || this.formData.totalWeight === '' || this.formData.totalVolume === '') {
          this.$message.warning('不能为空')
          reject(new Error('不能为空'))
        } else {
          resolve()
        }
      })
    },
    async getCargoType () {
      const { data } = await getCargoTypeList()
      this.cargoTypeList = data
    },
    async handleDel (id) {
      if (!this.type) {
        await this.$confirm('确认删除吗')
        await delCargo(id)
        this.$message.success('删除成功')
      } else {
        this.type = !this.type
      }
    }
  },
  computed: {
    senderPCC () {
      return (
        this.orderInfo?.senderProvince?.name +
        this.orderInfo?.senderCity?.name +
        this.orderInfo?.senderCounty?.name || ''
      )
    },
    receiverPCC () {
      return (
        this.orderInfo?.receiverProvince?.name +
        this.orderInfo?.receiverCity?.name +
        this.orderInfo?.receiverCounty?.name || ''
      )
    },
    btn1 () {
      return this.type ? '保存' : '编辑'
    },
    btn2 () {
      return this.type ? '取消' : '删除'
    }
  },
  created () {
    this.getDetail()
    this.getCargoType()
  }
}
</script>

<style scoped lang="scss">
.edit-order {
  padding: 0 10px 70px;

  ::v-deep .el-card__body {
    transition: all 0.5s ease;
    padding: 25px 44px;
  }

  .top-card {
    .text-box {
      display: flex;
      font-size: 14px;
      font-weight: 400;

      .title {
        width: 102px;
      }

      .content {
        color: #818693;
        font-weight: 200;
      }
    }
  }

  .el-collapse {
    margin-top: 20px;

    .send-box {
      .top {
        margin-top: 10px;

        img {
          vertical-align: middle;
          display: inline-block;
          margin-right: 10px;
          width: 14px;
          height: 18px;
        }
      }

      .bottom {
        display: flex;
      }

      .distance {
        font-size: 13px;
        font-weight: 200;
      }

      .content {
        display: flex;
        font-size: 14px;
        font-weight: 200;
        margin-top: 15px;
        padding-left: 30px;

        .cell {
          width: 344px;

          span {
            margin-right: 15px;
            display: inline-block;
            width: 85px;
            text-align: end;
            font-weight: 400;
          }
        }
      }

      &:nth-last-of-type(-n + 2) {
        margin-top: 35px;
      }
    }

    ::v-deep .el-collapse-item__header {
      background-color: #f7f9ff;
      padding: 0 44px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      font-weight: 700;
    }

    .pick-info {
      color: #20232a;
      font-size: 14px;

      span {
        color: #818693;
        font-weight: 300;
      }
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
