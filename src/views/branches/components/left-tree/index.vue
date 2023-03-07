<template>
  <div class="left-tree">
    <el-tree
      ref="organTree"
      @node-click="handleNodeClick"
      check-strictly
      :data="treeData"
      node-key="id"
      :default-expanded-keys="['1024985257948084801']"
      :props="{label:'name'}">
      <template #default="{data}">
        <div class="node-content">
          <div class="left" v-if="data.parentId==='0'"/>
          <div class="left2" v-if="data.parentId!=='0'&&data.children"/>
          <div :class="{text:data.parentId==='0',text1:data.parentId!=='0'&&data.children,text2:!data.children}">
            {{ data.name }}
          </div>
        </div>
      </template>
    </el-tree>
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

  ::v-deep .el-tree-node__expand-icon {
    display: none;
  }

  .node-content {
    font-size: 13px;
    font-weight: 300;
    display: flex;
    align-items: center;

    .left {
      width: 14px;
      height: 13px;
      background-image: url("~@/assets/tree/fold.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    .left2 {
      width: 14px;
      height: 14px;
      background-image: url("~@/assets/tree/plus.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    div {
      margin-left: 8px;
    }
  }

  ::v-deep .el-tree-node .is-focusable {
    position: relative;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 13px;
      border-left: 1px solid #e5e7ec;
      height: calc(100% + 3px);
    }
  }

  ::v-deep .el-tree-node .el-tree-node .el-tree-node {

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 33px;
      border-left: 1px solid #e5e7ec;
      height: calc(100% + 3px);
    }
  }

  ::v-deep .el-tree-node__content {
    height: 30px;
    margin: 3px 0;
  }

  .text {
    font-weight: 400;
    color: #000;
  }

  .text2 {
    font-size: 12px;
  }

  .is-current {
    .text {
      color: #ff7a63;
    }
  }

  .el-tree-node .el-tree-node.is-current {
    .text1 {
      color: #ff7a63;
    }
  }

  .el-tree-node .el-tree-node .el-tree-node.is-current {
    .text2 {
      color: #ff7a63;
    }
  }

  ::v-deep .el-tree-node__content {
    &:hover .node-content {
      color: #ff7a63 !important;
    }
  }

  ::v-deep .is-expanded {
    .left {
      background-image: url("~@/assets/tree/expand.png") !important;
    }
  }

  ::v-deep .el-tree-node .el-tree-node.is-expanded {
    .left2 {
      background-image: url("~@/assets/tree/subtract.png") !important;
    }
  }

  ::v-deep .el-tree-node:focus > .el-tree-node__content {
    background: none;
  }

  ::v-deep .el-tree-node:hover > .el-tree-node__content {
    background: none;
  }
}
</style>
