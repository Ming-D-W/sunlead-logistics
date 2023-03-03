<template>
  <div class="workArrange-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="员工账号:" label-width="120px">
              <el-input v-model="searchText.account" placeholder="请输入员工账号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工姓名:" label-width="120px">
              <el-input v-model="searchText.name" placeholder="请输入员工姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作模式:" label-width="120px">
              <el-select v-model="searchText.workPatternId" style="width: 100%;">
                <el-option v-for="item in workOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="员工姓名:" label-width="120px">
              <el-date-picker
                v-model="searchText.month"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属机构:" label-width="120px">
              <treeselect
                :appendToBody="true"

                v-model="searchText.agentId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left: 50px">
            <el-button type="primary" @click="getList()">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" @click="$router.push('/transit/workArrange-setting')">排班设置</el-button>
        <el-button type="primary" plain @click="handlePattern">绑定排班</el-button>
      </el-row>
      <el-table :row-style="{fontSize:'13px'}"
                v-loading="loading"
                :data="tableData"
                @selection-change="handleSelectionChange"
                :header-cell-style="{background:'#f8faff'}"
                stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column fixed type="selection"/>
        <el-table-column fixed label="员工账号" prop="employeeNumber"/>
        <el-table-column fixed label="员工姓名" prop="name"/>
        <el-table-column fixed label="员工电话" prop="phone" width="120" />
        <el-table-column fixed label="员工角色" prop="userType"/>
        <el-table-column fixed label="当前工作模式" prop="workPatternId" width="120">
          <template #default="{row}">
            {{ row.workPatternId | formatWorkPattern}}
          </template>
        </el-table-column>
        <el-table-column v-for="item in 28" :key="item" :label="item.toString()">
          <template #default="{row}">
            <div v-if="row.workSchedules[item]" class="work">上</div>
            <div v-else class="rest">休</div>
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
    <MyDialog :dialog-visible.sync="dialogVisible" title="人工设置" @cancel="cancel" @submit="submit">
      <template #content>
        <el-form>
          <el-form-item style="padding-left: 50px">
            <el-radio-group v-model="formData.workPatternType">
              <el-radio label="礼拜制"></el-radio>
              <el-radio label="连续制"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模式名称" label-width="120px">
            <el-select v-model="formData.workPatternId" style="width: 100%;">
              <el-option v-for="item in workOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
  </div>
</template>

<script>

import searchBox from '@/mixins/searchBox'
import { bandingWorkPattern, getWorkPattern } from '@/api/employees'

let that

export default {
  name: 'workArrange-manage',
  mixins: [searchBox],
  filters: {
    formatWorkPattern (value) {
      return that.workOptions.find(item => item.value === value).label
    }
  },
  data () {
    return {
      workOptions: [
        {
          label: '周末双休',
          value: '1575258946549919745'
        },
        {
          label: '周日单休',
          value: '1575259393138438146'
        },
        {
          label: '连续上班996',
          value: '1575347921490882562'
        },
        {
          label: '无敌班次',
          value: '1607663189078413313'
        },
        {
          label: '上四休三',
          value: '1575258988581040130'
        },
        {
          label: '上三休三',
          value: '1575259505889718273'
        },
        {
          label: '暂无排班',
          value: ''
        }
      ],
      formData: {
        workPatternType: '礼拜制'
      },
      selectList: []
    }
  },
  methods: {
    async getList () {
      const { data } = await getWorkPattern({
        ...this.searchText,
        page: this.current,
        pageSize: this.pageSize
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
    },
    handleSelectionChange (val) {
      this.selectList = val
    },
    cancel () {
      this.dialogVisible = false
      this.formData = {
        workPatternType: '礼拜制'
      }
    },
    async submit () {
      const userIdList = this.selectList.map(item => {
        return item.userId
      })
      await bandingWorkPattern({
        userIdList,
        workPatternId: this.formData.workPatternId,
        workPatternType: this.formData.workPatternType === '礼拜制' ? 1 : 2
      })
      this.$message.success('绑定排班成功')
      this.cancel()
      this.getList()
    },
    handlePattern () {
      if (!this.selectList.length) {
        this.$message.error('请选择调整人员')
      } else {
        this.dialogVisible = true
      }
    }
  },
  beforeCreate () {
    that = this
  }
}
</script>

<style scoped lang="scss">
.top-card {
  ::v-deep .el-date-editor.el-input__inner, .el-date-editor.el-input {
    width: 100%;
  }

  ::v-deep .el-input--suffix .el-input__inner {
    width: 100%;
  }

  ::v-deep .vue-treeselect__placeholder {
    line-height: 40px;
  }

  ::v-deep .vue-treeselect__single-value {
    line-height: 40px;
  }
}
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
.work {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #e15536;
  font-size: 13px;
  line-height: 20px;
  background-color: #ffeeeb;
  color: #e15536;
  text-align: center;
}
.rest {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #d8dde3;
  font-size: 13px;
  line-height: 20px;
  background: #eff3f8;
  color: #20232a;
  text-align: center;
}
</style>
