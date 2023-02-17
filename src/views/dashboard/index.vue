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
              <div class="middle tac">{{ todayData.orderAmount }}</div>
              <div class="bottom">较昨日 +{{ todayData.orderAmountChanges }}</div>
            </div>
            <div class="item">
              <div class="top tac">订单数量(笔)</div>
              <div class="middle tac">{{ todayData.orderNumber }}</div>
              <div class="bottom">较昨日 +{{ todayData.orderNumberChanges }}</div>
            </div>
            <div class="item">
              <div class="top tac">运输任务(次)</div>
              <div class="middle tac">{{ todayData.transportTaskNumber }}</div>
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
      <el-col :span="10"></el-col>
    </el-row>
  </div>
</template>

<script>
import { getWorkspace } from '@/api/workspace'

export default {
  name: 'dashboard-page',
  data () {
    return {
      backlog: {},
      orderLineChart: {},
      organOverview: {},
      todayData: {},
      transportTaskList: {}
    }
  },
  methods: {
    async initData () {
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
      const myChartOne = this.$echarts.init(this.$refs.charts)
      // const myChartTwo = this.$echarts.init(this.$refs.chartsTwo)
      // const myChartThree = this.$echarts.init(this.$refs.chartsThree)
      // const myChartForth = this.$echarts.init(this.$refs.chartsForth)
      const options = {
        backgroundColor: '#fff',
        graphic: [
          {
            type: 'group',
            left: 'center',
            top: '58%'
          }
        ],
        series: [
          {
            type: 'liquidFill', // 水位图
            radius: '60%', // 显示比例
            center: ['50%', '50%'], // 中心点
            data: [0.42], // data个数代表波浪数
            color: ['rgba(226, 93, 62, 1)'], // 波浪颜色
            backgroundStyle: {
              color: '#ffe5e0'
            },
            label: {
              // 标签设置
              position: ['50%', '50%'],
              formatter: 0.42 * 100 + '%', // 显示文本
              fontSize: '20px',
              fontFamily: 'DINAlternate-Bold',
              fontWeight: '100',
              color: '#000',
              insideColor: '#000'
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: 'red',
                borderWidth: 1
              }
            },
            itemStyle: {
              opacity: 0.95,
              shadowColor: 'rgba(0, 0, 0, 0)'
            }
          }
        ]
      }
      myChartOne.setOption(options)
    }
  },
  async mounted () {
    await this.initData()
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
        margin-top: -20px;
        z-index: 100;
        width: 25%;
        text-align: center;
      }
    }
  }
}
</style>
