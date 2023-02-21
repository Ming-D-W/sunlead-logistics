<template>
  <div class="left-tree">
    <el-tree
      ref="organTree"
      @node-click="handleNodeClick"
      check-strictly
      :data="treeData"
      node-key="id"
      :highlight-current="true"
      :default-expanded-keys="['1024985257948084801']"
      :props="{label:'name'}"/>
  </div>
</template>

<script>
export default {
  name: 'left-tree',
  props: {
    treeData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    handleNodeClick (node) {
      this.$emit('handleNodeClick', node)
    }
  }
}
</script>

<style scoped lang="scss">
.left-tree {
  box-sizing: border-box;
  width: 235px;
  height: auto;
  padding-left: 9px;
  padding-top: 15px;
  background: #fff;
  border-radius: 4px;
}
</style>
