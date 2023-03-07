<template>
  <div class="dashboard-page">
    <el-row>
      <el-col :span="14">
        <el-card class="overview">
          <p class="p-t">机构概述</p>
          <div class="overview-content">
            <div class="left">
              <div class="organName">{{ organOverview.organName }}</div>
              <div class="address">地址：{{ organOverview.organAddress }}</div>
              <div class="people">负责人：{{ `${organOverview.principal} ${organOverview.phone}` }}</div>
              <el-button type="primary" plain> 查看营业部分布</el-button>
            </div>
            <div class="right">
              <div class="item">
                <div class="box">
                  <div class="label">分拣中心(个)</div>
                  <div class="num">{{ organOverview.sortingCenterNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div class="box" style="padding-right: 25px">
                  <div class="label">营业部(个)</div>
                  <div class="num">{{ organOverview.agencyNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div class="box">
                  <div class="label">司机人数(个)</div>
                  <div class="num">{{ organOverview.driverNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div class="box">
                  <div class="label">快递员人数(个)</div>
                  <div class="num">{{ organOverview.courierNumber }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="today-data">
          <div class="header">
            <p class="p-t">今日数据</p>
            <div class="refresh-box">{{ $moment(new Date()).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
          <div class="content">
            <div class="item">
              <div class="top tac">订单金额(元)</div>
              <div class="middle tac">
                <animate-number from="0" :to="todayData.orderAmount" :key="todayData.orderAmount"
                                duration="1500"></animate-number>
              </div>
              <div class="bottom">较昨日 +{{ todayData.orderAmountChanges }}</div>
            </div>
            <div class="item">
              <div class="top tac">订单数量(笔)</div>
              <div class="middle tac">
                <animate-number from="0" :to="todayData.orderNumber" :key="todayData.orderNumber"
                                duration="1500"></animate-number>
              </div>
              <div class="bottom">较昨日 +{{ todayData.orderNumberChanges }}</div>
            </div>
            <div class="item">
              <div class="top tac">运输任务(次)</div>
              <div class="middle tac">
                <animate-number from="0" :to="todayData.transportTaskNumber" :key="todayData.transportTaskNumber"
                                duration="1500"></animate-number>
              </div>
              <div class="bottom">较昨日 +{{ todayData.transportTaskNumberChanges }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-card class="backlog">
          <div class="header">
            <p class="p-t title">代办任务
              <el-tooltip effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                <template #content>
                  123123
                </template>
                <img src="@/assets/question.png" alt="tooltips" style="width: 20px;height: 20px;">
              </el-tooltip>
            </p>
            <div class="refresh-box">{{
                $moment(new Date()).format('YYYY-MM-DD HH:mm')
              }} - {{ $moment(Date.now() + 86400000).format('YYYY-MM-DD') }} 23:59
            </div>
          </div>
          <div class="charts-container">
            <div ref="charts" class="chart"/>
            <div ref="chartsTwo" class="chart"/>
            <div ref="chartsThree" class="chart"/>
            <div ref="chartsForth" class="chart"/>
          </div>
          <div class="charts-container">
            <div class="label">
              <span>代取件 </span>
              <span style="color: #d15e41">{{ backlog.waitingPickupNumber }}</span>
            </div>
            <div class="label">
              <span>代派件 </span>
              <span style="color: #d15e41">{{ backlog.waitingDispatchNumber }}</span>
            </div>
            <div class="label">
              <span>未分配运输 </span>
              <span style="color: #d15e41">{{ backlog.unassignedTransportTaskNumber }}</span>
            </div>
            <div class="label">
              <span>超超时运输 </span>
              <span style="color: #d15e41">{{ backlog.timeoutTransportTaskNumber }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="backlog">
          <div class="header">
            <p class="p-t title">执行中任务
              <el-tooltip effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                <template #content>
                  123123
                </template>
                <img src="@/assets/question.png" alt="tooltips" style="width: 20px;height: 20px;">
              </el-tooltip>
            </p>
            <div class="refresh-box">{{ $moment(new Date()).format('YYYY-MM-DD HH:mm') }}
            </div>
          </div>
          <div class="charts-container">
            <div ref="chartsFive" class="chart" style="width: 50%"/>
            <div ref="chartsSix" class="chart" style="width: 50%"/>
          </div>
          <div class="charts-container">
            <div class="label" style="width: 50%">
              <span>代取件 </span>
              <span style="color: #d15e41">{{ backlog.waitingPickupNumber }}</span>
            </div>
            <div class="label" style="width: 50%">
              <span>代派件 </span>
              <span style="color: #d15e41">{{ backlog.waitingDispatchNumber }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="functions">
          <div class="header">
            <p class="p-t">常用功能</p>
          </div>
          <div class="function-box">
            <div class="item" @click="$router.push('/branches/operational')">
              <div class="icon">
                <img src="@/assets/functions/trans-work.png" alt="快递作业">
              </div>
              <div class="content">快递作业</div>
            </div>
            <div class="item" @click="$router.push('/transport/transport-task')">
              <div class="icon">
                <img src="@/assets/functions/trans-mission.png" alt="运输任务">
              </div>
              <div class="content">运输任务</div>
            </div>
            <div class="item" @click="$router.push('/transport/line-manage')">
              <div class="icon">
                <img src="@/assets/functions/line-manager.png" alt="线路管理">
              </div>
              <div class="content">线路管理</div>
            </div>
            <div class="item" @click="$router.push('/transit/vehicle')">
              <div class="icon">
                <img src="@/assets/functions/car-manager.png" alt="车辆管理">
              </div>
              <div class="content">车辆管理</div>
            </div>
            <div class="item" @click="$router.push('/transit/driver')">
              <div class="icon">
                <img src="@/assets/functions/driver-manager.png" alt="司机管理">
              </div>
              <div class="content">司机管理</div>
            </div>
            <div class="item" @click="$router.push('/transit/freight-manage')">
              <div class="icon">
                <img src="@/assets/functions/money-check.png" alt="运费查询">
              </div>
              <div class="content">运费查询</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card>
          <p class="p-t">线路管理</p>
          <div ref="lineManagerCharts" style="height: 401px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="trans-mission">
          <p class="p-t">运输任务</p>
          <auto-table :tableData="transportTaskList"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="order-total">
          <div class="header">
            <p class="p-t">订单总量</p>
            <div class="right">2022-08 - 2023-01</div>
          </div>
          <div class="unit">
            单位：笔
          </div>
          <div class="order-static">
            <div class="item">
              <div class="num">{{ orderLineChart.orderMaxNumber }}</div>
              <div class="label">订单最高值</div>
            </div>
            <div class="item">
              <div class="num">{{ orderLineChart.orderAverageNumber }}</div>
              <div class="label">订单平均值</div>
            </div>
            <div class="item">
              <div class="num">{{ orderLineChart.orderMinNumber }}</div>
              <div class="label">订单最低值</div>
            </div>
          </div>
          <div ref="order-charts" class="order-charts"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="order-total">
          <div class="header">
            <p class="p-t">订单分布</p>
            <div class="right">2022-08 - 2023-01</div>
          </div>
          <div class="unit">
            单位：笔
          </div>
          <div ref="distribution-charts" class="order-charts" style="height: 480px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import chinaMap from '@/assets/json/china.json'
import { getWorkspace } from '@/api/workspace'
import {
  // lineManager,
  liquidFillForth,
  liquidFillOne,
  liquidFillThree,
  liquidFillTwo,
  orderCount,
  orderDistribution
} from '@/utils/echarts'
import AutoTable from '@/views/dashboard/components/AutoTable/index.vue'
import { option } from '@/utils/chinaMap'

export default {
  name: 'dashboard-page',
  components: { AutoTable },
  data () {
    return {
      backlog: {},
      orderLineChart: {},
      organOverview: {},
      todayData: {
        orderAmount: 0,
        orderNumber: 0,
        transportTaskNumber: 0
      },
      transportTaskList: []
    }
  },
  methods: {
    async initData () {
      this.$echarts.registerMap('china', { geoJSON: chinaMap })
      const {
        data: {
          backlog,
          orderLineChart,
          organOverview,
          todayData,
          transportTaskList
        }
      } = await getWorkspace()
      this.backlog = backlog
      this.organOverview = organOverview
      this.orderLineChart = orderLineChart
      this.todayData = todayData
      this.transportTaskList = transportTaskList
    },
    initMyCharts () {
      const that = this
      const myChartOne = this.$echarts.init(this.$refs.charts)
      const myChartTwo = this.$echarts.init(this.$refs.chartsTwo)
      const myChartThree = this.$echarts.init(this.$refs.chartsThree)
      const myChartForth = this.$echarts.init(this.$refs.chartsForth)
      const myChartFive = this.$echarts.init(this.$refs.chartsFive)
      const myChartSix = this.$echarts.init(this.$refs.chartsSix)

      const options = liquidFillOne(this.backlog.waitingPickupRate)
      const optionsTwo = liquidFillTwo(this.backlog.waitingDispatchRate)
      const optionsThree = liquidFillThree(this.backlog.unassignedTransportTaskRate)
      const optionsForth = liquidFillForth(this.backlog.timeoutTransportTaskRate)
      const optionsFive = liquidFillOne(this.todayData.taskInTransitRate)
      const optionsSix = liquidFillTwo(this.todayData.taskInDeliveryRate)

      // 订单总量
      const orderCharts = this.$echarts.init(this.$refs['order-charts'])
      const xData = this.orderLineChart.monthlyOrderList.map(item => item.dateTime)
      const yData = this.orderLineChart.monthlyOrderList.map(item => item.orderNumber)
      const orderOptions = orderCount(that, xData, yData)

      // 订单分布
      const distributionCharts = this.$echarts.init(this.$refs['distribution-charts'])
      const distributionOptions = orderDistribution()

      // 线路管理
      // const arr = [
      //   [
      //     {
      //       name: '北京'
      //     },
      //     {
      //       name: '浙江'
      //     }
      //   ], [
      //     {
      //       name: '安徽'
      //     },
      //     {
      //       name: '浙江'
      //     }
      //   ], [
      //     {
      //       name: '湖南'
      //     },
      //     {
      //       name: '浙江'
      //     }
      //   ], [
      //     {
      //       name: '四川'
      //     },
      //     {
      //       name: '浙江'
      //     }
      //   ], [
      //     {
      //       name: '青海'
      //     },
      //     {
      //       name: '浙江'
      //     }
      //   ]
      // ]
      const lineManagerCharts = this.$echarts.init(this.$refs.lineManagerCharts)
      // const lineManagerOptions = lineManager(arr)
      const lineManagerOptions = option

      myChartOne.setOption(options)
      myChartTwo.setOption(optionsTwo)
      myChartThree.setOption(optionsThree)
      myChartForth.setOption(optionsForth)
      myChartFive.setOption(optionsFive)
      myChartSix.setOption(optionsSix)
      orderCharts.setOption(orderOptions)
      distributionCharts.setOption(distributionOptions)
      lineManagerCharts.setOption(lineManagerOptions)
    }
  },
  async mounted () {
    await this.initData()
    this.transportTaskList = [...this.transportTaskList, ...this.transportTaskList, ...this.transportTaskList]
    this.initMyCharts(this.backlog)
  }
}
</script>

<style scoped lang="scss">
.dashboard-page {
  .el-row {
    margin-bottom: 20px;

    .el-col {
      padding: 0 12px;
    }
  }

  .p-t {
    font-weight: 700;
    margin-bottom: 16px;
  }

  .tac {
    text-align: center;
  }

  .header {
    display: flex;
    justify-content: space-between;

    .refresh-box {
      font-size: 14px;
      color: #818693;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      cursor: pointer;

      &:before {
        background-repeat: no-repeat;
        content: "";
        display: inline-block;
        width: 15px;
        height: 14px;
        background-image: url(~@/assets/refresh.png);
        background-size: contain;
        margin-right: 8px;
      }
    }

  }

  .overview-content {
    display: flex;

    .left {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      border-right: 1px solid #ebeef5;

      .organName {
        margin: 20px 0 13px;
      }

      .address {
        font-size: 14px;
        color: #818693;
        margin-bottom: 8px;
        font-weight: 300;
      }

      .people {
        font-size: 14px;
        color: #818693;
        margin-bottom: 23px;
        font-weight: 300;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;

      .item {
        flex: 50%;
        display: flex;
        justify-content: center;

        .label {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .num {
          font-size: 32px;
          font-weight: 700;
          color: #e15536;
          cursor: pointer;
        }
      }
    }
  }

  .today-data {

    .content {
      margin-top: 16px;
      padding-left: 10px;
      display: flex;

      .item {
        flex: 1;

        .top {
          font-size: 14px;
          color: #20232a;
          margin-bottom: 21px;
        }

        .middle {
          font-size: 36px;
          color: #20232a;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .bottom {
          font-size: 14px;
          color: #818693;
          margin-bottom: 20px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          padding-left: 9px;

          &:after {
            content: "";
            display: inline-block;
            width: 15px;
            height: 15px;
            background-image: url(~@/assets/up.png);
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }

  .backlog {
    padding: 3px 0;

    .header {
      .title {
        display: flex;
        align-items: center;

        ::v-deep .el-tooltip {
          margin-left: 5px;
        }
      }
    }

    .charts-container {
      width: 100%;
      display: flex;

      .chart {
        width: 25%;
        height: 208px;
      }

      .label {
        margin-top: -25px;
        z-index: 100;
        width: 25%;
        text-align: center;
      }
    }
  }

  .functions {
    .function-box {
      display: flex;
      justify-content: space-between;

      .item {
        width: 15.15%;
        cursor: pointer;
        background: #fafafb;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          color: #d15e41;
        }

        .icon {
          margin: 20px 150px 0;

          img {
            width: 40px;
            height: 40px;
          }
        }

        .content {
          margin: 16px 0;
        }
      }
    }
  }

  .trans-mission {
    .seamless-warp {
      height: 400px;
      overflow: hidden;
    }

  }

  .order-total {
    .header {
      height: 30px;

      .right {
        font-size: 12px;
        color: #818693;
      }
    }

    .unit {
      font-size: 14px;
      color: #818693;
      margin-bottom: 14px;
    }

    .order-static {
      display: flex;
      justify-content: space-evenly;
      margin-top: 38px;

      .num {
        font-size: 28px;
        color: #e15536;
        font-weight: 700;
        text-align: center;
        margin-bottom: 5px;
      }

      .label {
        font-size: 12px;
        color: #818693;
        text-align: center;
      }
    }
  }

  .order-charts {
    height: 400px;
    width: 100%;
    min-width: 40px;
  }
}
</style>
