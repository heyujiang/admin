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
              v-if="checkPermission('/transportextend/add')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
              v-if="checkPermission('/transportextend/delete')"
              type="primary"
              :disabled="multiple"
              size="small"
              icon="el-icon-delete"
              @click="del(ids)"
            >删除</el-button>
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
        <el-table-column align="center" property="area_name" label="可配送区域" show-overflow-tooltip width="" />
        <el-table-column
          align="center"
          property="snum"
          label="首重(千克)"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.snum"
              size="mini"
              placeholder="首重(千克)"
              @blur.stop="listUpdate(scope.row,'snum')"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="sprice"
          label="首运费(元)"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sprice"
              size="mini"
              placeholder="首运费(元)"
              @blur.stop="listUpdate(scope.row,'sprice')"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="xnum"
          label="续重(千克)"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.xnum"
              size="mini"
              placeholder="续重(千克)"
              @blur.stop="listUpdate(scope.row,'xnum')"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="xprice"
          label="续运费(元)"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.xprice"
              size="mini"
              placeholder="续运费(元)"
              @blur.stop="listUpdate(scope.row,'xprice')"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" property="is_default" label="默认" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_default"
              :active-value="1"
              :inactive-value="0"
              @change="listUpdate(scope.row,'is_default')"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" property="status" label="状态" show-overflow-tooltip width="100">
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
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button v-if="checkPermission('/transportextend/update')" size="mini" type="primary" @click="update(scope.row)"><i
                class="el-icon-edit"
              />修改</el-button>
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
    <Update :info="updateInfo" :opentype="opentype" :show.sync="dialog.updateDialogStatus" size="small" @refesh_list="index" />
  </div>
</template>
<script>
import Search from '@/components/common/Search.vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Update from '@/views/transportextend/update.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Transportextend',
  components: {
    Search,
    Pagination,
    Update
  },
  data() {
    return {
      dialog: {
        updateDialogStatus: false
      },
      ids: [],
      single: true,
      multiple: true,
      list: [],
      opentype: 'add',
      updateInfo: {},
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
      const param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/transportextend/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        if (this.page_data.page == 1) {
          this.searchForm = [{
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
        this.$api.post('/transportextend/listUpdate', {
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
      this.dialog.updateDialogStatus = true
    },
    update(row) {
      this.opentype = 'update'
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/transportextend/getInfo', {
        id: id
      }).then(res => {
        this.dialog.updateDialogStatus = true
        this.updateInfo = res.data
      })
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')
        this.$api.post('/transportextend/delete', {
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
