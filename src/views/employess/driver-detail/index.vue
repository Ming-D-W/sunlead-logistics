<template>
  <div class="driver-detail">
    <el-card class="detail-card">
      <el-tabs v-model="activeName" @tab-click="handleClick" :class="{tabContainer:type==='edit'}">
        <el-tab-pane label="基本信息" name="first" style="padding: 10px 20px">
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工编号：" label-width="100px">
                  <el-input v-model="formData.userId" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="司机名称" label-width="100px">
                  <el-input v-model="formData.name" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属机构：" label-width="100px">
                  <el-input v-model="formData.agency.name" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="电话：" label-width="100px">
                  <el-input v-model="formData.mobile" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄：" label-width="100px">
                  <el-input v-model="formData.age" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="驾驶证信息" name="second" style="padding: 0 20px">
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item label="驾驶证号码：" label-width="130px">
                  <el-input v-model="formData2.licenseNumber" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="准驾车型：" label-width="130px">
                  <el-input v-model="formData2.allowableType" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初次领证时间：" label-width="130px">
                  <el-input v-model="formData2.initialCertificateDate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="驾驶证有效期限：" label-width="130px">
                  <el-input v-model="formData2.validPeriod" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驾龄：" label-width="130px">
                  <el-input v-model="formData2.driverAge" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驾驶证类型：" label-width="130px">
                  <el-input v-model="formData2.licenseType" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="从业资格证：" label-width="130px">
                  <el-input v-model="formData2.qualificationCertificate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入场证信息：" label-width="130px">
                  <el-input v-model="formData2.passCertificate" :disabled="type==='edit'"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row class="img-info">
            <div>图片信息</div>
            <div class="container" v-show="type==='edit'&&activeName==='second'" style="display: flex">
              <div class="img-box" v-for="item in formData2.picture" :key="item.uid">
                <img :src="item.url" alt="img">
                <div class="mask">
                  <i @click="previewImg(item.url)" class="el-icon-zoom-in"></i>
                </div>
              </div>
            </div>
            <ImageUpload v-show="type==='save'&&activeName==='second'" ref="uploadRef2"></ImageUpload>
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
import { getDriverDetail, getDriverLicence, saveDriverLicence, updateDriverDetail } from '@/api/employees'
import ImageUpload from '@/components/ImageUpload/index.vue'

export default {
  name: 'driver-detail',
  components: { ImageUpload },
  data () {
    return {
      activeName: 'first',
      formData: {
        agency: {
          name: ''
        }
      },
      formData2: {},
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
        this.getDriveDetail()
      } else {
        this.getLicenceDetail()
      }
    },
    async getDriveDetail () {
      const { data } = await getDriverDetail(this.$route.query.id)
      this.formData = data
    },
    async getLicenceDetail () {
      const { data } = await getDriverLicence(this.$route.query.id)
      this.formData2 = data
      if (this.formData2?.picture) {
        const arr = data.picture.split(',')
        this.formData2.picture = arr.map(item => {
          return {
            url: item,
            uid: Math.random()
          }
        })
        console.log(this.$refs)
        this.$refs.uploadRef2.fileList = this.formData2.picture || ['~@/assets/default.truck.png']
      } else {
        this.formData2.picture = []
      }
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
        await updateDriverDetail(this.formData)
      } else {
        this.formData2.picture = this.$refs.uploadRef2.fileList.map(item => {
          return item.url
        }).join(',')
        await saveDriverLicence(this.formData2)
      }
      this.$message.success('保存信息成功')
      this.getList()
      this.type = 'edit'
    }
  },
  created () {
    this.getDriveDetail()
  }
}
</script>

<style scoped lang="scss">
.driver-detail {
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
      width: 212px;
      height: 160px;
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
