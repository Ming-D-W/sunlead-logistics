<template>
  <div class="order-manage">
    <el-card class="top-card">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="线路编号" label-width="100px">
              <el-input v-model="searchText.number" placeholder="请输入线路编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线路名称" label-width="100px">
              <el-input v-model="searchText.name" placeholder="请输入线路名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始地机构" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.startOrganId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="目的地机构" label-width="100px">
              <treeselect
                :appendToBody="true"
                v-model="searchText.endOrganId"
                placeholder="请选择所属机构"
                :normalizer="normalizer"
                :options="treeData"/>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left: 30px">
            <el-button type="primary" @click="getList('search')">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" @click="handleAdd('addLine')">新增线路</el-button>
        <el-button type="primary" @click="costDialog=true">成本设置</el-button>
      </el-row>
      <el-table :row-style="{fontSize:'13px'}" v-loading="loading" :data="tableData"
                @expand-change="handleExpandChange"
                :header-cell-style="{background:'#f8faff'}" stripe>
        <template #empty>
          <empty-img/>
        </template>
        <el-table-column type="expand">
          <template #default>
            <div style="margin: 0 68px">
              <el-table :row-style="{fontSize:'13px'}" :data="expandTableData"
                        :header-cell-style="{background:'#f8faff'}"
                        v-loading="expandLoading"
                        stripe>
                <template #empty>
                  <empty-img/>
                </template>
                <el-table-column label="车次名称" prop="name"/>
                <el-table-column label="发车频次">
                  <template #default="{row}">
                    {{ row.period }}/{{ row.periodName }}
                  </template>
                </el-table-column>
                <el-table-column label="到达时间">
                  <template #default="{row}">
                    {{ transMinutes(row.arriveTime) }}
                  </template>
                </el-table-column>
                <el-table-column label="车辆安排">
                  <template #default="{row}">{{ carPlate(row) }}</template>
                </el-table-column>
                <el-table-column label="司机安排">
                  <template #default="{row}">{{ driverNames(row) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="300px" fixed="right" align="center">
                  <template #default="{row}">
                    <div style="display: flex;align-items: center">
                      <el-link
                        @click="handleEditMission(row)"
                        :underline="false"
                        style="color: #419eff">编辑车次
                      </el-link>
                      <div class="split"></div>
                      <el-link type="danger" :underline="false" @click="handleDelLineTrips(row.id)">删除车次</el-link>
                      <div class="split"></div>
                      <el-link :underline="false" style="color: #419eff" @click="handleArrange(row)">安排车辆</el-link>
                      <div class="split"></div>
                      <el-link type="danger" :underline="false" @click="handleDisband">车辆解绑</el-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="线路编号" prop="number" width="180px"/>
        <el-table-column label="线路名称" prop="name"/>
        <el-table-column label="线路类型" prop="type"/>
        <el-table-column label="起始地机构" prop="startOrganName"/>
        <el-table-column label="目的地机构" prop="endOrganName"/>
        <el-table-column label="距离（千米）" prop="distance"/>
        <el-table-column label="成本（元）" prop="cost"/>
        <el-table-column label="预计时间（分钟）" prop="time"/>
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template #default="{row}">
            <div style="display: flex;align-items: center">
              <el-link
                @click="handleAdd('editLine',row)"
                :underline="false"
                style="color: #419eff">修改
              </el-link>
              <div class="split"></div>
              <el-link type="danger" :underline="false" @click="handleDelLine(row.id)">删除</el-link>
              <div class="split"></div>
              <el-link :underline="false" style="color: #419eff" @click="addMission(row)">增加车次</el-link>
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
    <!--  新增线路 修改线路  -->
    <MyDialog :dialog-visible.sync="btnDialog" :title="title" @submit="btnSubmit">
      <template #content>
        <el-form :model="btnFormData" ref="btnForm" :rules="btnRules">
          <el-form-item v-if="type==='addLine'" label="线路编号：" label-width="110px" prop="id">
            <el-input v-model="btnFormData.id" placeholder="请输入线路编号"/>
          </el-form-item>
          <el-form-item v-else label="线路编号：" label-width="110px" prop="number">
            <el-input v-model="btnFormData.number" placeholder="请输入线路编号"/>
          </el-form-item>
          <el-form-item label="线路名称：" label-width="110px" prop="name">
            <el-input v-model="btnFormData.name" placeholder="请输入线路名称"/>
          </el-form-item>
          <el-form-item label="线路类型：" label-width="110px" prop="type">
            <el-select v-model="btnFormData.type" placeholder="请选择线路类型" clearable :disabled="type==='editLine'">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="起始地机构：" label-width="110px" :prop="type==='addLine'?'startAgency':'startOrganId'">
            <treeselect
              :disabled="type==='editLine'"
              zIndex="3000"
              :transfer="true"
              :appendToBody="true"
              v-model="startAgency"
              placeholder="请选择所属机构"
              :normalizer="normalizer"
              :options="treeData"/>
          </el-form-item>
          <el-form-item label="目的地机构：" label-width="110px" :prop="type==='addLine'?'endAgency':'endOrganId'">
            <treeselect
              :disabled="type==='editLine'"
              zIndex="3000"
              :appendToBody="true"
              v-model="endAgency"
              placeholder="请选择所属机构"
              :normalizer="normalizer"
              :options="treeData"/>
          </el-form-item>
          <el-form-item v-if="type==='editLine'" label="距离：" label-width="110px" prop="distance">
            <el-input v-model="btnFormData.distance" placeholder="请输入距离">
              <template #suffix>
                <div style="margin-right: 15px;color: #000">千米</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="type==='editLine'" label="成本：" label-width="110px" prop="cost">
            <el-input v-model="btnFormData.cost" placeholder="请输入成本">
              <template #suffix>
                <div style="margin-right: 15px;color: #000">元</div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
    <!--  成本设置  -->
    <MyDialog :dialog-visible.sync="costDialog" title="成本设置">
      <template #content>
        <el-form>
          <el-form-item label="干线" label-width="110px" required>
            <el-input v-model="costFormData[1]" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="支线" label-width="110px" required>
            <el-input v-model="costFormData[2]" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="接驳路线" label-width="110px" required>
            <el-input v-model="costFormData[3]" placeholder="请输入"/>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
    <!--  新增车次  -->
    <MyDialog :dialog-visible.sync="missionDialog" title="新增车次" @submit="missionSubmit" @cancel="transportCancel">
      <template #content>
        <el-form :model="transportFormData" :rules="transportRules" ref="transportForm">
          <el-form-item label="线路名称" label-width="110px">
            <el-input disabled v-model="transportFormData.lineName" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="车次名称" label-width="110px" prop="name">
            <el-input v-model="transportFormData.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="发车时间" label-width="110px" prop="departureTime">
            <el-time-picker
              clearable
              v-model="transportFormData.departureTime"
              format='HH:mm'
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="持续时间：" label-width="110px" prop="estimatedTime">
            <el-input v-model="transportFormData.estimatedTime" placeholder="请输入持续时间">
              <template #suffix>
                <div style="margin-right: 15px;color: #000">分钟</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="发车周期：" label-width="110px" prop="period">
            <el-select v-model="transportFormData.period" placeholder="请选择周期" clearable
                       :disabled="type==='editLine'">
              <el-option v-for="item in periodOptions" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
    <!--  编辑车次  -->
    <MyDialog :dialog-visible.sync="missionEditDialog" title="编辑车次" @submit="missionUpdate"
              @cancel="transportCancel">
      <template #content>
        <el-form :model="transport2FormData" :rules="transportRules" ref="transportForm">
          <el-form-item label="线路名称" label-width="110px">
            <el-input disabled v-model="transport2FormData.transportLine.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="车次名称" label-width="110px" prop="name">
            <el-input v-model="transport2FormData.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="发车时间" label-width="110px" prop="departureTime">
            <el-time-picker
              clearable
              v-model="transport2FormData.departureTime"
              format='HH:mm'
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="持续时间：" label-width="110px" prop="estimatedTime">
            <el-input v-model="transport2FormData.estimatedTime" placeholder="请输入持续时间">
              <template #suffix>
                <div style="margin-right: 15px;color: #000">分钟</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="发车周期：" label-width="110px" prop="period">
            <el-select v-model="transport2FormData.period" placeholder="请选择周期" clearable
                       :disabled="type==='editLine'">
              <el-option v-for="item in periodOptions" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
    <!--  安排车辆  -->
    <MyDialog :dialog-visible.sync="arrangeDialog" title="安排车辆" @submit="arrangeSubmit"
              @cancel="transportCancel">
      <template #content>
        <el-form :model="arrangeFormData" ref="transportForm">
          <el-form-item label="线路名称" label-width="110px">
            <el-input disabled v-model="arrangeFormData.transportLine.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="车次名称" label-width="110px" prop="name">
            <el-input v-model="arrangeFormData.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="发车时间" label-width="110px" prop="departureTime">
            <el-time-picker
              clearable
              v-model="arrangeFormData.departureTime"
              format='HH:mm'
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="车辆安排：" label-width="110px" prop="period">
            <el-select v-model="arrangeFormData.truckId" placeholder="请选择车辆" clearable>
              <el-option v-for="item in workingCarList" :key="item.id" :label="item.licensePlate"
                         :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import tableInit from '@/mixins/tableInit'
