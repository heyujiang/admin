<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="16">
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="searchgo"
        />
      </el-col>
      <el-col :span="8">
        <div class="btn-group" style="margin-bottom:11px;float: right;">
          <div>
            <el-button
              v-if="checkPermission('/order/export')"
              type="primary"
              size="small"
              icon="el-icon-download"
              @click="exportfile()"
            >导出
            </el-button>
            <el-button
              v-if="checkPermission('/order/serviceadd')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加
            </el-button>
            <el-button
              v-if="checkPermission('/order/servicedelete')"
              type="primary"
              :disabled="multiple"
              size="small"
              icon="el-icon-delete"
              @click="del(ids)"
            >删除
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane :label="'待付款('+ countdata.statuscount1+')'" name="1"/>
      <el-tab-pane :label="'待指派('+ countdata.statuscount2+')'" name="2"/>
      <el-tab-pane :label="'待服务('+ countdata.statuscount3+')'" name="3"/>
      <el-tab-pane :label="'已取消('+ countdata.statuscount4+')'" name="4"/>
      <el-tab-pane :label="'已完成('+ countdata.statuscount5+')'" name="5"/>
      <el-tab-pane :label="'售后('+ countdata.statuscount6+')'" name="6"/>
      <!--      <el-tab-pane :label="'已完成('+ countdata.statuscount7+')'" name="7" />-->
    </el-tabs>
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :row-class-name="rowClass"
        row-key="id"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :border="false"
        :stripe="true"
        class="eltable"
        :data="list"
        style="width: 100%"
        @selection-change="selection"
      >
        <el-table-column align="center" type="selection" width="42"/>
        <el-table-column align="left" property="order_num_alias" label="订单号" show-overflow-tooltip width="130"/>
        <el-table-column align="left" property="member.nickname" label="用户" show-overflow-tooltip width="118"/>
        <el-table-column align="left" property="sid" label="派单门店" show-overflow-tooltip width="118"/>
        <el-table-column align="left" property="staff" label="派单师傅" show-overflow-tooltip width="130"/>
        <el-table-column label="订购服务" align="left" width="300">
          <template v-if="scope.row.orderGoods.length>0" slot-scope="scope">
            <div v-for="(item, index) in scope.row.orderGoods" :key="index">
              <div class="image__preview">
                <el-image v-if="item.image" class="table_list_pic" :src="item.image" :preview-src-list="[item.image]"/>
              </div>
              <div class="goodstext">
                <div>{{ item.name + '\n' }}</div>
                <div v-if="item.sku">{{ item.sku + '\n' }}</div>
                <div v-if="item.quantity">数量：{{ item.quantity }}</div>
                <div v-if="item.total">小计：{{ item.total }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div> {{ scope.row.pay_subject }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" property="yue_time" label="预约时间" show-overflow-tooltip width="200"/>
        <el-table-column align="left" property="total" label="订单金额" show-overflow-tooltip width="100"/>
        <el-table-column align="left" property="order_status" label="订单状态" show-overflow-tooltip width="100"/>
        <el-table-column align="left" property="pay_time" label="支付时间" show-overflow-tooltip width=""/>
        <el-table-column align="left" property="create_time" label="下单时间" show-overflow-tooltip width=""/>
        <el-table-column label="支付方式" align="left">
          <template slot-scope="scope">
            <div>{{ scope.row.payment_code_name }}</div>
            <div v-if="scope.row.payment_code=='offline_pay'">
              <el-button v-if="scope.row.order_status_id==1" size="mini" type="primary" @click="offline(scope.row)">
                <i class="el-icon-s-check"/>支付凭证
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :fixed="$store.getters.device !== 'mobile'?'right':false"
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button
                v-if="(scope.row.order_status_id==2) && checkPermission('/order/staff')"
                size="mini"
                type="primary"
                @click="staff(scope.row)"
              >
                <i class="el-icon-connection"/>派单
              </el-button>
              <el-button
                v-if="(scope.row.order_status_id==3) && checkPermission('/order/staff')"
                size="mini"
                type="primary"
                @click="staff(scope.row)"
              >
                <i class="el-icon-connection"/>重新派单
              </el-button>

              <el-button
                v-if="checkPermission('/order/servicedetail')"
                size="mini"
                type="primary"
                @click="detail(scope.row)"
              >
                <i class="el-icon-view"/>详情
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="page_data.total"
        :page.sync="page_data.page"
        :limit.sync="page_data.limit"
        @pagination="index"
      />
    </div>
    <!--查看详情-->
    <Detail :info="detailInfo" :show.sync="dialog.detailDialogStatus"
            size="small" @refesh_list="index"
            @update:show="dialog.detailDialogStatus"

    />
    <!--派单-->
    <Staff :info="staffInfo" :show.sync="dialog.staffDialogStatus" size="small"
           @refesh_list="index"
           @update:show="dialog.staffDialogStatus"
    />
    <!--确认下线收款-->
    <!--    <Offline :info="offlineInfo" :show.sync="dialog.offlineDialogStatus" size="small" @refesh_list="index" />-->
    <!--添加/修改-->
    <Add
      :info="updateInfo"
      :opentype="opentype"
      :show.sync="dialog.addDialogStatus"
      size="small"
      @refesh_list="index"
    />
    <el-dialog title="正在导出数据..." :visible="exportshow" :before-close="closedialog" width="500px">
      <el-progress :percentage="percentage"/>
    </el-dialog>
  </div>
</template>
<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import Detail from '@/views/order/servicedetail.vue'
import Add from '@/views/order/serviceadd.vue'
import Offline from '@/views/order/offline.vue'
import Staff from '@/views/order/staff.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
import XLSX from 'xlsx'


export default {
  name: 'Orderservice',
  components: {
    Search,
    Detail,
    Add,
    Staff,
    Offline,
    Pagination
  },
  data() {
    return {
      dialog: {
        detailDialogStatus: false,
        staffDialogStatus: false,
        addDialogStatus: false,
        offlineDialogStatus: false
      },
      ids: [],
      single: true,
      multiple: true,
      list: [],
      countdata: {
        statuscount1: 0,
        statuscount2: 0,
        statuscount3: 0,
        statuscount4: 0,
        statuscount5: 0,
        statuscount6: 0
      },
      detailInfo: {},
      staffInfo: {},
      loading: false,
      ws: {},
      filename: '',
      opentype: 'add',
      updateInfo: {},
      page_data: {
        limit: 20,
        page: 1,
        total: 20
      },
      searchVisible: true,
      searchForm: [],
      searchData: {},
      dumppage: 1,
      exportshow: false,
      percentage: 0,
      exceldata: [],
      order_status: 0
    }
  },
  mounted() {
    this.index()
    this.searchForm = [{
      type: 'Input',
      label: '关键词',
      prop: 'keyword',
      width: '230px'
    },
      {
        type: 'datetime',
        label: '创建时间',
        prop: 'create_time',
        width: '150px'
      },
      {
        type: 'day',
        label: '今日',
        width: '150px'
      },
      {
        type: 'week',
        label: '七日',
        width: '150px'
      }
    ]
  },
  methods: {
    searchgo() {
      this.page_data.page = 1
      this.index()
    },
    index() {
      const param = {
        path: this.$route.path,
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      if (this.order_status >0){
        param.status = this.order_status
      } 
      console.log(this.searchData)
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/order/index', param).then(res => {
        this.countdata = res.countdata
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
      })
    },
    handleClick(tab, event) {
      this.order_status = tab.name
      this.index()
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/order/listUpdate', {
          id: row.id,
          [field]: row[field]
        }).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }
    },
    add() {
      this.opentype = 'add'
      this.dialog.addDialogStatus = true
    },
    update(row) {
      this.opentype = 'update'
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/order/getInfo', {
        id: id
      }).then(res => {
        this.dialog.addDialogStatus = true
        this.updateInfo = res.data
      })
    },
    detail(row) {
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/order/getInfo', {
        id: id
      }).then(res => {
        this.dialog.detailDialogStatus = true
        this.detailInfo = res.data
      })
    },
    staff(row) {
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/order/getInfo', {
        id: id
      }).then(res => {
        this.dialog.staffDialogStatus = true
        this.staffInfo = res.data
      })
    },
    delivery(row) {
      confirm({
        content: '确定要结算吗'
      }).then(() => {
        const id = row.id ? row.id : this.ids.join(',')

        this.$api.post('/order/delivery', {
          id: id
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.index()
        })
      }).catch(() => {
      })
    },
    offline(row) {
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/order/getInfo', {
        id: id
      }).then(res => {
        this.dialog.offlineDialogStatus = true
        this.offlineInfo = res.data
      })
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')

        this.$api.post('/order/delete', {
          id: ids
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.index()
        })
      }).catch(() => {
      })
    },
    selection(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    rowClass({
      row,
      rowIndex
    }) {
      for (let i = 0; i < this.ids.length; i++) {
        if (row.id === this.ids[i]) {
          return 'rowLight'
        }
      }
    },
    exportfile() {
      this.$confirm('导出文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.exportshow = true
        this.confirmexportfile()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        })
      })
    },
    confirmexportfile() {
      let param = {
        path: this.$route.path,
        page: this.dumppage
      }
      Object.assign(param, param2Obj(this.$route.fullPath))
      if (this.searchData) param = Object.assign(param, this.searchData)
      this.$api.post('/order/export', param).then(res => {
        if (res.count == 0) {
          this.exportshow = false
          this.$message({
            type: 'error',
            message: '无数据可以导出'
          })
        }else if (res.data.length > 0) {
          if (this.dumppage == 1) {
            this.exceldata.push(res.header)
          }
          res.data.forEach((item) => {
            this.exceldata.push(Object.values(item))
          })
          this.percentage = res.percentage
          this.filename = res.filename

          this.ws = XLSX.utils.aoa_to_sheet(this.exceldata)
          this.dumppage = this.dumppage + 1
          this.confirmexportfile()
        } else {
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, this.ws, '资料')
          XLSX.writeFile(wb, this.filename)
          this.exportshow = false
          this.dumppage = 1
          this.exceldata = []
        }
      })
    },
    closedialog() {
      this.exportshow = false
    }
  }
}
</script>
<style scoped>
.image__preview {
  float: left;
}

.goodstext {
  float: left;
  padding-left: 10px;
  width: 200px;
}

.table_list_pic {
  width: 60px;
  vertical-align: middle;
}
</style>
