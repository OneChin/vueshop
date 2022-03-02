<template>
  <div>
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="roleList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="职位" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button size="mini" icon="el-icon-setting" type="warning"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
    };
  },
  methods: {
    async getRoleList() {
      let { data: result } = await this.$http.get("roles");
      if (result.meta.status !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      if (result.meta.status === 200) {
        this.$message.success("获取角色列表成功");
        this.roleList = result.data;
      }
    },
  },
  mounted() {
    this.getRoleList();
  },
};
</script>