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
              v-if="checkPermission('/store/add')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
              v-if="checkPermission('/store/delete')"
              type="primary"
              :disabled="multiple"
              size="small"
              icon="el-icon-delete"
              @click="del(ids)"
            >删除
            </el-button>
            <el-button
              v-if="checkPermission('/store/importData')"
              type="primary"
              size="small"
              icon="el-icon-upload"
              @click="importData(ids)"
            >导入</el-button>
            <el-button
              v-if="checkPermission('/store/dumpdata')"
              type="primary"
              size="small"
              icon="el-icon-download"
              @click="dumpdata(ids)"
            >导出</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
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
        <el-table-column align="center" type="selection" width="42" />
        <el-table-column align="center" type="" property="id" label="编号" show-overflow-tooltip width="70" />
        <el-table-column
          v-for="column in RegisterField"
          :key="column.fieldsmingcheng"
          :prop="column.inputtype+','+column.fieldsmingcheng"
          :label="column.viewmingcheng"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.column.property.split(',')[0] == 'pics'">
              <div class="demo-image__preview">
                <el-image
                  class="table_list_pic"
                  :src="scope.row[scope.column.property.split(',')[1]] || require('@/assets/no_touxiang.png')"
                  :preview-src-list="[scope.row[scope.column.property.split(',')[1]] || require('@/assets/no_touxiang.png')]"
                />
              </div>
            </div>
            <div v-else>
              {{ scope.row[scope.column.property.split(',')[1]] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" property="status" label="状态" show-overflow-tooltip width="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="listUpdate(scope.row,'status')"
            />
          </template>
        </el-table-column>
        <el-table-column
          :fixed="$store.getters.device !== 'mobile'?'right':false"
          label="操作"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button
                v-if="checkPermission('/store/login')"
                size="mini"
                type="primary"
                @click="login(scope.row)"
              >登录后台
              </el-button>
              <el-button
                v-if="checkPermission('/store/update')"
                size="mini"
                type="primary"
                @click="update(scope.row)"
              ><i class="el-icon-edit" />修改</el-button>
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
    <!--添加/修改-->
    <Update
      :info="updateInfo"
      :opentype="opentype"
      :show.sync="dialog.updateDialogStatus"
      size="small"
      @refesh_list="index"
    />
    <!--导入-->
    <ImportData :show.sync="dialog.importDataDialogStatus" controller="store" size="small" @refesh_list="index" />
    <el-dialog title="导出进度条" :visible="dumpshow" :before-close="closedialog" width="500px">
      <el-progress :percentage="percentage" />
    </el-dialog>
  </div>
</template>
<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import Update from '@/views/diyfields/update.vue'
import ImportData from '@/views/diyfields/importData.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
import XLSX from 'xlsx'
export default {
  name: 'storeindex',
  components: {
    Search,
    Pagination,
    Update,
    ImportData
  },
  data() {
    return {
      dialog: {
        updateDialogStatus: false,
        importDataDialogStatus: false
      },
      ids: [],
      single: true,
      multiple: true,

      list: [],
      RegisterField: [],
      opentype: 'add',
      updateInfo: {},
      loading: false,
      dumpshow: false,
      exceldata: [],
      dumppage: 1,
      percentage: 0,
      ws: {},
      filename: '',
      page_data: {
        limit: 20,
        page: 1,
        total: 20
      },
      searchVisible: true,
      searchForm: [],
      searchData: {},
      action: 'index'
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
      const param = {
        path: this.$route.path,
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/store/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        // console.log(this.page_data);
        if (this.page_data.page == 1) {
          this.action = res.action
          this.RegisterField = res.field_data.RegisterField
          this.searchForm = [{
            type: 'Select',
            label: '状态',
            prop: 'status',
            data: [{
              'key': '已通过',
              'val': '1'
            }, {
              'key': '未审核',
              'val': '0'
            }],
            width: '150px'
          },
          {
            type: 'Input',
            label: '关键词',
            prop: 'keyword',
            width: '230px'
          }
          ]
        }
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/store/listUpdate', {
          path: this.$route.path,
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
      this.$api.post('/diyfields/getInfo', {
        path: this.$route.path
      }).then(res => {
        this.dialog.updateDialogStatus = true
        this.updateInfo = res.data
      })
    },
    update(row) {
      this.opentype = 'update'
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/diyfields/getInfo', {
        path: this.$route.path,
        id: id
      }).then(res => {
        this.dialog.updateDialogStatus = true
        this.updateInfo = res.data
      })
    },
    login(row) {
      const id = row.id ? row.id : this.ids.join(',')
      window.open('?sid=' + id + '#/dashboard', '_blank')
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')

        this.$api.post('/store/delete', {
          path: this.$route.path,
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
    importData() {
      this.dialog.importDataDialogStatus = true
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
        path: this.$route.path,
        page: this.dumppage
      }
      if (this.searchData) param = Object.assign(param, this.searchData)
      this.$api.post('/diyfields/dumpdata', param).then(res => {
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
          XLSX.utils.book_append_sheet(wb, this.ws, '资料')
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
<style scoped>
  .table_list_pic {
    width: 60px;
    vertical-align: middle;
  }
</style>
