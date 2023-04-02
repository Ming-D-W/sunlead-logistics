<template>
  <div class="car-models">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车型编号" label-width="80px">
              <el-input v-model="searchText.id" placeholder="请输入车型编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应载重量" label-width="80px">
              <el-select v-model="searchText.allowableLoad" placeholder="请输入应载重量">
                <el-option v-for="item in allowableLoadOptions" :key="item.value" :label="item.label" :value="item.value"  />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应载体积" label-width="80px">
              <el-select v-model="searchText.allowableVolume" placeholder="请输入应载体积">
                <el-option v-for="item in allowableVolumeOptions" :key="item.value" :label="item.label" :value="item.value"  />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车辆类型" label-width="80px">
              <el-input v-model="searchText.name" placeholder="请输入车辆类型"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="getList('search')">搜索</el-button>
            <el-button type="primary" plain @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" style="margin-bottom: 20px" @click="handleAdd">新增车型</el-button>
      <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <div class="empty-box">
            <img src="@/assets/icon-empty.png">
            <div>没有找到您要的内容哦~</div>
          </div>
        </template>
        <el-table-column label="序号" type="index" width="80px"/>
        <el-table-column label="车型编号" prop="id"/>
        <el-table-column label="车辆类型" prop="name"/>
        <el-table-column label="车型数量" prop="num"/>
        <el-table-column label="应载重量（吨）" prop="allowableLoad"/>
        <el-table-column label="应载体积（立方米）" prop="allowableVolume"/>
        <el-table-column label="长（米）" prop="measureLong"/>
        <el-table-column label="宽（米）" prop="measureWidth"/>
        <el-table-column label="高（米）" prop="measureHigh"/>
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
    <my-dialog :dialog-visible.sync="dialogVisible" @cancel="cancel" @submit="submit" :title="title">
      <template #content>
        <el-form :model="formData" :rules="rules" ref="addForm">
          <el-form-item label="车辆类型" label-width="130px" prop="name">
            <el-input v-model="formData.name"/>
          </el-form-item>
          <el-form-item label="应载重量" label-width="130px" prop="allowableLoad">
            <el-input v-model="formData.allowableLoad">
              <template #suffix>
                <div style="color: #000;margin-right: 10px">吨</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="应载体积" label-width="130px" prop="allowableVolume">
            <el-input v-model="formData.allowableVolume">
              <template #suffix>
                <div style="color: #000;margin-right: 10px">立方</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="长" label-width="130px" prop="lightThrowingCoefficient">
            <el-input v-model="formData.measureLong">
              <template #suffix>
                <div style="color: #000;margin-right: 10px">米</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="宽" label-width="130px" prop="lightThrowingCoefficient">
            <el-input v-model="formData.measureWidth">
              <template #suffix>
                <div style="color: #000;margin-right: 10px">米</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="高" label-width="130px" prop="lightThrowingCoefficient">
            <el-input v-model="formData.measureHigh">
              <template #suffix>
                <div style="color: #000;margin-right: 10px">米</div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
    </my-dialog>
  </div>
</template>

<script>
import { addTruckApi, deleteTruckApi, getTruckDetail, getTruckTypeApi, updateTruckApi } from '@/api/car-manager'

export default {
  name: 'car-models',
  data () {
    const validateValue = (rule, value, callback) => {
      const num = parseInt(value)
      if (num > 100 || num < 1) {
        callback(new Error('只可输入1-100之间的整数'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      current: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      formData: {
        measureHigh: 0.0,
        measureLong: 0.0,
        measureWidth: 0.0
      },
      type: '',
      rules: {
        name: [{
          required: true,
          trigger: 'blur',
          message: '不能为空'
        }],
        allowableLoad: [{
          required: true,
          trigger: 'blur',
          validator: validateValue
        }],
        allowableVolume: [{
          required: true,
          trigger: 'blur',
          validator: validateValue
        }]
      },
      searchText: {},
      allowableLoadOptions: [
        { label: '<1.8（吨）', value: 'RANGE_LEVEL_1' },
        { label: '1.8-6（吨）', value: 'RANGE_LEVEL_2' },
        { label: '6-14（吨）', value: 'RANGE_LEVEL_3' },
        { label: '14-30（吨）', value: 'RANGE_LEVEL_4' },
        { label: '30-50（吨）', value: 'RANGE_LEVEL_5' },
        { label: '50-100（吨）', value: 'RANGE_LEVEL_6' },
        { label: '100>（吨）', value: 'RANGE_LEVEL_7' }
      ],
      allowableVolumeOptions: [
        { label: '<3（㎡）', value: 'RANGE_LEVEL_1' },
        { label: '3-5（㎡）', value: 'RANGE_LEVEL_2' },
        { label: '5-10（㎡））', value: 'RANGE_LEVEL_3' },
        { label: '10-15（㎡）', value: 'RANGE_LEVEL_4' },
        { label: '15-30（㎡）', value: 'RANGE_LEVEL_5' },
        { label: '30-50（㎡）', value: 'RANGE_LEVEL_6' },
        { label: '50-80（㎡）', value: 'RANGE_LEVEL_7' },
        { label: '80-150（㎡）', value: 'RANGE_LEVEL_8' },
        { label: '>150（㎡）', value: 'RANGE_LEVEL_9' }
      ],
      loading: false
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange (page) {
      this.current = page
      this.getList()
    },
    async getList (text) {
      this.loading = true
      let params
      if (text) {
        params = {
          page: this.current,
          pageSize: this.pageSize,
          ...this.searchText
        }
      } else {
        params = {
          page: this.current,
          pageSize: this.pageSize
        }
      }
      const { data } = await getTruckTypeApi(params)
      this.tableData = data.items
      this.total = parseInt(data.counts)
      this.loading = false
    },
    async handleEdit (row) {
      this.type = 'edit'
      this.dialogVisible = true
      const { data } = await getTruckDetail(row.id)
      this.formData = data
    },
    async handleDel (id) {
      await this.$confirm('确认删除？')
      await deleteTruckApi(id)
      this.$message.success('成功删除车型')
      this.getList()
    },
    async submit () {
      await this.$refs.addForm.validate()
      if (this.type === 'add') {
        await addTruckApi(this.formData)
        this.$message.success('成功新增车型')
      } else {
        await updateTruckApi(this.formData)
        this.$message.success('成功修改车型')
      }
      this.cancel()
      this.getList()
    },
    cancel () {
      this.$refs.addForm.resetFields()
      this.formData = {
        measureHigh: 0.0,
        measureLong: 0.0,
        measureWidth: 0.0
      }
      this.dialogVisible = false
    },
    handleAdd () {
      this.type = 'add'
      this.dialogVisible = true
    },
    reset () {
      this.searchText = {}
      this.getList()
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
.car-models {
  padding: 0 10px;
  .el-form-item {
    padding-right: 60px;
  }
  .top-card {
    ::v-deep .el-card__body {
      padding-bottom: 0;
    }
  }
  .el-table {
    border: 1px solid #eee;
    border-bottom: none;
    margin-bottom: 10px;
    .empty-box {
      img {
        width: 336px;
        height: 236px;
      }
    }
    .split {
      height: 14px;
      width: 1px;
      background: #d7dae2;
      margin: 0 10px;
    }
    ::v-deep .el-input__suffix {
      display: block;
      padding-right: 10px;
      color: #000!important;
    }
  }
}
</style>
