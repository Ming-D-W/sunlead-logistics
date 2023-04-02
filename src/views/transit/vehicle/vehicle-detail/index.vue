<template>
  <div class="vehicle-detail">
    <el-card class="detail-card">
      <el-tabs v-model="activeName" @tab-click="handleClick" :class="{tabContainer:type==='edit'}">
        <el-tab-pane label="基本信息" name="first" style="padding: 10px 20px">
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车辆编号：" required label-width="100px">
                  <el-input v-model="formData.id" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌号码：" required label-width="100px">
                  <el-input v-model="formData.licensePlate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型名称：" required label-width="100px">
                  <el-input v-model="formData.truckTypeName" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车辆体积：" required label-width="100px">
                  <el-input v-model="formData.allowableVolume" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌载重：" required label-width="100px">
                  <el-input v-model="formData.allowableLoad" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="GPSID：" required label-width="100px">
                  <el-input v-model="formData.deviceGpsId" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row class="img-info">
            <div>图片信息</div>
            <div class="container" v-show="type==='edit'" style="display: flex">
              <div class="img-box" v-for="item in formData.picture" :key="item.uid">
                <img :src="item.url" alt="img">
                <div class="mask">
                  <i @click="previewImg(item.url)" class="el-icon-zoom-in"></i>
                </div>
              </div>
            </div>
            <ImageUpload v-show="type==='save'" ref="uploadRef"/>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="行驶证信息" name="second" style="padding: 0 20px">
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item label="行驶证号码：" required label-width="130px">
                  <el-input v-model="formData.transportCertificateNumber" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发动机号码：" required label-width="130px">
                  <el-input v-model="formData.engineNumber" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册时间：" required label-width="130px">
                  <el-input v-model="formData.registrationDate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="强制报废日期：" required label-width="130px">
                  <el-input v-model="formData.mandatoryScrap" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="整备质量：" required label-width="130px">
                  <el-input v-model="formData.overallQuality" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检验有效日期：" required label-width="130px">
                  <el-input v-model="formData.expirationDate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="核定载质量：" required label-width="130px">
                  <el-input v-model="formData.allowableWeight" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有效期：" required label-width="130px">
                  <el-input v-model="formData.validityPeriod" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row class="img-info">
            <div>图片信息</div>
            <div class="container" v-show="type==='edit'" style="display: flex">
              <div class="img-box" v-for="item in formData.picture" :key="item.uid">
                <img :src="item.url" alt="img">
                <div class="mask">
                  <i @click="previewImg(item.url)" class="el-icon-zoom-in"></i>
                </div>
              </div>
            </div>
            <ImageUpload v-show="type==='save'" ref="uploadRef2"></ImageUpload>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <footer>
        <el-row type="flex" justify="center" v-if="type==='edit'">
          <el-button type="primary" @click="handleEdit">编辑</el-button>
        </el-row>
        <el-row type="flex" justify="center" v-else>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-row>
      </footer>
    </el-card>
    <el-dialog title="预览" :visible.sync="previewDialog">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCarDetailApi, getLicenceDetailApi, updateTruck } from '@/api/car-manager'
import ImageUpload from '@/components/ImageUpload/index.vue'

export default {
  name: 'vehicle-detail',
  components: { ImageUpload },
  data () {
    return {
      activeName: 'first',
      formData: {},
      type: 'edit',
      previewDialog: false,
      imgUrl: ''
    }
  },
  methods: {
    handleClick () {
      this.type = 'edit'
      this.getList()
    },
    getList () {
      if (this.activeName === 'first') {
        this.getCarDetail()
      } else {
        this.getLicenceDetail()
      }
    },
    async getCarDetail () {
      const { data } = await getCarDetailApi(this.$route.query.id)
      this.formData = data
      if (this.formData.picture) {
        const arr = data.picture.split(',')
        this.formData.picture = arr.map(item => {
          return {
            url: item,
            uid: Math.random()
          }
        })
      }
      this.$refs.uploadRef.fileList = this.formData.picture || ['~@/assets/default.truck.png']
    },
    async getLicenceDetail () {
      const { data } = await getLicenceDetailApi(this.$route.query.id)
      this.formData = data
      if (this.formData.picture) {
        const arr = data.picture.split(',')
        this.formData.picture = arr.map(item => {
          return {
            url: item,
            uid: Math.random()
          }
        })
      }
      this.$refs.uploadRef2.fileList = this.formData.picture || ['~@/assets/default.truck.png']
    },
    handleEdit () {
      this.type = 'save'
    },
    cancel () {
      this.type = 'edit'
    },
    previewImg (url) {
      this.imgUrl = url
      this.previewDialog = true
    },
    async submit () {
      if (this.activeName === 'first') {
        this.formData.picture = this.$refs.uploadRef.fileList.map(item => {
          return item.url
        }).join(',')
        await updateTruck(this.formData)
      } else {
        this.formData.picture = this.$refs.uploadRef2.fileList.map(item => {
          return item.url
        }).join(',')
      }
      this.$message.success('保存车辆信息成功')
      this.getList()
    }
  },
  created () {
    this.getCarDetail()
  }
}
</script>

<style scoped lang="scss">
.vehicle-detail {
  padding: 0 10px;
  height: 100%;

  ::v-deep .tabContainer .el-input.is-disabled .el-input__inner {
    background: #fff !important;
    color: #000;
    border: none;
    font-weight: 300;
  }

  .detail-card {
    min-height: 100%;
    height: 100%;
    position: relative;

    footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #e5e7eb;
      padding: 30px 0 16px 0;

      .el-button {
        padding: 13px 40px;
      }
    }
  }

  ::v-deep .el-tabs__item.is-active {
    font-size: 16px;
    font-weight: bold;
  }

  ::v-deep .el-tabs__nav-scroll {
    padding: 0 20px;
  }

  .img-info {
    margin-top: 10px;
    font-size: 14px;
    color: #20232a;
    font-weight: 400;
    display: flex;

    .container {
      padding-left: 10px;
      padding-right: 50px;
    }

    .img-box {
      position: relative;

      &:hover .mask {
        opacity: 1;
      }
    }

    img {
      width: 212px;
      height: 160px;
      display: block;
      border-radius: 3px;
      border: 1px solid #d9dde2;
      margin-right: 10px;
    }

    .mask {
      width: 212px;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      opacity: 0;
      z-index: 10;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;

      i {
        width: 30px;
        height: 30px;
        display: block;
        font-size: 22px;
        line-height: 160px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
