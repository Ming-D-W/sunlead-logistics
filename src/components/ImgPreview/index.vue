<template>
  <div class="container" style="display: flex">
    <div class="img-box">
      <img v-imgerror="errImg" :src="url" alt="img">
      <div class="mask">
        <i @click="previewImg(url)" class="el-icon-zoom-in"></i>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="previewDialog" class="preDialog">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'ImgPreview',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgUrl: '',
      previewDialog: false,
      errImg: require('@/assets/default.truck.png')
    }
  },
  methods: {
    previewImg (url) {
      this.imgUrl = url
      this.previewDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-left: 10px;
  padding-right: 50px;
}

.img-box {
  position: relative;

  &:hover .mask {
    opacity: 1;
  }

  img {
    width: 212px;
    height: 160px;
    display: block;
    border-radius: 3px;
    border: 1px solid #d9dde2;
    margin-right: 10px;
  }
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

.preDialog {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
