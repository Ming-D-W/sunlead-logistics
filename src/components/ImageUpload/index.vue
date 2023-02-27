<template>
  <div>
    <el-upload
      :class="{disabled:fileList.length===2}"
      :limit="2"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="remove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="handleUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">上传图片</div>
      <div class="el-upload__tip" slot="tip">注：图片大小不超过5M；仅能上传 PNG JPEG
        JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
      </div>
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px"/>
    <el-dialog title="预览" :visible.sync="dialogVisible">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDpq2h8PiRDydCtSqUu9LPIPrrg0BIB4xe', // 身份识别 ID
  SecretKey: '31ukR9j8SuP5pWkplaJyfFsQp3Megcix' // 身份密钥
})
export default {
  name: 'ImageUpload',
  data () {
    return {
      imgUrl: '',
      dialogVisible: false,
      fileList: [],
      percent: 0,
      showPercent: false
    }
  },
  methods: {
    preview (file) {
      console.log(file)
      this.imgUrl = file.url
      this.dialogVisible = true
    },
    remove (file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    },
    beforeUpload (file) {
      const type = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png', 'image/webp']
      if (!type.includes(file.type)) {
        this.$message.error('不支持的图片类型！')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片不得超过5M')
        return false
      }
    },
    async handleUpload (params) {
      if (params.file) {
        this.showPercent = true
        cos.putObject({
          Bucket: 'magisk-1259315564', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          onProgress: (progressData) => {
            const data = JSON.stringify(progressData.percent)
            this.percent = parseInt(data * 100)
          }
        }, (err, data) => {
          // data返回数据之后 应该如何处理
          if (err) return
          this.fileList.forEach(item => {
            if (item.uid === params.file.uid) {
              item.url = `http://${data.Location}`
              //   给完成上传的图片打上标记
              item.upload = true
            }
          })
          setTimeout(() => {
            this.showPercent = false
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.disabled {
  ::v-deep .el-upload.el-upload--picture-card {
    display: none;
  }
}
</style>
