<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
