<template>
  <div class="workArrange-setting">
    <el-card style="margin-top: 20px;padding-bottom: 65px">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" @click="dialogVisible=true">添加工作模式</el-button>
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
        <el-table-column fixed label="类型" prop="workPatternType">
          <template #default="{row}">
            {{ row.workPatternType === 1 ? '礼拜制' : '连续制' }}
          </template>
        </el-table-column>
        <el-table-column fixed label="工作日期" prop="workDate"/>
        <el-table-column fixed label="工作时间">
          <template #default="{row}">
            {{ ((row.workEndMinute1 - row.workStartMinute1) / 60).toFixed(2) }}小时
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
    <MyDialog :dialog-visible.sync="dialogVisible" :title="title" @cancel="cancel" @submit="submit">
      <template #content>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="礼拜制" name="0" v-if="!formData.id||type===1">
            <el-form :model="formData" :rules="rules" ref="addForm">
              <el-form-item label="工作模式名称：" label-width="130px" prop="name">
                <el-input v-model="formData.name" placeholder="请输入工作模式名称"/>
              </el-form-item>
              <el-form-item label="连续工作天数：" label-width="130px" prop="days">
                <el-checkbox-group v-model="formData.days">
                  <el-checkbox label="周一"></el-checkbox>
                  <el-checkbox label="周二"></el-checkbox>
                  <el-checkbox label="周三"></el-checkbox>
                  <el-checkbox label="周四"></el-checkbox>
                  <el-checkbox label="周五"></el-checkbox>
                  <el-checkbox label="周六"></el-checkbox>
                  <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="工作时间：" label-width="130px" prop="time">
                <el-time-picker
                  format='HH:mm'
                  value-format="HH:mm"
                  is-range
                  v-model="formData.time"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="连续制" name="1" v-if="!formData.id||type===2">
            <el-form :model="formData" :rules="rules" ref="addForm">
              <el-form-item label="工作模式名称：" label-width="130px" prop="name">
                <el-input v-model="formData.name" placeholder="请输入工作模式名称"/>
              </el-form-item>
              <el-form-item label="连续工作天数：" label-width="130px" prop="workDay">
                <el-row>
                  <el-col :span="2">上</el-col>
                  <el-col :span="6">
                    <el-input v-model="formData.workDayNum" placeholder="请输入">
                      <template #suffix>
                        <div style="margin-right: 5px;color: #000">天</div>
                      </template>
                    </el-input>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="2">休</el-col>
                  <el-col :span="6">
                    <el-input v-model="formData.restDayNum" placeholder="请输入">
                      <template #suffix>
                        <div style="margin-right: 5px;color: #000">天</div>
                      </template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="工作时间：" label-width="130px" prop="time">
                <el-time-picker
                  format='HH:mm'
                  value-format="HH:mm"
                  is-range
                  v-model="formData.time"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import tableInit from '@/mixins/tableInit'
import { addWorkType, delWorkType, getWorkArrangeSetting, updateWorkType } from '@/api/employees'

let that
export default {
  name: 'workArrange-setting',
  mixins: [tableInit],
  data () {
    function validateWorkDay (rule, value, callback) {
      if (that.formData.workDayNum !== undefined && that.formData.restDayNum !== undefined) {
        callback()
      } else {
        callback(new Error('不能为空'))
      }
    }

    return {
      activeName: 0,
      formData: {
        days: []
      },
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      daysMap: {
        monday: '周一',
        tuesday: '周二',
        wednesday: '周三',
        thursday: '周四',
        friday: '周五',
        saturday: '周六',
        sunday: '周日'
      },
      rules: {
        name: [{
          required: true,
          trigger: 'blur',
          message: '工作模式名称不能为空'
        }],
        days: [{
          required: true,
          trigger: 'blur',
          message: '连续工作天数不能为空'
        }],
        time: [{
          required: true,
          trigger: 'blur',
          message: '工作时间不能为空'
        }],
        workDay: [{
          required: true,
          validator: validateWorkDay,
          message: '不能为空'
        }]
      },
      type: 0
    }
  },
  beforeCreate () {
    that = this
  },
  computed: {
    title () {
      return this.type === 0 ? '新增工作模式' : '编辑工作模式'
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
    handleEdit (row) {
      this.formData = row
      this.formData.days = []
      this.days.forEach(item => {
        if (row[item] === 1) {
          this.formData.days.push(this.daysMap[item])
        }
      })
      this.formData.time = []
      this.formData.time[0] = this.minTime(this.formData.workStartMinute1)
      this.formData.time[1] = this.minTime(this.formData.workEndMinute1)
      this.type = this.formData.workPatternType
      this.dialogVisible = true
    },
    async handleDel (id) {
      await this.$confirm('确认删除吗')
      await delWorkType(id)
      this.$message.success('删除成功')
      this.getList()
    },
    cancel () {
      this.$refs.addForm.resetFields()
      this.formData = {
        days: []
      }
      this.dialogVisible = false
    },
    async submit () {
      await this.$refs.addForm.validate()
      if (this.type === 0) {
        let data
        if (this.activeName === '0') {
          data = {
            ...this.validateDays(),
            name: this.formData.name,
            workPatternType: +this.activeName + 1,
            ...this.formatTime()
          }
        } else {
          data = {
            name: this.formData.name,
            workPatternType: +this.activeName + 1,
            restDayNum: this.formData.restDayNum,
            workDayNum: this.formData.workDayNum,
            ...this.formatTime()
          }
        }
        await addWorkType(data)
        this.$message.success('添加工作模式成功')
      } else {
        const days = this.validateDays()
        const time = this.formatTime()
        delete this.formData.days
        delete this.formData.time
        await updateWorkType({
          ...this.formData,
          ...days,
          ...time
        })
        this.$message.success('修改工作模式成功')
      }
      this.cancel()
      this.getList()
    },
    validateDays () {
      const obj = {}
      this.days.forEach(item => {
        if (this.formData.days.includes(this.daysMap[item])) {
          obj[item] = 1
        } else {
          obj[item] = 2
        }
      })
      return obj
    },
    formatTime () {
      const startArr = this.formData.time[0].split(':')
      const workStartMinute1 = startArr[0] * 60 + (+startArr[1])
      const endArr = this.formData.time[1].split(':')
      const workEndMinute1 = endArr[0] * 60 + (+endArr[1])
      return {
        workStartMinute1,
        workEndMinute1
      }
    },
    minTime (min) {
      let minTime = ''
      let h = Math.floor(min / 60)
      min -= h * 60
      if (min === 0) {
        minTime = h ? '0' + h + ':00' : ''
      } else {
        if (min < 10) {
          min = '0' + min
        }
        if (h < 10) {
          h = '0' + h
        }
        minTime = (h ? h + ':' : '00:') + (min ? min + '' : '')
      }
      return minTime
    },
    handleClick () {
      this.formData = {
        days: []
      }
    }
  },
  watch: {
    type (value) {
      this.activeName = (value - 1).toString()
    }
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

::v-deep .el-dialog__body {
  padding: 30px 60px 0;
}

::v-deep .el-dialog {
  width: 700px !important;
}

::v-deep .el-checkbox {
  margin-right: 12px;
}

::v-deep .el-date-editor--timerange.el-input__inner {
  width: 100%;
}
</style>
