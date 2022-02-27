<template>
  <div>
    <!-- <h3>权限列表组件页面</h3> -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">
              二级
            </el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="pageSizes"
        :page-size="queryInfo.pagesize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      /> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [],
    };
  },
  methods: {
    async getRightsList() {
      let { data: result } = await this.$http.get("rights/list");
      if (result.meta.status !== 200) {
        return this.$message.error("获取权限列表失败");
      }
      if (result.meta.status === 200) {
        this.rightsList = result.data;
      }
    },
  },
  mounted() {
    this.getRightsList();
  },
};
</script>

<style scoped>
</style>