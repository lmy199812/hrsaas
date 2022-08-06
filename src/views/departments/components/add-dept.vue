<template>
  <el-dialog
    @close="onClose"
    :title="changeDepts"
    :visible="visible"
    width="50%"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          v-model="formData.manager"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  addDeptsId,
  editDeptsApi
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    // 检验部门名称是否重复
    const checkName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        )
        const isRepeat = filtersDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.addNode.children) return callback()
        // 1判断value 是否 和添加的同级部门是否重复 (获取同级部门)
        const isRepeat = this.addNode.children.some(
          (item) => item.name === value
        )
        // 2如果重复 返回回调
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    addNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployees()
  },
  computed: {
    changeDepts() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      // console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          console.log('编辑')
          await editDeptsApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          this.formData.pid = this.addNode.id
          // console.log(this.formData)
          // console.log('表单校验成功')

          await addDeptsApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await addDeptsId(id)
      console.log(id)
    }
  }
}
</script>

<style scoped></style>
