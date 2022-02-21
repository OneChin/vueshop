<template>
  <el-container>
    <el-header>
      <div>
        <img src="@/assets/logo.png" alt="" />
        <span>Genshin Impact Center</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <left-menu />
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from "@/components/common/left-menu.vue";
export default {
  components: {
    leftMenu,
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
			this.$router.push("./login")
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
img {
  width: 100px;
  height: 60px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>