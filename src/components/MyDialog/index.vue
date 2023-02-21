<template>
  <el-dialog :title="title" :visible="dialogVisible" @close="cancel">
    <slot name="content"></slot>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button style="margin-left: 15px" @click="cancel">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    cancel () {
      this.$emit('update:dialogVisible', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 600px;
  border-radius: 8px;
  overflow: hidden;
}

::v-deep .el-dialog__body {
  padding: 40px 60px 0 0;
}

::v-deep .el-dialog__header {
  background: #f3f4f7;
}
</style>
