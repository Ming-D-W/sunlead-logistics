<template>
  <div class="institutions-jobs-area">
    <left-tree ref="son" :tree-data="treeData" @handleNodeClick="handleNodeClick"/>
    <div class="right-box">
      <el-card>
        <template #header>
          <div class="header">
            <div>作业范围</div>
            <el-button v-if="type===1" type="primary" @click="type = 2">编辑</el-button>
            <div v-if="type>1">
              <el-button type="primary" @click="handleSave">保存</el-button>
              <el-button @click="type=1">取消</el-button>
            </div>
          </div>
        </template>
        <div class="search">
          地区关键词：
          <el-input v-model="searchText" placeholder="请输入地区关键词"/>
        </div>
        <div class="draw">
          <el-button type="primary" v-if="type===2" @click="handleEdit">开始绘制</el-button>
          <div v-if="type===3">
            <el-button v-loading="doneLoading" type="primary" @click="handleDone">完成绘制</el-button>
            <el-button>删除围栏</el-button>
            <el-alert
              style="margin-top: 20px"
              title="点击或拖动鼠标绘制电子围栏，右击鼠标结束图形绘制，图形不可有交叉点。完成绘制后，点击提交按钮保存。仅支持绘制单个电子围栏区域"
              :closable="false"
              type="warning"
              show-icon>
            </el-alert>
          </div>
        </div>
        <div class="mapBox">
          <baidu-map @ready="handler" class="map" :center="mapCenter" style="height: 100%" :zoom="zoom">
            <bm-polygon fill-color="#edcbc7" strokeStyle="dashed" :path="polygonPath" stroke-color="red"
                        :stroke-opacity="0"
                        :stroke-weight="2"
                        :editing="editing"
                        @lineupdate="updatePolygonPath"/>
            <bm-local-search :keyword="searchText" :auto-viewport="true"></bm-local-search>
          </baidu-map>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import LeftTree from '@/views/branches/components/left-tree/index.vue'
import { delWorkArea, getOrganArea, getTreeOrganApi } from '@/api/organization-manage'
import { saveDeliveryArea } from '@/api/employees'

export default {
  name: 'institutions-jobs-area',
  components: { LeftTree },
  data () {
    return {
      treeData: [],
      editing: false,
      polygonPath: [
        {
          lng: 116.412732,
          lat: 39.911707
        },
        {
          lng: 116.39455,
          lat: 39.910932
        },
        {
          lng: 116.403461,
          lat: 39.921336
        }
      ],
      mapCenter: {},
      searchText: '',
      mapData: {},
      type: 1,
      doneLoading: false,
      zoom: 10
    }
  },
  methods: {
    handleNodeClick (data) {
      this.getDetail(data.id)
    },
    async getData () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    },
    updatePolygonPath (e) {
      this.polygonPath = e.target.getPath()
    },
    async getDetail (id) {
      this.mapCenter = {}
      this.polygonPath = []
      const { data } = await getOrganArea(id)
      this.mapData = data
      this.mapCenter = {
        lng: parseFloat(data.longitude),
        lat: parseFloat(data.latitude)
      }
      this.polygonPath = data.polygon.map(item => {
        const obj = {}
        obj.lng = item.longitude
        obj.lat = item.latitude
        return obj
      })
    },
    handleEdit () {
      this.type = 3
      this.editing = true
    },
    async handleDel () {
      await this.$confirm('确认删除围栏吗')
      await delWorkArea(this.mapData.id, 1)
      this.$message.success('删除成功')
      this.getDetail()
    },
    handleDone () {
      this.type = 2
      this.editing = false
    },
    async handleSave () {
      this.doneLoading = true
      const arr = this.polygonPath.map(item => {
        const obj = {}
        obj.longitude = parseFloat(item.lng)
        obj.latitude = parseFloat(item.lat)
        return obj
      })
      this.mapData.bid = parseInt(this.mapData.bid)
      this.mapData.created = parseInt(this.mapData.created)
      this.mapData.updated = parseInt(this.mapData.updated)
      this.mapData.latitude = this.mapCenter.lat
      this.mapData.longitude = this.mapCenter.lng
      this.mapData.polygon = arr
      await saveDeliveryArea(this.mapData)
      this.doneLoading = false
      this.$message.success('保存成功')
      this.type = 2
    },
    handler ({
      BMap,
      map
    }) {
      // 自动获取展示的比例
      // eslint-disable-next-line no-eval
      const view = map?.getViewport(eval(this.polygonPath))
      this.zoom = view.zoom - 5
      this.center = view.center
    }
  },
  async created () {
    await this.getData()
    this.$nextTick(() => {
      this.$refs.son.$refs.organTree.setCurrentKey('1024985257948084801')
    })
    this.getDetail('1024985257948084801')
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
    }

    .draw {
      margin-top: 20px;
    }
  }

}
</style>
