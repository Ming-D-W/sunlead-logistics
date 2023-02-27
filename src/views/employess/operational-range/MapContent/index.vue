<template>
  <div class="map-content">
    <el-card class="search-card">
      <template #header>
        <div class="header">
          <span>作业范围分配</span>
          <el-button v-if="type===1" type="primary" @click="type = 2">编辑</el-button>
          <div v-if="type>1">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="type=1">取消</el-button>
          </div>
        </div>
      </template>
      <div class="search">
        <span>地区关键词：</span>
        <el-input v-model="searchText"/>
      </div>
      <div class="draw">
        <el-button type="primary" v-if="type===2" @click="handleEdit">开始绘制</el-button>
        <div v-if="type===3">
          <el-button v-loading="doneLoading" type="primary" @click="handleDone">完成绘制</el-button>
          <el-button @click="handleDel">删除围栏</el-button>
          <el-alert
            style="margin-top: 20px"
            title="点击或拖动鼠标绘制电子围栏，右击鼠标结束图形绘制，图形不可有交叉点。完成绘制后，点击提交按钮保存。仅支持绘制单个电子围栏区域"
            :closable="false"
            type="warning"
            show-icon>
          </el-alert>
        </div>
      </div>
      <div class="map-container">
        <baidu-map class="map" :center="mapCenter" :zoom="15">
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
</template>

<script>
import { getDeliveryWorkAreaApi, saveDeliveryArea } from '@/api/employees'
import { delWorkArea } from '@/api/organization-manage'

export default {
  name: 'MapContent',
  data () {
    return {
      type: 1,
      searchText: '',
      editing: false,
      polygonPath: [],
      mapCenter: {},
      doneLoading: false
    }
  },
  methods: {
    updatePolygonPath (e) {
      this.polygonPath = e.target.getPath()
    },
    handleEdit () {
      this.type = 3
      this.editing = true
    },
    handleDone () {
      this.type = 2
      this.editing = false
    },
    async getArea () {
      this.mapCenter = {}
      this.polygonPath = []
      const { data } = await getDeliveryWorkAreaApi(this.$route.query.id)
      this.mapCenter = {
        lat: data.latitude,
        lng: data.longitude
      }
      this.polygonPath = data.polygon.map(item => {
        const obj = {}
        obj.lng = item.longitude
        obj.lat = item.latitude
        return obj
      })
    },
    async handleSave () {
      this.doneLoading = true
      const arr = this.polygonPath.map(item => {
        const obj = {}
        obj.longitude = parseFloat(item.lng)
        obj.latitude = parseFloat(item.lat)
        return obj
      })
      await saveDeliveryArea({
        bid: parseInt(this.$route.query.id),
        polygon: arr,
        type: 2
      })
      this.doneLoading = false
      this.$message.success('保存成功')
      this.type = 2
    },
    async handleDel () {
      await this.$confirm('确认删除围栏吗')
      await delWorkArea(this.$route.query.id, 2)
      this.$message.success('删除成功')
      this.getArea()
    }
  },
  created () {
    this.getArea()
  }
}
</script>

<style scoped lang="scss">
.map-content {

  .header {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 16px;
      font-weight: 700;
      color: #2a2929;
      line-height: 40px;
    }
  }

  .search {
    display: flex;

    span {
      line-height: 40px;
      font-size: 14px;
    }

    .el-input {
      width: 240px;
    }

    ::v-deep .el-input__inner {
      width: 240px;
    }
  }

  .draw {
    margin-top: 20px;
  }

  .map-container {
    margin-top: 20px;
    height: 100%;
    padding-bottom: 130px;

    .map {
      width: 100%;
      height: 95%;
    }
  }

  ::v-deep .el-card__header {
    background-color: #f8faff;
  }

  ::v-deep .el-card__body {
    height: calc(100vh - 280px);
  }
}
</style>
