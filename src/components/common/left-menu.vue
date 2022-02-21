<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#ffd04b"
		:default-active="1"
  >
    <el-submenu v-for="menu in menuList" :key="menu.order" :index="menu.index">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>{{ menu.authName }}</span>
      </template>
      <el-menu-item v-for="submenu in menu.children" :key="submenu.id" :index="submenu.order">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
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
      console.log(this.menuList);
    },
  },
  mounted() {
    this.getMenuList();
  },
};
</script>
