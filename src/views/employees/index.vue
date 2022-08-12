<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            @click="$router.push('/import')"
            type="warning"
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button
            size="small"
            type="primary"
            @click="showAddEmployees = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry"
            ><template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <addEmployees
      @add-success="getEmployeesList"
      :visible.sync="showAddEmployees"
    />
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'

import addEmployees from './components/addEmployees.vue'
export default {
  name: 'Employees',
  data() {
    return {
      employees: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAddEmployees: false
    }
  },
  components: {
    addEmployees
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
    // 获取数据
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      // console.log(rows)
      this.employees = rows
      this.total = total
    },
    // 页码改变刷新列表
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    // formatFormOfEmployment(row, column, cellValue, index) {
    //   if (cellValue === 1) return '正式'
    //   if (cellValue === 2) return '非正式'
    //   return '未知'
    // }

    // 员工聘用状态
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },

    // 删除功能
    async onRemove(id) {
      await this.$confirm('确定删除')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getEmployeesList()
    }
  }
}
</script>

<style scoped lang="less"></style>
