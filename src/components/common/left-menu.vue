<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff"
  >
    <el-submenu v-for="menu in menuList" :key="menu.id" :index="String(menu.order)">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>{{ menu.authName }}</span>
      </template>
      <el-menu-item v-for="submenu in menu.children" :key="submenu.id" :index="String(submenu.id)">
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
  },
  mounted() {
    this.getMenuList();
  },
};
</script>

<style scoped>
.el-menu {
	border: none;
}
</style>