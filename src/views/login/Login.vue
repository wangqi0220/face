<template>
  <div class="logincontainer">
    <el-form
      class="loginForm"
      :model="loginModel"
      ref="loginFormRef"
      :rules="rules"
      :inline="false"
    >
      <el-form-item>
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          size="large"
          placeholder="请输入账户"
          v-model="loginModel.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          type="password"
          placeholder="请输入密码"
          v-model="loginModel.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row>
          <el-col :span="16" style="padding-right: 10px; padding-left: 0px">
            <el-input
              size="large"
              placeholder="请输入验证码"
              v-model="loginModel.code"
            ></el-input>
          </el-col>
          <el-col :span="8" style="padding-right: 0px; padding-left: 10px">
            <!-- <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input> -->
            <img :src="imgSrc" class="image" @click="getImage" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12" style="padding-right: 10px; padding-left: 0px">
            <el-button @click="login" class="mybtn" type="primary" size="large">
              登录
            </el-button>
          </el-col>
          <el-col :span="12" style="padding-right: 0px; padding-left: 10px">
            <el-button class="mybtn" type="large" size="default"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import useImage from "@/composables/login/useImage";
import useBaseLogin from "@/composables/login/useBaseLogin";
import useLogin from "@/composables/login/useLogin";
//基础数据
const { loginModel, rules, loginFormRef } = useBaseLogin();

//验证码
const { imgSrc, getImage } = useImage();

//登录
const { login } = useLogin(loginModel);
</script>
<style scoped lang="scss">
.logincontainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm {
    height: 320px;
    width: 400px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;
    .loginTitle {
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .image {
      height: 40px;
      width: 100%;
    }
    .mybtn {
      width: 100%;
    }
  }
}
:deep(.el-row) {
  width: 100% !important;
}
</style>
