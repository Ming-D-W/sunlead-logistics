<template>
  <div class="dashboard-page">
    <el-container>
      <el-aside width="210px">
        <div class="logo-container">
          <img src="@/assets/logoSiderBar.png" alt="logo">
        </div>
        <el-menu style="border:0" router :default-active="$route.path" :unique-opened="true">
          <el-menu-item :index="router[0].path">
            <i :class="router[0].meta.icon"></i>
            <span slot="title">{{ router[0].meta.title }}</span>
          </el-menu-item>
          <el-submenu v-for="item in router.filter((value,index) => index!==0)" :key="item.id" :index="item.path">
            <template #title>
              <i :class="item.meta.icon"/>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="childItem in item.children" :index="childItem.path" :key="childItem.id">
              <i :class="childItem.meta.icon"/>
              <span slot="title">{{ childItem.meta.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="title">
          <div class="left">
            <div class="back" @click="$router.back()"
                 v-if="$route?.query?.formUrlName==='车辆管理'||$route.query?.id||$route.query?.agencyName||routerList.includes($route.path)">
              <i class="el-icon-back"/>
              <div>返回</div>
              <span>|</span>
            </div>
            {{ routerDictionaries[$route.path] }}
          </div>
          <div class="right">
            <div class="avatar">
              <img v-imgerror="defaultAvatar" :src="avatar" alt="avatar">
            </div>
            <span>{{ username }}</span>
            <div class="divide"/>
            <div class="logout" @click="logout">
              <img src="@/assets/logout.png" alt="logout">
            </div>
          </div>
        </div>
        <div class="main-container">
          <router-view/>
        </div>
        <footer>
          <div>江苏传智播客教育科技股份有限公司</div>
          <div>版权所有Copyright 2006-2022 All Rights Reserved</div>
          <div>苏ICP备16007882号-11</div>
        </footer>
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
      defaultAvatar: require('@/assets/default.avatar.jpg'),
      routerList: [
        '/transit/workArrange-setting'
      ]
    }
  },
  methods: {
    logout () {
      this.$store.commit('user/logoutMutation')
    }
  },
  computed: {
    ...mapGetters(['router', 'avatar', 'username', 'routerDictionaries'])
  }
}
</script>

<style scoped lang="scss">
.dashboard-page {
  position: relative;

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
        position: fixed;
        top: 0;
        width: calc(100% - 243px);
        padding-top: 25px;
        background-color: #f3f5f9;
        display: flex;
        justify-content: space-between;
        height: 31px;
        z-index: 10;

        .left {
          font-size: 16px;
          font-weight: bold;
          margin-left: 14px;
          display: flex;
          align-items: center;
          margin-top: -10px;

          .back {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: normal;
            cursor: pointer;
            margin-right: 20px;

            i {
              display: block;
              font-size: 18px;
              margin-top: -2px;
              padding-right: 8px;
            }

            span {
              display: block;
              height: 20px;
              color: #dddfe5;
              padding-left: 20px;
            }

          }
        }

        .right {
          padding: 0 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-top: -15px;

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

      .main-container {
        padding-top: 65px;
        padding-bottom: 56px;
        height: 100%;
        box-sizing: border-box;
      }

      footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: 20px 0;
        display: flex;
        justify-content: center;
        background: #f3f4f7;
        font-size: 14px;
        color: rgb(186, 192, 205);
        text-align: center;
      }
    }
  }
}
</style>
