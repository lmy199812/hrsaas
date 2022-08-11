<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="280">
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :pageSize="pagesize"
            :page-sizes="[3, 5, 10, 20]"
            layout="sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            description="文字说明文字说明文字说明文字说明文字说明文字说明"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="30%"
      append-to-body
      @click="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRolesForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRolesForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRolesForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRoleApi } from '@/api/role'
import { getCompanyApi } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0, // 记录总数
      pagesize: 3,
      // 放置页码及相关数据
      page: 1,
      addRolesForm: {
        name: '',
        description: ''
      },
      addDialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      companyInfo: {}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    // 获取角色列表
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      // console.log(rows)
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      // 当前点击的页码
      this.page = val // 将当前页码赋值给当前的最新页码
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRoles() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRolesForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRolesForm.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyApi(this.$store.state.user.userInfo.companyId)
      console.log(res)
      this.companyInfo = res
    }
  }
}
</script>

<style scoped lang="less"></style>
