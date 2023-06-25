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
              v-if="checkPermission('/usersroles/add')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
              v-if="checkPermission('/usersroles/delete')"
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
        :tree-props="{children: 'children'}"
        :default-expand-all="expand"
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
        <el-table-column align="center" property="title" label="角色名称" show-overflow-tooltip width="" />
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
        <el-table-column align="center" property="description" label="描述" show-overflow-tooltip width="" />
        <el-table-column
          :fixed="$store.getters.device !== 'mobile'?'right':false"
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button v-if="checkPermission('/usersroles/update')" size="mini" type="primary" @click="update(scope.row)"><i
                class="el-icon-edit"
              />修改</el-button>
              <el-button v-if="checkPermission('/usersroles/update')" size="mini" type="primary" @click="permissions(scope.row)"><i
                class="el-icon-edit"
              />权限设置</el-button>
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

    <!--权限设置-->
    <Permissions :info="updateInfo" :opentype="opentype" :show.sync="dialog.permissionsDialogStatus" size="small" @refesh_list="index" />
  </div>
</template>
<script>
import Search from '@/components/common/Search.vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Update from '@/views/usersroles/update.vue'
import Permissions from '@/views/usersroles/permissions.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Usersroles',
  components: {
    Search,
    Pagination,
    Update,
    Permissions
  },
  data() {
    return {
      dialog: {
        updateDialogStatus: false,
        permissionsDialogStatus: false
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
      searchData: {},
      expand: true
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

      this.$api.post('/Usersroles/index', param).then(res => {
        this.list = res.data
        this.loading = false
        this.searchForm = [
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
          }, {
            type: 'Input',
            label: '角色名称',
            prop: 'keyword',
            width: '200px'
          }
        ]
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/Usersroles/listUpdate', {
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
      this.$api.post('/Usersroles/getInfo', {
        id: id
      }).then(res => {
        this.dialog.updateDialogStatus = true
        this.updateInfo = res.data
      })
    },
    permissions(row) {
      this.opentype = 'permissions'
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/Usersroles/getInfo', {
        id: id
      }).then(res => {
        this.dialog.permissionsDialogStatus = true
        this.updateInfo = res.data
      })
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')
        this.$api.post('/Usersroles/delete', {
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
    },
    toggleRowExpansion() {
      this.expand = !this.expand
      this.list.forEach(item => {
        this.$refs.multipleTable.toggleRowExpansion(item, this.expand)
      })
    }
  }
}
</script>
