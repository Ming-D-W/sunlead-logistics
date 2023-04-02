<template>
  <div class="edit-order">
    <el-card class="top-card">
      <el-row style="margin-bottom: 25px">
        <el-col :span="6">
          <div class="text-box">
            <div class="title">订单编号：</div>
            <div class="content">{{ orderInfo.orderId }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">运单编号：</div>
            <div class="content">
              {{ orderInfo?.id || '--' }}
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">下单时间：</div>
            <div class="content">{{ orderInfo.created }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">订单状态：</div>
            <div class="content">{{ statusList[orderInfo.status - 1] }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="text-box">
            <div class="title">预计到达日期：</div>
            <div class="content">{{ orderInfo.order?.estimatedArrivalTime }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-collapse value="1">
      <el-collapse-item title="基本信息" name="1">
        <div style="padding: 25px 44px 0;position: relative">
          <div class="line"></div>
          <div class="send-box">
            <div class="top">
              <img src="@/assets/detail/location.png" alt=""/>
              发货方
            </div>
            <div class="content">
              <div class="cell">
                <span>发货方姓名:</span>{{ orderInfo.order?.senderName }}
              </div>
              <div class="cell">
                <span>发货方电话:</span>{{ orderInfo.order?.senderPhone }}
              </div>
            </div>
            <div class="content">
              <div class="cell"><span>发货方地址:</span>{{ senderPCC }}</div>
              <div class="cell">
                <span>详细地址:</span>{{ orderInfo.order?.senderAddress }}
              </div>
            </div>
          </div>
          <div class="send-box">
            <div class="top">
              <img
                src="@/assets/detail/point.png"
                alt=""
                style="width: 17px; height: 17px;margin-left: -2px;margin-right: 12px"
              />
              收货方
            </div>
            <div class="content">
              <div class="cell">
                <span>收货方姓名:</span>{{ orderInfo.order?.receiverPhone }}
              </div>
              <div class="cell">
                <span>收货方电话:</span>{{ orderInfo.order?.receiverPhone }}
              </div>
            </div>
            <div class="content">
              <div class="cell"><span>收货方地址:</span>{{ receiverPCC }}</div>
              <div class="cell">
                <span>详细地址:</span>{{ orderInfo.order?.receiverAddress }}
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="运输信息" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-steps :active="activeSteps" finish-status="success" :space="300" align-center style="margin-left: -100px">
            <el-step v-for="item in lineList" :key="item.bid" :title="item.name"/>
          </el-steps>
          <div class="description">
            <div class="item" v-for="item in taskTransportsList" :key="item.id">
              <div class="label">运输任务:</div>
              <div class="content" style="color: #419eff">{{ item.id }}</div>
              <div class="label">车辆:</div>
              <div class="content">{{ item.truck.licensePlate }}</div>
              <div class="label">司机:</div>
              <div class="content"><span v-for="(drive,index) in item.drivers" :key="drive.id">{{
                  drive.name
                }}{{ item.drivers.length === index + 1 ? '' : ',' }}</span></div>
              <div class="label">到达时间:</div>
              <div class="content">{{ item.actualArrivalTime }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="运费信息" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#f8faff'}"
                    stripe>
            <template #empty>
              <div class="empty-box">
                <img src="@/assets/icon-empty.png">
                <div>没有找到您要的内容哦~</div>
              </div>
            </template>
            <el-table-column label="序号" type="index" width="80px"/>
            <el-table-column label="货品名称" prop="name"/>
            <el-table-column label="货品类型" prop="goodsType.name"/>
            <el-table-column label="重量（千克）" prop="totalWeight"/>
            <el-table-column label="体积（立方）" prop="totalVolume"/>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getTransportOrderDetail } from '@/api/order-manage'
import tableInit from '@/mixins/tableInit'

export default {
  name: 'edit-order',
  mixins: [tableInit],
  data () {
    return {
      orderInfo: {},
      formData: {
        goodsType: {
          name: ''
        }
      },
      statusList: ['新建', '已装车', '运输中', '到达终端网点', '拒收'],
      lineList: [],
      taskTransportsList: []
    }
  },
  methods: {
    async getList () {
      const { data } = await getTransportOrderDetail(this.$route.query.id)
      this.orderInfo = data
      this.lineList = JSON.parse(data.transportLine).nodeList
      this.taskTransportsList = data.taskTransports
      this.tableData = data.order.orderCargoDTOS
    }
  },
  computed: {
    senderPCC () {
      return (
        this.orderInfo?.order?.senderProvince?.name +
        this.orderInfo?.order?.senderCity?.name +
        this.orderInfo?.order?.senderCounty?.name || ''
      )
    },
    receiverPCC () {
      return (
        this.orderInfo?.order?.receiverProvince?.name +
        this.orderInfo?.order?.receiverCity?.name +
        this.orderInfo?.order?.receiverCounty?.name || ''
      )
    },
    activeSteps () {
      let num = 0
      this.lineList.forEach(item => {
        num += item.status ? 1 : 0
      })
      return num
    }
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

    .line {
      width: 1px;
      height: 110px;
      border-left: 1px dashed #dcdcdd;
      position: absolute;
      top: 86px;
      left: 50px;
    }

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
      .description {
        margin-left: 70px;
        margin-top: 10px;
        display: flex;

        .item {
          position: relative;
          background: #f4f8fc;
          border-radius: 8px;
          padding: 14px 15px;
          font-size: 14px;
          color: #20232a;
          font-weight: 400;
          display: flex;
          flex-wrap: wrap;
          width: 220px;

          &:not(:first-child) {
            margin-left: 55px;
          }

          .label {
            width: 70px;
          }

          .content {
            width: 149px;
            color: #818693;
          }

          &::before {
            content: "";
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 50px 16px 50px 16px;
            border-color: transparent transparent #f4f8fc transparent;
            top: -90px;
            left: 117px;
          }
        }
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

  ::v-deep .el-step__head.is-success {
    color: #419eff;
    border-color: #419eff;
  }

  ::v-deep .el-step__icon.is-text {
    border: 1px solid #419eff;
  }

  ::v-deep .el-step.is-horizontal .el-step__line {
    top: 20px;
    height: 1px;
  }

  ::v-deep .el-step__line-inner {
    border: none;
    height: 0;
  }

  ::v-deep .el-step__line {
    background-color: #419eff;
  }

  ::v-deep .el-step__icon {
    width: 40px;
    height: 40px;
  }

  ::v-deep .el-step__title.is-success {
    font-size: 14px;
    font-weight: 400;
    color: #20232a;
  }
}
</style>
