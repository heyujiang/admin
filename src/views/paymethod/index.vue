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
        <el-table-column align="center" type="" property="id" label="编号" show-overflow-tooltip width="70" />
        <el-table-column
          align="left"
          property="title"
          label="名称"
          show-overflow-tooltip
          width=""
        />

        <el-table-column
          align="center"
          property="status"
          label="状态"
          show-overflow-tooltip
          width=""
        >
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
          align="center"
          property="sort"
          label="排序"
          show-overflow-tooltip
          width="80"
        >
          <template slot-scope="scope" class="sort">
            <el-input
              v-model="scope.row.sort"
              size="mini"
              placeholder="排序"
              @blur.stop="listUpdate(scope.row,'sort')"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button
                v-if="checkPermission('/paymethod/update')"
                size="mini"
                type="primary"
                @click="update(scope.row)"
              ><i
                class="el-icon-edit"
              />设置</el-button>
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
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import Update from '@/views/paymethod/update.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'paymethod',
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
      ws: {},
      filename: '',
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

      this.$api.post('/paymethod/index', param).then(res => {
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
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/paymethod/listUpdate', {
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
      this.$api.post('/paymethod/getInfo', {
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

        this.$api.post('/paymethod/delete', {
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
<style scoped>
  .table_list_pic {
    width: 80px;
    vertical-align: middle;
  }
</style>
