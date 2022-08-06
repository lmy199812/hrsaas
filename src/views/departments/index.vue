<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <treeTools @add="Add" :isRoot="true" :treeNode="company" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all="">
          <template v-slot="{ data }">
            <treeTools
              @remove="loadDepts"
              @add="Add"
              :treeNode="data"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹出框 -->
    <addDepts
      ref="addDept"
      :visible.sync="dialogVisible"
      @add-success="loadDepts"
      :addNode="addNode"
    />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import addDepts from './components/add-dept.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '传智播客教育', manager: '负责人' },
      dialogVisible: false,
      addNode: {},
      loading: false
    }
  },
  components: {
    treeTools,
    addDepts
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading = true
      const res = await getDeptsApi()
      // console.log(res)
      this.treeData = transListToTree(res.depts, '')
      this.loading = false
    },
    Add(val) {
      this.dialogVisible = true
      this.addNode = val
    },
    showEdit(val) {
      // console.log(234523)
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped lang="less"></style>
