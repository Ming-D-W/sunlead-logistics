<template>
  <div class="organization-manage-page">
    <div class="left-tree">
      <el-tree :data="treeData" :props="{label:'name'}"/>
    </div>
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
                  <el-input/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构名称" label-width="120px">
                  <el-input/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构类型" label-width="120px">
                  <el-input/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="机构地址" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="value" placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8" style="padding: 0 4px">
                  <el-select style="width: 100%"></el-select>
                </el-col>
                <el-col :span="8">
                  <el-select style="width: 100%"></el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="详细地址" label-width="120px">
                  <el-input/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经度" label-width="120px">
                  <el-input>
                    <template #suffix>
                      <div style="margin-right: 14px">E</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纬度" label-width="120px">
                  <el-input>
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
                  <el-input/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构电话" label-width="120px">
                  <el-input/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" style="padding: 10px 30px">编辑</el-button>
          </el-row>
        </el-card>
      </div>
      <div class="emp-info">
        <el-card>
          <div slot="header" class="clearfix">
            <span>员工信息</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getTreeOrganApi } from '@/api/organization-manage'

export default {
  name: 'organization-manage',
  data () {
    return {
      treeData: [],
      value: '',
      options: []
    }
  },
  methods: {
    async getData () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.organization-manage-page {
  display: flex;
  padding: 0 10px 20px;
  min-width: 900px;

  .left-tree {
    box-sizing: border-box;
    width: 235px;
    height: 698px;
    padding-left: 9px;
    padding-top: 15px;
    background: #fff;
    border-radius: 4px;
  }

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
    }
  }
}
</style>