import searchBox from '@/mixins/searchBox'
import {
  addLine,
  addTransportLine, arrangeTruck,
  delLine, delLineTrips,
  getCost,
  getTransportLineList,
  getTruckTrips, getWorkingCar,
  updateLine, updateLineTrips
} from '@/api/transport'

export default {
  name: 'order-manage',
  mixins: [tableInit, searchBox],
  data () {
    const validateId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('线路编号不能为空'))
      } else if (/XL\d{6}/.test(value)) {
        callback()
      } else {
        callback(new Error('线路编号前两位为XL，后6位位数字，请重新输入'))
      }
    }
    return {
      searchText: {
        status: null
      },
      transportStatusArray: [],
      expandTableData: [],
      expandLoading: false,
      btnDialog: false,
      type: 'addLine',
      btnFormData: {
        id: 'XL',
        startAgency: { id: '' },
        endAgency: { id: '' }
      },
      typeOptions: [
        {
          label: '干线',
          value: 1
        },
        {
          label: '支线',
          value: 2
        },
        {
          label: '接驳路线',
          value: 3
        }
      ],
      transportRules: {
        name: [{
          required: true,
          trigger: 'blur',
          message: '车次名称不能为空'
        }],
        departureTime: [{
          required: true,
          trigger: 'blur',
          message: '发车时间不能为空'
        }],
        estimatedTime: [{
          required: true,
          trigger: 'blur',
          message: '持续时间不能为空'
        }],
        period: [{
          required: true,
          trigger: 'blur',
          message: '发车周期不能为空'
        }]

      },
      btnRules: {
        id: [{
          required: true,
          trigger: 'blur',
          validator: validateId
        }],
        number: [{
          required: true,
          trigger: 'blur',
          validator: validateId
        }],
        name: [{
          required: true,
          trigger: 'blur',
          message: '线路名称不能为空'
        }],
        distance: [{
          required: true,
          trigger: 'blur',
          message: '距离不能为空'
        }],
        cost: [{
          required: true,
          trigger: 'blur',
          message: '成本不能为空'
        }],
        startAgency: [{
          required: true,
          trigger: 'change',
          message: '起始地机构不能为空'
        }],
        endAgency: [{
          required: true,
          trigger: 'change',
          message: '目的地机构不能为空'
        }],
        startOrganId: [{
          required: true,
          trigger: 'change',
          message: '起始地机构不能为空'
        }],
        endOrganId: [{
          required: true,
          trigger: 'change',
          message: '目的地机构不能为空'
        }]
      },
      costDialog: false,
      costFormData: {},
      missionDialog: false,
      periodOptions: [
        {
          label: '天',
          value: 1
        },
        {
          label: '周',
          value: 2
        },
        {
          label: '月',
          value: 3
        }
      ],
      transportFormData: {},
      transport2FormData: {
        transportLine: { name: '' }
      },
      missionEditDialog: false,
      workingCarList: [],
      arrangeDialog: false,
      arrangeFormData: {
        transportLine: { name: '' }
      }
    }
  },
  methods: {
    delLineTrips () {
      return delLineTrips
    },
    async getList () {
      this.loading = true
      const { data } = await getTransportLineList({
        page: this.current,
        pageSize: this.pageSize,
        ...this.searchText
      })
      this.tableData = data.items
      this.total = parseInt(data.counts)
      this.loading = false
    },
    async changeStatus (newStatus) {
      this.searchText.status = newStatus
      this.getList()
    },
    async handleExpandChange (row) {
      this.expandLoading = true
      const { data } = await getTruckTrips(row.id)
      this.expandTableData = data
      this.expandLoading = false
    },
    carPlate (row) {
      if (!row?.truckDrivers) {
        return ''
      }
      return row.truckDrivers[0].truck.licensePlate
    },
    driverNames (row) {
      if (!row?.truckDrivers) {
        return ''
      }
      return row.truckDrivers[0].driver.name + ',' + row.truckDrivers[1].driver.name
    },
    transMinutes (minutes) {
      let hour = Math.floor(minutes / 60)
      let minute = (minutes % 60)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      return `${hour}:${minute}`
    },
    handleAdd (type, row) {
      this.type = type
      if (row) {
        this.btnFormData = row
      }
      this.btnDialog = true
    },
    async btnSubmit () {
      await this.$refs.btnForm.validate()
      if (this.type === 'addLine') {
        const [startAgency] = this.treeData.filter(item => item.id === this.btnFormData.startAgency)
        const [endAgency] = this.treeData.filter(item => item.id === this.btnFormData.endAgency)
        const obj = {
          id: this.btnFormData.id.slice(2),
          startAgency: {
            id: startAgency.id,
            name: startAgency.name,
            type: startAgency.type
          },
          endAgency: {
            id: endAgency.id,
            name: endAgency.name,
            type: endAgency.type
          },
          type: this.btnFormData.type,
          name: this.btnFormData.name
        }
        await addLine(obj)
        this.$message.success('成功新增线路')
      } else {
        await updateLine(this.btnFormData)
        this.$message.success('成功编辑线路')
      }
      this.cancel()
      this.getList()
    },
    cancel () {
      this.btnDialog = false
      this.$refs.btnForm.resetFields()
      this.btnFormData = { id: 'XL' }
    },
    async getCost () {
      const { data } = await getCost()
      data.forEach(item => {
        this.costFormData[item.transportLineType] = item.cost
      })
    },
    addMission (row) {
      this.transportFormData.lineName = row.name
      this.missionDialog = true
    },
    async missionSubmit () {
      await this.$refs.transportForm.validate()
      const date = this.transportFormData.departureTime
      const hour = date.getHours() * 60 * 60 * 1000
      const minutes = date.getMinutes() * 60 * 1000
      this.transportFormData.departureTime = hour + minutes
      await addTransportLine(this.transportFormData)
      this.$message.success('成功新增车次')
      this.transportCancel()
      this.getList()
    },
    transportCancel () {
      this.$refs.transportForm.resetFields()
      this.missionDialog = false
    },
    async handleDelLine (id) {
      await this.$confirm('确认删除吗')
      await delLine(id)
      this.$message.success('成功删除线路')
      this.getList()
    },
    handleEditMission (row) {
      this.transport2FormData = row
      this.missionEditDialog = true
    },
    async missionUpdate () {
      try {
        await this.$refs.transportForm.validate()
        await updateLineTrips(this.transport2FormData)
        this.$message.success('成功更新车次')
        this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    async handleDelLineTrips (id) {
      try {
        await this.$confirm('确认删除吗')
        await delLineTrips(id)
        this.$message.success('成功删除车次')
        this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    async getWorkingTruck () {
      const { data } = await getWorkingCar()
      this.workingCarList = data
    },
    async arrangeSubmit () {
      try {
        await arrangeTruck({
          id: this.arrangeFormData.id,
          truckId: this.arrangeFormData.truckId
        })
        this.$message.success('成功安排车辆')
        this.arrangeDialog = false
        this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    handleDisband () {
      this.$confirm('无法解绑')
    },
    handleArrange (row) {
      this.arrangeFormData = row
      this.arrangeDialog = true
    }
  },
  computed: {
    title () {
      if (this.type === 'addLine') {
        return '新增线路'
      } else if (this.type === 'editLine') return '编辑线路'
      return ''
    },
    startAgency: {
      get () {
        if (this.type === 'editLine') {
          return this.btnFormData?.startOrganId
        }
        return this.btnFormData.startAgency
      },
      set (value) {
        if (this.type === 'editLine') {
          this.btnFormData.startOrganId = value
        } else {
          this.btnFormData.startAgency = value
        }
      }
    },
    endAgency: {
      get () {
        if (this.type === 'editLine') {
          return this.btnFormData?.endOrganId
        }
        return this.btnFormData.endAgency
      },
      set (value) {
        if (this.type === 'editLine') {
          this.btnFormData.endOrganId = value
        } else {
          this.btnFormData.endAgency = value
        }
      }
    }
  },
  created () {
    this.getCost()
    this.getWorkingTruck()
  }
}
</script>

<style scoped lang="scss">
.order-manage {
  ::v-deep .vue-treeselect__placeholder {
    line-height: 40px;
  }

  ::v-deep .vue-treeselect__single-value {
    line-height: 40px;
  }

  padding: 0 10px;

  .el-form-item {
    padding-right: 60px;
  }

  ::v-deep .el-select {
    width: 100%;
  }

  .el-table {
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

  .tab-item {
    margin-top: 20px;

    ::v-deep .el-card__body {
      padding: 0;
    }

    .item {
      width: 120px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;

      span {
        font-weight: normal;
      }
    }

    .active {
      background: #ffeeeb;
      color: #e15536;
    }
  }

  ::v-deep .el-link--inner {
    font-weight: 300;
    font-size: 13px;
  }

  ::v-deep .el-dialog__body {
    padding: 40px 60px 0 50px;
  }

  ::v-deep .el-form-item {
    padding-right: 0;
  }

  ::v-deep .el-date-editor.el-input {
    width: 100%;
  }
}
</style>
