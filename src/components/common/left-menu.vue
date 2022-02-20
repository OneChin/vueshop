<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>导航一</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>导航二</span>
					</el-menu-item>
      </el-menu-item-group>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>