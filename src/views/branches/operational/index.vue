<template>
  <div>
    <el-card class="tab-item" shadow="never" style="margin-bottom: 20px">
      <el-row type="flex" justify="left">
        <div class="item" :class="{active:type===1}" @click="type=1">
          <span>取件作业</span>
        </div>
        <div class="item" :class="{active:type===2}" @click="type=2">
          <span>派件作业</span>
        </div>
      </el-row>
    </el-card>
    <pick-page v-if="type===1"/>
    <dispatch-task-page v-else/>
  </div>
</template>

<script>
import PickPage from '@/views/transport/pickUptask/index.vue'
import DispatchTaskPage from '@/views/transport/dispatchTask/index.vue'

export default {
  name: 'operational-page',
  components: {
    DispatchTaskPage,
    PickPage
  },
  data () {
    return {
      type: 1
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.tab-item {
  margin-top: 20px;

  ::v-deep .el-card__body {
    padding: 0;
  }

  .item {
    width: 120px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;

    span {
      font-weight: normal;
    }
  }

  .active {
    background: #ffeeeb;
    color: #e15536;
  }
}
</style>
