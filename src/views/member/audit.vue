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
          <el-table-column align="center" type="selection" width="42"/>
          <el-table-column align="center" type="" property="id" label="编号" show-overflow-tooltip width="70"/>
          <el-table-column align="center" type="" property="nickname" label="昵称" show-overflow-tooltip width="100"/>
          <el-table-column align="center" type="" property="telephone" label="手机号" show-overflow-tooltip width="120"/>
          <el-table-column align="center" type="" property="id_cart" label="身份证" show-overflow-tooltip width="300"/>
          <el-table-column align="center" type="" property="id_cart_img_1" label="身份证正面" show-overflow-tooltip width="200">
            <template slot-scope="scope">
            <div>
              <el-image
                v-if="scope.row.id_cart_img_1"
                class="table_list_pic"
                :src="scope.row.id_cart_img_1"
                :preview-src-list="[scope.row.id_cart_img_1]"
              />
            </div>
            </template>
          </el-table-column>
          <el-table-column align="center" type="" property="id_cart_img_2" label="身份证反面" show-overflow-tooltip width="200">
            <template slot-scope="scope">
            <div>
              <el-image
                v-if="scope.row.id_cart_img_2"
                class="table_list_pic"
                :src="scope.row.id_cart_img_2"
                :preview-src-list="[scope.row.id_cart_img_2]"
              />
            </div>
            </template>
          </el-table-column>
          <el-table-column align="center" type="" property="disability_cert" label="残疾证" show-overflow-tooltip width="200">
            <template slot-scope="scope">
            <div>
              <el-image
                v-if="scope.row.disability_cert"
                class="table_list_pic"
                :src="scope.row.disability_cert"
                :preview-src-list="[scope.row.disability_cert]"
              />
            </div>
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
                <el-button v-if="checkPermission('/member/auditdetail')" size="mini" type="primary"
                           @click="audit(scope.row)"
                ><i
                  class="el-icon-finished"
                />审核
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
      <!--审核-->
      <Auditdetail
        :info="auditInfo"
        :show.sync="dialog.auditdetailDialogStatus"
        size="small"
        @refesh_list="index"
      />
  
    </div>
  </template>
  <script>
  import Search from '@/components/common/Search'
  import Pagination from '@/components/Pagination'
  import Auditdetail from '@/views/member/auditdetail.vue'
  import ImportData from '@/views/diyfields/importData.vue'
  import Update from '@/views/diyfields/update.vue'
  
  import {
    confirm,
    param2Obj
  } from '@/utils/common'
  import XLSX from 'xlsx'
  
  export default {
    name: 'Diyfields',
    components: {
      Search,
      Update,
      Pagination,
      Auditdetail,
      ImportData
    },
    data() {
      return {
        dialog: {
          auditdetailDialogStatus: false,
          importDataDialogStatus: false
        },
        ids: [],
        single: true,
        multiple: true,
        list: [],
        RegisterField: [],
        opentype: 'add',
        auditInfo: {},
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
        this.page_data.page = 1
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
  
        this.$api.post('/member/auditList', param).then(res => {
          this.list = res.data.data
          this.page_data.total = res.data.total
          this.loading = false
          // console.log(this.page_data);
          if (this.page_data.page == 1) {
            this.searchForm = [
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
      audit(row) {
        this.opentype = 'update'
        const id = row.id ? row.id : this.ids.join(',')
        this.$api.post('/member/auditDetail', {
          id: id
        }).then(res => {
          this.dialog.auditdetailDialogStatus = true
          this.auditInfo = res.data
        })
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
        }).catch(() => {
        })
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
  