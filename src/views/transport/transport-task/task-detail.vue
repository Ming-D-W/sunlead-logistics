<template>
  <div class="edit-order">
    <el-collapse value="1">
      <el-collapse-item title="基本信息" name="1">
        <div style="padding: 25px 44px 0;position: relative" class="top-card">
          <el-row style="margin-bottom: 25px">
            <el-col :span="6">
              <div class="text-box">
                <div class="title">运输任务编号：</div>
                <div class="content">{{ orderInfo.id }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-box">
                <div class="title">车牌号码：</div>
                <div class="content">
                  {{ orderInfo.truck?.licensePlate }}
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-box">
                <div class="title">调度机构：</div>
                <div class="content">{{ orderInfo.startAgency?.name }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-box">
                <div class="title">起始地：</div>
                <div class="content">{{ orderInfo.startAgency?.name }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="text-box">
                <div class="title">目的地：</div>
                <div class="content">{{ orderInfo.endAgency?.name }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="任务轨迹" name="1">
        <div style="padding: 25px 44px 0;position: relative" class="top-card">
          <el-row style="margin-bottom: 25px">
            <el-col :span="8">
              <div class="text-box">
                <div class="title">车牌号：</div>
                <div class="content">{{ orderInfo.truck?.licensePlate }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-box">
                <div class="title">司机：</div>
                <div class="content">
                  {{ driverNames }}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-box">
                <div class="title">计划发车时间：</div>
                <div class="content">{{ orderInfo.planDepartureTime }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="text-box">
                <div class="title">实际发车时间：</div>
                <div class="content">{{ orderInfo.actualDepartureTime }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-box">
                <div class="title">计划到达时间：</div>
                <div class="content">{{ orderInfo.planArrivalTime }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-box">
                <div class="title">实际到达时间：</div>
                <div class="content">{{ orderInfo.actualArrivalTime }}</div>
              </div>
            </el-col>
          </el-row>
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
            <el-table-column label="运单编号" prop="id"/>
            <el-table-column label="下单时间" prop="created"/>
            <el-table-column label="发件人姓名" prop="order.senderName"/>
            <el-table-column label="发件人电话" prop="order.senderPhone"/>
            <el-table-column label="发件人地址" prop="order.senderAddress"/>
            <el-table-column label="货品数量" prop="order.amount"/>
            <el-table-column label="操作" prop="totalVolume" fixed="right">
              <template #default="{row}">
                <el-link
                  @click="$router.push(`/business/waybill-detail?id=${row.id}&orderId=${row.orderId}`)"
                  :underline="false"
                  style="color: #419eff;font-weight: 300">查看详情
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="交付照片" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-row>
            <el-col :span="8">
              <div class="img-box">
                货品照片
                <ImgPreview :url="orderInfo.deliverPicture"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="img-box">
                货品照片
                <ImgPreview :url="orderInfo.transportCertificate"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse value="1">
      <el-collapse-item title="提货照片" name="1">
        <div class="pick-info" style="padding: 25px 44px 0">
          <el-row>
            <el-col :span="8">
              <div class="img-box">
                货品照片
                <ImgPreview :url="orderInfo.cargoPicture"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="img-box">
                货品照片
                <ImgPreview :url="orderInfo.cargoPickUpPicture"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import tableInit from '@/mixins/tableInit'
import { getTransportTaskDetail } from '@/api/transport'
import ImgPreview from '@/components/ImgPreview/index.vue'

export default {
  name: 'edit-order',
  components: { ImgPreview },
  mixins: [tableInit],
  data () {
    return {
      orderInfo: {},
      statusList: ['新建', '已装车', '运输中', '到达终端网点', '拒收']
    }
  },
  methods: {
    async getList () {
      const { data } = await getTransportTaskDetail(this.$route.query.id)
      this.orderInfo = data
      this.tableData = data.transportOrders
    }
  },
  computed: {
    driverNames () {
      if (!this.orderInfo?.drivers?.length) {
        return ''
      }
      return this.orderInfo?.drivers[0]?.name + ',' + this.orderInfo?.drivers[1]?.name
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

  .pick-info {
    .img-box {
      display: flex;
      font-size: 16px;
      padding: 20px 0;
    }
  }
}
</style>
