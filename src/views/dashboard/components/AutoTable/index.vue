<template>
  <div class="table">
    <div class="table-h">
      <div class="h-item">任务编号</div>
      <div class="h-item">起始地</div>
      <div class="h-item">目的地</div>
      <div class="h-item">车辆</div>
      <div class="h-item">任务状态</div>
    </div>
    <div class="table-m">
      <div class="m-inner" ref="mInner" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div v-for="(item,index) in tableData"
             :key="item.id+index"
             class="m-item"
             :class="{'bg-w':index%2===0,'bd-b':index+1===tableData.length}"
        >
          <div class="item">{{ item.id }}</div>
          <div class="item">{{ item.startAgency }}</div>
          <div class="item">{{ item.endAgency }}</div>
          <div class="item">{{ item.licensePlate }}</div>
          <div class="item">{{ item.status === 2 ? '进行中' : '完成' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'auto-table',
  props: {
    tableData: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      time: ''
    }
  },
  methods: {
    autoTop () {
      if (this.$refs.mInner?.style) {
        const top = this.$refs.mInner?.style?.top
        if (-parseInt(top) >= this.$refs.mInner?.offsetHeight - 1) {
          this.$refs.mInner.style.top = '0'
          return
        }
        if (top !== '') {
          this.$refs.mInner.style.top = `${parseInt(top) - 50}px`
        } else {
          this.$refs.mInner.style.top = '-50px'
        }
      }
    },
    startScroll () {
      this.time = setInterval(() => {
        this.autoTop()
      }, 1500)
    },
    handleMouseEnter () {
      clearInterval(this.time)
      this.time = ''
    },
    handleMouseLeave () {
      this.startScroll()
    }
  },
  mounted () {
    this.startScroll()
  }
}
</script>

<style scoped lang="scss">
.table {
  min-width: 200px;

  .table-h {
    border: 1px solid #ebeef5;
    border-bottom: none;
    line-height: 50px;
    display: flex;
    background: #f9fafe;

    .h-item {
      height: 49px;
      width: 20%;
      text-align: center;
      font-size: 14px;
      color: #818693;
    }
  }

  .table-m {
    height: 351px;
    position: relative;
    overflow: hidden;

    .m-inner {
      position: absolute;
      left: 0;
      width: 100%;
      transition: all .5s ease;

      .m-item {
        display: flex;
        border: 1px solid #ebeef5;
        border-bottom: none;
        background: #fafafa;
        cursor: pointer;

        &:hover {
          background: #f5f7fa;
        }

        .item {
          line-height: 50px;
          height: 49px;
          width: 20%;
          text-align: center;
          font-size: 14px;
        }
      }

      .bg-w {
        background: #fff;
      }

      .bd-b {
        border-bottom: 1px solid #ebeef5;
      }
    }

  }

}
</style>
