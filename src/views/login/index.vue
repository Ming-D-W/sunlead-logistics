<template>
  <div class="login-page">
    <div class="video-container">
      <video src="https://slwl-admin.itheima.net/static/media/video.3cf57b17.mp4" autoplay muted loop/>
      <div class="shadow"></div>
    </div>
    <el-form class="login-form" :model="form" :rules="rules" ref="loginForm">
      <div class="logo-box">
        <img src="@/assets/login.png" alt="logo">
      </div>
      <el-form-item prop="account">
        <el-input v-model="form.account" placeholder="用户名"/>
        <img src="@/assets/user.png" class="login-icon">
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password" show-password/>
        <img src="@/assets/password.png" class="login-icon">
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="form.code" placeholder="验证码"/>
        <img src="@/assets/lock.png" class="login-icon">
        <img class="valicode" :src="captcha" alt="验证码">
      </el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getCode } from '@/api/user'

export default {
  name: 'login-page',
  data () {
    return {
      form: {
        account: 'shenlingadmin',
        password: '123456',
        code: ''
      },
      rules: {
        account: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        code: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }]
      },
      captcha: ''
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('user/loginAction', {
        ...this.form,
        bindAccount: '',
        bindPassword: '',
        key: 'BB7BAD6312B538509DA88D281676367933832',
        tenant: '0000',
        signAccount: '',
        signPassword: ''
      })
    },
    async getValiCode () {
      const res = await getCode()
      this.captcha = window.URL.createObjectURL(new Blob([res]))
    }
  },
  created () {
    this.getValiCode()
  }
}
</script>

<style scoped lang="scss">
.login-page {
  .video-container {
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    z-index: -1;

    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #1a1c41;
      opacity: 0.3;
    }
  }

  .login-form {
    padding: 36px 40px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;

    .logo-box {
      width: 370px;
      height: 58px;
      text-align: center;
      line-height: 58px;
      margin-bottom: 28px;

      img {
        width: 195px;
        height: 54px;
      }
    }

    ::v-deep .el-input__inner {
      height: 50px;
      padding: 0 15px 0 48px;
    }

    ::v-deep .el-input {
      position: relative;
    }

    .login-icon {
      display: block;
      width: 21px;
      height: 21px;
      position: absolute;
      left: 13px;
      top: 14px;
    }
    .valicode {
      display: block;
      width: 71px;
      height: 32px;
      position: absolute;
      right: 10px;
      bottom: 9px;
    }

  }

  .el-button {
    width: 100%;
    height: 54px;
    margin: 22px 0 14px 0;
  }
}
</style>
