<template>
  <div class="workArrange-setting">
    <el-card style="margin-top: 20px;padding-bottom: 65px">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" @click="dialogVisible=true">排班设置</el-button>
      </el-row>
      <el-table :row-style="{fontSize:'13px'}"
                v-loading="loading"
                :data="tableData"
                :header-cell-style="{background:'#f8faff'}"
                stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column fixed label="工作模式编号" prop="id"/>
        <el-table-column fixed label="工作模式" prop="name"/>
        <el-table-column fixed label="类型" prop="workPatternTypeDesc" />
        <el-table-column fixed label="工作日期" prop="workDate"/>
        <el-table-column fixed label="工作时间">
          <template #default="{row}">
            {{ row.workEndMinute1/60 }}.00小时
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="handleEdit(row)" :underline="false" style="color: #419eff">编辑</el-link>
              <div class="split"></div>
              <el-link type="danger" :underline="false" @click="handleDel(row.id)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 26px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[1,2,5,10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import tableInit from '@/mixins/tableInit'
import { getWorkArrangeSetting } from '@/api/employees'

export default {
  name: 'workArrange-setting',
  mixins: [tableInit],
  data () {
    return {
    }
  },
  methods: {
    async getList () {
      const { data } = await getWorkArrangeSetting({
        page: this.current,
        pageSize: this.pageSize
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
    },
    handleEdit () {},
    handleDel () {}
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table {
  border: 1px solid #eee;
  border-bottom: none;
  margin-bottom: 10px;

  .split {
    height: 14px;
    width: 1px;
    background: #d7dae2;
    margin: 0 10px;
  }
}
</style>
