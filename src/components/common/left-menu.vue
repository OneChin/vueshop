<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff"
    :router="true"
    :default-active="activePath"
  >
    <el-submenu
      v-for="menu in menuList"
      :key="menu.id"
      :index="'/' + menu.path"
    >
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>{{ menu.authName }}</span>
      </template>
      <el-menu-item
        v-for="submenu in menu.children"
        :key="submenu.id"
        :index="'/' + submenu.path"
        @click="saveNavState('/' + submenu.path, menu.authName, submenu.authName)"
      >
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{ submenu.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      // 被激活的链接地址
      activePath: "",
    };
  },
  methods: {
    /**
     * 获取菜单列表
     */
    async getMenuList() {
      const result = await this.$http.get("menus");
      this.menuList = result.data.data;
    },
    /**
     * 保存链接的激活状态
     */
    saveNavState(activePath, parentRouter, currentRouter) {
      window.sessionStorage.setItem("activePath", activePath);
			window.sessionStorage.setItem("parentRouter", parentRouter)
			window.sessionStorage.setItem("currentRouter", currentRouter)
    },
  },
  mounted() {
    this.getMenuList();
  },
  created() {
		// 绑定高亮的菜单
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>