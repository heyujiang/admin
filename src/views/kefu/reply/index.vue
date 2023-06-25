<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="16">
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="index"
        />
      </el-col>
      <el-col :span="8">
        <div class="btn-group" style="margin-bottom:11px;float: right;">
          <div>
            <el-button
              v-if="checkPermission('/kefu/reply/add')"
              type="success"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
              v-if="checkPermission('/kefu/reply/delete')"
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
        <el-table-column align="center" type="" property="id" label="编号" show-overflow-tooltip width="70" />
        <el-table-column align="center" property="keyword" label="关键词" show-overflow-tooltip width="" />
        <el-table-column align="center" property="content" label="内容" show-overflow-tooltip width="" />
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
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button v-if="checkPermission('/kefu/reply/update')" size="mini" type="primary" @click="update(scope.row)"><i
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
import Update from '@/views/kefu/reply/update.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Reply',
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
    index() {
      const param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/kefu.reply/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        if (this.page_data.page == 1) {
          this.searchForm = [{
            type: 'Input',
            label: '关键词',
            prop: 'keyword',
            width: '150px'
          },
          {
            type: 'Select',
            label: '状态',
            prop: 'status',
            data: [{
              'key': '正常',
              'val': '1'
            }, {
              'key': '禁用',
              'val': '0'
            }],
            width: '150px'
          }
          ]
        }
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/kefu.reply/listUpdate', {
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
      this.$api.post('/kefu.reply/getInfo', {
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
        this.$api.post('/kefu.reply/delete', {
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
