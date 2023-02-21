<template>
  <div class="organization-manage-page">
    <left-tree ref="son" :tree-data="treeData" @handleNodeClick="handleNodeClick"/>
    <div class="right-card">
      <div class="organ-info">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>机构信息</span>
          </div>
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构编号" label-width="120px">
                  <el-input v-model="formData.id" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构名称" label-width="120px">
                  <el-input v-model="formData.name" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构类型" label-width="120px">
                  <el-input v-model="formData.type" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="机构地址" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-select :disabled="editDisabled" v-model="formData.province.id" placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in provinceOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8" style="padding: 0 4px">
                  <el-select :disabled="editDisabled" v-model="formData.city.id" placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select :disabled="editDisabled" v-model="formData.county.id" placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in countyOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="详细地址" label-width="120px">
                  <el-input :disabled="editDisabled" v-model="formData.address"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经度" label-width="120px">
                  <el-input v-model="formData.longitude" disabled>
                    <template #suffix>
                      <div style="margin-right: 14px">E</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纬度" label-width="120px">
                  <el-input v-model="formData.latitude" disabled>
                    <template #suffix>
                      <div style="margin-right: 14px">N</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构负责人" label-width="120px">
                  <el-input :disabled="editDisabled" v-model="formData.managerName"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构电话" label-width="120px">
                  <el-input :disabled="editDisabled" v-model="formData.phone"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" style="padding: 10px 30px" @click="handleEdit">{{ btnText }}</el-button>
          </el-row>
        </el-card>
      </div>
      <div class="emp-info">
        <el-card>
          <div slot="header" class="clearfix">
            <span>员工信息</span>
          </div>
          <el-table :data="tableData" :header-cell-style="{background:'#f8faff'}" stripe>
            <el-table-column label="序号" type="index"/>
            <el-table-column label="员工编号" prop="userId"/>
            <el-table-column label="员工姓名" prop="name"/>
            <el-table-column label="手机号" prop="mobile"/>
            <el-table-column label="所属机构" prop="agency.name"/>
            <el-table-column label="系统账户" prop="account"/>
            <el-table-column label="系统角色" prop="roleNames[0]"/>
            <el-table-column label="账号状态">
              <template #default="{row}">
                <div class="status">{{ row.status === 1 ? '正常' : '异常' }}</div>
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
    </div>
  </div>
</template>

<script>
import {
  getCityOrArea,
  getEmpListApi,
  getOrganDetailApi,
  getProvince,
  getTreeOrganApi
} from '@/api/organization-manage'
import LeftTree from '@/views/branches/components/left-tree/index.vue'

export default {
  name: 'organization-manage',
  components: { LeftTree },
  data () {
    return {
      treeData: [],
      value: '',
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
      tableData: [],
      formData: {
        province: { id: '' },
        city: { id: '' },
        county: { id: '' }
      },
      editDisabled: true,
      current: 1,
      pageSize: 5,
      total: 0
    }
  },
  methods: {
    async getData () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    },
    async setDefaultData () {
      await this.getOrganDetail('1024985257948084801')
      this.$nextTick(() => {
        this.$refs.son.$refs.organTree.setCurrentKey('1024985257948084801')
      })
    },
    async getOrganDetail (id) {
      const res = await getOrganDetailApi(id)
      this.formData = res.data
    },
    async handleNodeClick (node) {
      this.editDisabled = true
      this.getOrganDetail(node.id)
      this.getEmpList()
    },
    async getEmpList () {
      this.current = 1
      this.pageSize = 5
      const { data } = await getEmpListApi({
        page: this.current,
        pageSize: this.pageSize,
        agencyId: this.formData.id
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
    },
    async getProvince () {
      const res = await getProvince()
      this.provinceOptions = res.data
    },
    async getCityOptions () {
      const res = await getCityOrArea(this.formData.province.id)
      this.cityOptions = res.data
    },
    async getAreaOptions () {
      const res = await getCityOrArea(this.formData.city.id)
      this.countyOptions = res.data
    },
    handleEdit () {
      if (!this.editDisabled) {
        this.$message.error('很抱歉，演示系统，不允许修改')
      } else {
        this.editDisabled = false
      }
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getEmpList()
    },
    handleCurrentChange (page) {
      this.current = page
      this.getEmpList()
    }
  },
  async created () {
    await this.getData()
    await this.getProvince()
    await this.handleNodeClick({ id: '1024985257948084801' })
    await this.getCityOptions()
    await this.getAreaOptions()
  },
  async mounted () {
    await this.setDefaultData()
  },
  computed: {
    btnText () {
      return this.editDisabled ? '编辑' : '保存'
    }
  }
}
</script>

<style scoped lang="scss">
.organization-manage-page {
  display: flex;
  padding: 0 10px 20px;
  min-width: 900px;

  .right-card {
    width: 100%;
    padding-left: 20px;

    ::v-deep .el-card__header {
      background: #fafafa;
      font-weight: 600;
    }

    ::v-deep .el-card__body {
      padding: 10px 0 20px 0;

      .el-form {
        padding: 20px 37px 20px 0;
      }
    }

    .emp-info {
      margin-top: 20px;

      ::v-deep .el-card__body {
        padding: 20px 28px;
      }

      .el-table {
        border: 1px solid #eee;
      }

      .status {
        display: flex;
        align-items: center;

        &::before {
          display: block;
          margin-right: 6px;
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #5ec480;
        }
      }

    }
  }
}
</style>
