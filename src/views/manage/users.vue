<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <!-- 绑定清空事件，重新请求数据 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserData">
            <el-button slot="append" icon="el-icon-search" @click="getUserData"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" stripe border>
        <!-- 添加索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- scope 接收数据，scope.row 代表当前行, 和 switch 组件绑定, 
          使用了 slot-scope 的话就不用写上面的 prop 了 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
            @change="userStateChange(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <!-- 使用自定义插槽自定义操作 -->
        <!-- 使用 scope 获取数据 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope)"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable=false
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="pageSizes"
        :page-size="queryInfo.pagesize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      total: 0,
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      pageSizes: [2, 5, 10]
    };
  },
  methods: {
    async getUserData() {
      let { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      // 状态码不是200, return 的话不会继续
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    /**
     * 单页显示页数变更
     */
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      // 重新请求数据
      this.getUserData()
    },
    /**
     * 当前页码改变
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      // 重新请求数据
      this.getUserData()
    },
    /**
    *  用户状态改变事件
     */
    async userStateChange(user) {
      let result = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      if (result.data.meta.status !== 200) {
        user.mg_state = !user.mg_state;
        return this.$message.error("更新用户失败")
      }
      this.$message.success("更新用户状态成功")
     }
  },
  mounted() {
    this.getUserData();
  },
};
</script>