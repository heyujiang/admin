<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="18">
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="searchgo"
        />
      </el-col>
      <el-col :span="6">
        <div class="btn-group" style="margin-bottom:11px;float: right;">
          <div>
            <el-button
              v-if="checkPermission('/log/delete')"
              type="primary"
              :disabled="multiple"
              size="small"
              icon="el-icon-delete"
              @click="del(ids)"
            >删除</el-button>
            <el-button
              v-if="checkPermission('/log/dumpdata')"
              type="primary"
              size="small"
              icon="el-icon-download"
              @click="dumpdata(ids)"
            >导出</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div id="charts_one" style="width:100%;min-height:80vh">
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
        <el-table-column align="center" type="selection" width="42" />
        <el-table-column
          align="center"
          type=""
          property="id"
          label="编号"
          show-overflow-tooltip
          width="70"
        />
        <el-table-column
          align="center"
          property="application_name"
          label="应用名"
          show-overflow-tooltip
          width="100"
        />
        <el-table-column
          align="center"
          property="username"
          label="用户名"
          show-overflow-tooltip
          width="100"
        />
        <el-table-column
          align="left"
          property="url"
          label="请求url"
          show-overflow-tooltip
          width=""
        />
        <el-table-column
          align="center"
          property="ip"
          label="客户端ip"
          show-overflow-tooltip
          width="100"
        />
        <el-table-column
          align="center"
          property="create_time"
          label="创建时间"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            {{ parseTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="type"
          label="类型"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == '1'" type="info" size="mini" effect="dark">登录日志</el-tag>
            <el-tag v-if="scope.row.type == '2'" type="primary" size="mini" effect="dark">操作日志</el-tag>
            <el-tag v-if="scope.row.type == '3'" type="danger" size="mini" effect="dark">异常日志</el-tag>
          </template>
        </el-table-column>
        <el-table-column :fixed="$store.getters.device !== 'mobile'?'right':false" label="操作" align="center" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button
                v-if="checkPermission('/log/detail')"
                size="mini"
                type="primary"
                @click="detail(scope.row.id)"
              ><i class="el-icon-view" />详情</el-button>
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
    <Detail :info="detailInfo" :show.sync="dialog.detailDialogStatus" size="small" @refesh_list="index" />
    <el-dialog title="导出进度条" :visible="dumpshow" :before-close="closedialog" width="500px">
      <el-progress :percentage="percentage" />
    </el-dialog>
  </div>
</template>
<script>
import Search from '@/components/common/Search.vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Detail from '@/views/log/detail.vue'
import {
  confirm
} from '@/utils/common'
import XLSX from 'xlsx'
export default {
  name: 'Log',
  components: {
    Search,
    Pagination,
    Detail
  },
  data() {
    return {
      dialog: {
        detailDialogStatus: false
      },
      ids: [],
      single: true,
      multiple: true,
      list: [],
      detailInfo: {},
      exceldata: [],
      dumppage: 1,
      ws: {},
      dumpshow: false,
      percentage: 0,
      filename: '',
      loading: false,
      page_data: {
        limit: 20,
        page: 1,
        total: 20
      },
      searchVisible: true,
      searchForm: [],
      searchData: {}
    }
  },
  mounted() {
    this.index()
  },
  methods: {
    searchgo() {
      this.page_data.page = 1;
      this.index()
    },
    index() {
      let param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      if (this.searchData) param = Object.assign(param, this.searchData)
      this.loading = true

      this.$api.post('/Log/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        if (this.page_data.page == 1) {
          this.searchForm = [{
            type: 'Input',
            label: '用户名',
            prop: 'username',
            width: '200px'
          },
          {
            type: 'datetime',
            label: '创建时间',
            prop: 'create_time',
            width: '150px'
          },
          {
            type: 'Select',
            label: '类型',
            prop: 'type',
            data: [{
              'key': '登录日志',
              'val': '1'
            }, {
              'key': '操作日志',
              'val': '2'
            }, {
              'key': '异常日志',
              'val': '3'
            }],
            width: '150px'
          }
          ]
        }
      })
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')

        this.$api.post('/Log/delete', {
          id: ids
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.index()
        })
      }).catch(() => {})
    },
    detail(id) {
      this.dialog.detailDialogStatus = true
      this.detailInfo = {
        id: id
      }
    },
    dumpdata() {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        this.dumpshow = true
        this.confirmdumpdata()
      }).catch(() => {})
    },
    confirmdumpdata() {
      let param = {
        page: this.dumppage
      }
      if (this.searchData) param = Object.assign(param, this.searchData)

      this.$api.post('/Log/dumpdata', param).then(res => {
        if (res.data.length > 0) {
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
          this.confirmdumpdata()
        } else {
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, this.ws, '日志管理')
          XLSX.writeFile(wb, this.filename)
          this.dumpshow = false
        }
      })
    },
    closedialog() {
      this.dumpshow = false
    },
    selection(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    handleRowClick(row, rowIndex, event) {
      if (event.target.className !== 'el-input__inner') {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
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
    }
  }
}
</script>
