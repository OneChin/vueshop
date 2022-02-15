<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/vue-logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login_form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
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
.login_form{
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