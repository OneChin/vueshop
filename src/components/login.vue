<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/vue-logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <!-- prop 属性指定验证规则 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 表单校验
      loginFormRules: {
        // 验证用户名是否合法, blur 失去焦点之后触发
        username: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          },
        ],
        // 验证密码
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur"
          },

        ],
      },
    };
  },
  methods: {
    /**
     * 重置表单
     */
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    /**
     * 登录
     * 登录验证，valid 返回验证的结果是 true 还是 false
     */
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // if (valid === false) {
        if (!valid) {
          this.$message.error("用户名或者密码错误")
          return;
        }
        // this.$http.post("login", this.loginForm).then((res) => {
        // this.$http.post("login", {
        //   username: this.loginForm.username,
        //   password: this.loginForm.password
        // }).then((res) => {
        //   console.log({res})
        // })
        let result = await this.$http.post("login", this.loginForm)
        if (result.data.meta.status !== 200) {
          this.$message.error("登录失败")
        } else {
          this.$message.success("登录成功")
        }
        // 1. 讲登录成功之后的 token，保存到客户端的 sessionStorage 中
        // 2. 通过编程式导航，跳转到后台主页
        const {data: {data: {token}}} = result
        // 保存 token
        window.sessionStorage.setItem('token', token)
        this.$router.push('/home')
      })

    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  /* 居中 */
  position: absolute;
  left: 50%;
  top: 50%;
  /* 加这个才能居中 */
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  /* 增加内边距 */
  padding: 10px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  /**居中 */
  left: 50%;
  /* 基于盒子自身的高度 */
  /**往上移动 */
  transform: translate(-50%, -50%);
  background-color: #fff;
}
img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* 内边距 */
  padding: 0 20px;
  /* 改变模型 */
  box-sizing: border-box;
}
/* 居右 */
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>