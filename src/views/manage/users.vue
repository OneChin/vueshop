<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <!-- 绑定清空事件，重新请求数据 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserData"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserData"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
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
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
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
              @click="showEditDialog(scope.row.id)"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
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
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      width="50%"
      :visible.sync="addDialogVisible"
      @close="addDialogClose"
    >
      <!-- 主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      width="50%"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
    >
      <!-- 主体区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </el-dialog>
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
        pagesize: 10,
      },
      pageSizes: [5, 10, 15],
      // 添加对话框的显示与隐藏
      addDialogVisible: false,
      // 修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      // 编辑用户对象
      editForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      // 邮箱的校验规则
      checkEamil: (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb();
        }
        cb(new Error("请输入合法的邮箱"));
      },
      // 手机号的校验规则
      checkMobile: (rule, value, cb) => {
        const regMobile =
          /^(0|86|1751)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (regMobile.test(value)) {
          // 合法的邮箱
          return cb();
        }
        cb(new Error("请输入合法的手机号"));
      },
      // 添加表单验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6-15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          // {
          //   validator: checkEamil,
          //   trigger: "blur",
          // },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          // {
          //   validator: checkMobile,
          //   trigger: "blur",
          // },
        ],
      },
      // 添加表单验证规则
      editFormRules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          // {
          //   validator: checkEamil,
          //   trigger: "blur",
          // },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          // {
          //   validator: checkMobile,
          //   trigger: "blur",
          // },
        ],
      },
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
      this.getUserData();
    },
    /**
     * 当前页码改变
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      // 重新请求数据
      this.getUserData();
    },
    /**
     *  用户状态改变事件
     */
    async userStateChange(user) {
      let result = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      if (result.data.meta.status !== 200) {
        user.mg_state = !user.mg_state;
        return this.$message.error("更新用户失败");
      }
      this.$message.success("更新用户状态成功");
    },
    /**
     * 处理对话框的关闭事件
     */
    addDialogClose() {
      // this.addForm = {
      //   username: "",
      //   password: "",
      //   email: "",
      //   phone: "",
      // }
      this.$refs.addFormRef.resetFields();
    },
    /**
     * 添加新用户
     */
    addUser() {
      // 先进性表单的校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          console.log(valid);
        }
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败");
        }
        if (res.meta.status === 201) {
          this.$message.success("添加成功");
          this.getUserData();
          this.addDialogVisible = false;
        }
      });
    },
    /**
     * 展示用户编辑的用户框
     */
    async showEditDialog(id) {
      this.editDialogVisible = true;
      let { data: result } = await this.$http.get(`users/${id}`);
      if (result.meta.status !== 200) {
        return this.$message.error("查询用户信息失败");
      }
      if (result.meta.status === 200) {
        this.editForm = result.data;
        this.editDialogVisible = true;
      }
    },
    /**
     * 监听用户修改表单的重置事件
     */
    editDialogClose() {
      // 重置表单
      this.$refs.editFormRef.resetFields();
    },
    /**
     * 编辑用户
     */
    editUser() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (valid === true) {
          let { data: res } = await this.$http.put(
            `users/${this.editForm.id}`,
            {
              email: this.editForm.email,
              mobile: this.editForm.mobile,
            }
          );
          if (res.meta.status !== 200) {
            return this.$message.error("更新用户信息错误");
          }
          if (res.meta.status === 200) {
            this.$message.success("修改成功");
            this.getUserData();
            this.editDialogVisible = false;
          }
        }
      });
    },
    /**
     * 根据 id 删除对应的用户信息
     */
    async removeUserById(id) {
      let res = await this.$confirm("是否删除用户?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      // catch 捕获消息，取消返回的是 cancel
      // 如果用户确认，返回的时 confirm
      if (res !== "confirm") {
        this.$message.info("取消删除");
      }
      if (res === "confirm") {
        let { data: result } = await this.$http.delete(`users/${id}`);
        if (result.meta.status === 200) {
          this.$message.success("删除成功");
          this.getUserData();
        }
      }
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>