<template>
  <div class="car-register-info">
    <el-card shadow="never">
      <template #header>
        基本信息
      </template>
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="运输任务编号：" label-width="120px">
              <el-input v-model="baseInfo.id" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号码：" label-width="120px">
              <el-input v-model="baseInfo.licensePlate" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="起始地机构：" label-width="120px">
              <el-input v-model="baseInfo.startAgencyName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的地机构：" label-width="120px">
              <el-input v-model="baseInfo.endAgencyName" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="出车时间：" label-width="120px">
              <el-input v-model="baseInfo.outStorageTime" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回车时间：" label-width="120px">
              <el-input v-model="baseInfo.intoStorageTime" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机：" label-width="120px">
              <el-input v-model="baseInfo.driverName" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
    <el-card shadow="never" style="margin-top: 20px">
      <template #header>
        异常信息
      </template>
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车辆故障：" label-width="120px">
              <el-input :value="format(baseInfo.isFault,baseInfo.faultDescription)" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆违章：" label-width="120px">
              <el-input :value="format(baseInfo.isBreakRules,baseInfo.breakRulesDescription)" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆事故：" label-width="120px">
              <el-input :value="format(baseInfo.isAccident,baseInfo.accidentDescription)" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import { getTruckReturnDetailApi } from '@/api/car-manager'

export default {
  name: 'car-register-info',
  data () {
    return {
      baseInfo: {}
    }
  },
  methods: {
    async getBaseInfo () {
      const { data } = await getTruckReturnDetailApi(this.$route.query.id)
      this.baseInfo = data
    },
    format (data, data2) {
      return data ? data2 : '否'
    }
  },
  created () {
    this.getBaseInfo()
  }
}
</script>

<style scoped lang="scss">
.car-register-info {
  padding: 0 10px;

  ::v-deep .el-card__header {
    padding: 20px 20px 20px 40px;
    background-color: #f8faff;
  }

  ::v-deep .el-input.is-disabled .el-input__inner {
    background: #fff;
    color: #000;
    border: none;
    font-weight: 300;
  }

  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
