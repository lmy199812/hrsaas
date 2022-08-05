<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools :isRoot="true" :treeNode="company" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all="">
          <template v-slot="{ data }">
            <treeTools :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
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
      company: { name: '传智播客教育', manager: '负责人' }
    }
  },
  components: {
    treeTools
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
