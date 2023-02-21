<template>
  <div class="institutions-jobs-area">
    <left-tree ref="son" :tree-data="treeData" @handleNodeClick="handleNodeClick"/>
    <div class="right-box">
      <el-card>
        <template #header>
          <div class="header">
            <div>作业范围</div>
            <el-button type="primary">编辑</el-button>
          </div>
        </template>
        <div class="search">
          地区关键词：
          <el-input v-model="center" placeholder="请输入地区关键词"/>
        </div>
        <div class="mapBox">
          <baidu-map :center="center" class="bm-view">
          </baidu-map>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import LeftTree from '@/views/branches/components/left-tree/index.vue'
import { getTreeOrganApi } from '@/api/organization-manage'

export default {
  name: 'institutions-jobs-area',
  components: { LeftTree },
  data () {
    return {
      treeData: [],
      center: '北京'
    }
  },
  methods: {
    handleNodeClick () {

    },
    async getData () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    }
  },
  async created () {
    await this.getData()
    this.$nextTick(() => {
      this.$refs.son.$refs.organTree.setCurrentKey('1024985257948084801')
    })
  }
}
</script>

<style scoped lang="scss">
.institutions-jobs-area {
  display: flex;
  padding: 0 10px 20px;
  min-width: 900px;

  ::v-deep .el-card__header {
    height: 60px;
    background: #f7f9ff;
    font-weight: 600;
  }

  .right-box {
    padding-left: 20px;
    width: 100%;
    height: 100%;

    .header {
      display: flex;
      justify-content: space-between;

      .el-button {
        margin-top: -8px;
      }
    }

    .search {
      display: flex;
      align-items: center;

      .el-input {
        width: 230px;
      }

      ::v-deep .el-input__inner {
        width: 230px;
      }
    }

    .mapBox {
      width: 100%;
      height: 668px;
      padding-top: 22px;

      .bm-view {
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>
