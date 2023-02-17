<template>
  <div class="dashboard-page">
    <el-container>
      <el-aside width="210px">
        <div class="logo-container">
          <img src="@/assets/logoSiderBar.png" alt="logo">
        </div>
        <el-menu style="border:0" router default-active="/dashboard">
          <el-menu-item :index="router[0].path">
            <i :class="router[0].meta.icon"></i>
            <span slot="title">{{ router[0].meta.title }}</span>
          </el-menu-item>
          <el-submenu v-for="item in router.filter((value,index) => index!==0)" :key="item.id" :index="item.path">
            <template #title>
              <i :class="item.meta.icon"/>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="childItem in item.children" :index="item.path" :key="childItem.id">
              <i :class="childItem.meta.icon"/>
              <span slot="title">{{ childItem.meta.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="title">
          <div class="left">{{ routerDictionaries[$route.path] }}</div>
          <div class="right">
            <div class="avatar">
              <img v-imgerror="defaultAvatar" :src="avatar" alt="avatar">
            </div>
            <span>{{ username }}</span>
            <div class="divide"/>
            <div class="logout">
              <img src="@/assets/logout.png" alt="logout">
            </div>
          </div>
        </div>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'layout-page',
  data () {
    return {
      defaultAvatar: require('@/assets/default.avatar.jpg')
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['router', 'avatar', 'username', 'routerDictionaries'])
  }
}
</script>

<style scoped lang="scss">
.dashboard-page {
  .el-container {
    height: 100vh;

    .el-aside {
      .logo-container {
        box-sizing: border-box;
        width: 210px;
        text-align: center;
        padding: 20px 20px 0;

        img {
          width: 152px;
          height: 113px;
        }
      }

      ::v-deep el-menu {
        width: 100%;
      }
    }

    .el-main {
      background-color: #f3f5f9;
      padding: 0 12px;

      .title {
        padding-top: 25px;
        display: flex;
        justify-content: space-between;
        margin-right: 10px;
        margin-bottom: 10px;
        height: 31px;

        .left {
          font-size: 16px;
          font-weight: bold;
          margin-left: 14px;
        }

        .right {
          padding: 0 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-top: -5px;

          &:hover {
            background-color: #edeff3;
          }

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          span {
            margin: 0 8px 0 10px;
            font-size: 14px;
            font-weight: 400;
            color: #072c56;
          }

          .divide {
            width: 1px;
            height: 18px;
            margin: 0 8px;
            background-color: #dcdfe6;
          }

          .logout {
            img {
              display: block;
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
