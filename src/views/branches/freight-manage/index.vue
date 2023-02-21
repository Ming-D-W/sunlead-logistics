<template>
  <div class="freight-manage">
    <el-card>
      <el-button @click="handleAdd" type="primary" style="margin-bottom: 20px">新增模版</el-button>
      <el-table :data="tableData" :header-cell-style="{background:'#f8faff'}" stripe>
        <el-table-column label="模板类型" prop="templateType">
          <template #default="{row}">{{ formatterTemplate(row.templateType) }}</template>
        </el-table-column>
        <el-table-column label="运送类型" prop="transportType">
          <template #default="{row}">{{ formatterTransport(row.transportType) }}</template>
        </el-table-column>
        <el-table-column label="关联城市" prop="associatedCityList"/>
        <el-table-column label="首重" prop="firstWeight"/>
        <el-table-column label="续重" prop="continuousWeight"/>
        <el-table-column label="轻抛系数" prop="lightThrowingCoefficient"/>
        <el-table-column label="操作" width="165">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link @click="handleEdit(row)" :underline="false" style="color: #419eff">编辑</el-link>
              <div class="split"></div>
              <el-link type="danger" :underline="false" @click="handleDel">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MyDialog @cancel="cancel" @submit="submit" :title="title" :dialog-visible.sync="dialogVisible">
      <template #content>
        <el-form :model="formData" :rules="rules" ref="addForm">
          <el-form-item label="模板类型" label-width="130px" prop="templateType">
            <el-select v-model="formData.templateType">
              <el-option v-for="item in templateOptions"
                         :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运送类型" label-width="130px" prop="transportType">
            <el-select v-model="formData.transportType">
              <el-option v-for="item in transportOptions"
                         :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联城市" label-width="130px" prop="associatedCityList">
            <el-checkbox-group v-model="formData.associatedCityList" v-if="title==='编辑模板'">
              <el-checkbox label="京津冀" name="associatedCityList"></el-checkbox>
              <el-checkbox label="江浙沪" name="associatedCityList"></el-checkbox>
              <el-checkbox label="川渝" name="associatedCityList"></el-checkbox>
              <el-checkbox label="黑吉辽" name="associatedCityList"></el-checkbox>
            </el-checkbox-group>
            <div v-else>{{ formData.associatedCityList }}</div>
          </el-form-item>
          <el-form-item label="首重价格" label-width="130px" prop="firstWeight">
            <el-input v-model="formData.firstWeight"/>
          </el-form-item>
          <el-form-item label="续重价格" label-width="130px" prop="continuousWeight">
            <el-input v-model="formData.continuousWeight"/>
          </el-form-item>
          <el-form-item label="轻抛系数" label-width="130px" prop="lightThrowingCoefficient">
            <el-input v-model="formData.lightThrowingCoefficient"/>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import { getCarriagesList } from '@/api/organization-manage'

const transportType = {
  1: '普快'
}
const templateType = {
  1: '同城寄',
  2: '省内寄',
  3: '经济区互寄',
  4: '跨省'
}
const cityType = {
  2: '京津冀',
  3: '江浙沪',
  4: '川渝',
  5: '黑吉辽'
}
export default {
  name: 'freight-manage',
  data () {
    return {
      tableData: [],
      type: '',
      dialogVisible: false,
      formData: {
        associatedCityList: '全国'
      },
      transportOptions: [
        {
          label: '普快',
          value: 1
        }
      ],
      templateOptions: [
        {
          label: '同城寄',
          value: 1
        },
        {
          label: '省内寄',
          value: 2
        },
        {
          label: '经济区互寄',
          value: 3
        },
        {
          label: '跨省',
          value: 4
        }
      ],
      rules: {
        templateType: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        transportType: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        associatedCityList: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        firstWeight: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        continuousWeight: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        lightThrowingCoefficient: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }]
      }
    }
  },
  methods: {
    async getList () {
      const { data } = await getCarriagesList()
      this.tableData = data
    },
    formatterTransport (data) {
      return transportType[data]
    },
    formatterTemplate (data) {
      return templateType[data]
    },
    async submit () {
      await this.$refs.addForm.validate()
      this.$message.error('演示系统，不能修改数据')
    },
    cancel () {
      this.$refs.addForm.resetFields()
      this.formData = {
        associatedCityList: '全国'
      }
    },
    handleAdd () {
      this.type = 'add'
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.type = 'edit'
      this.formData = row
      this.formData.associatedCityList[0] = cityType[this.formData.associatedCityList[0]]
      this.dialogVisible = true
    },
    async handleDel () {
      await this.$confirm('确认删除？')
      this.$message.error('演示系统，不能修改数据')
    }
  },
  created () {
    this.getList()
  },
  computed: {
    title () {
      return this.type === 'add' ? '添加模板' : '编辑模板'
    }
  }
}
</script>

<style scoped lang="scss">
.freight-manage {
  padding: 0 10px;

  .el-table {
    border: 1px solid #eee;

    .split {
      height: 14px;
      width: 1px;
      background: #d7dae2;
      margin: 0 10px;
    }
  }

  ::v-deep .el-select {
    width: 100%;
  }
}
</style>
