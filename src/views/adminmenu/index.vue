<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="16">
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="getList"
        />
      </el-col>
      <el-col :span="8">
        <div class="btn-group" style="margin-bottom:11px;float: right;">
          <div>
            <el-button
              v-if="checkPermission('/adminmenu/add')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
              v-if="checkPermission('/adminmenu/delete')"
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
      <el-table-column align="left" property="title" label="节点名称" show-overflow-tooltip width="" />
      <el-table-column align="center" property="type" label="类型" show-overflow-tooltip width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == '1'" type="primary" size="mini" effect="dark">菜单
          </el-tag>
          <el-tag v-if="scope.row.type == '2'" type="info" size="mini" effect="dark">方法
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="left" property="path" label="节点标识" show-overflow-tooltip width="" />
      <el-table-column align="left" property="pages_path" label="页面路径" show-overflow-tooltip width="" />
      <el-table-column align="center" property="is_console" label="控制台菜单" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_console"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_console')"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" property="is_admin" label="管理员菜单" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_admin"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_admin')"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" property="is_city" label="城市代理菜单" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_city"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_city')"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" property="is_store" label="商家菜单" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_store"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_store')"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" property="is_v2" label="商城" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_v2"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_v2')"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" property="is_v3" label="上门服务" show-overflow-tooltip width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_v3"
            :active-value="1"
            :inactive-value="0"
            @change="listUpdate(scope.row,'is_v3')"
          />
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
      <el-table-column align="center" property="sort" label="排序" show-overflow-tooltip width="80">
        <template slot-scope="scope" class="sort">
          <el-input v-model="scope.row.sort" size="mini" placeholder="排序" @blur.stop="listUpdate(scope.row,'sort')" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.id">
            <el-button
              v-if="checkPermission('/adminmenu/update')"
              size="mini"
              type="primary"
              @click="update(scope.row)"
            ><i class="el-icon-edit" />修改</el-button>

            <el-button v-if="checkPermission('/adminmenu/delete')" size="mini" type="danger" @click="del(scope.row)"><i
              class="el-icon-delete"
            />删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px;" />
    <!--添加/修改-->
    <Update
      :info="updateInfo"
      :opentype="opentype"
      :show.sync="dialog.updateDialogStatus"
      size="small"
      @refesh_list="getList"
    />

  </div>
</template>

<script>
import Search from '@/components/common/Search'
import Update from '@/views/adminmenu/update.vue'
import waves from '@/directive/waves' // waves directive
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Adminmenu',
  directives: {
    waves
  },
  components: {
    Search,
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
      searchVisible: true,
      searchForm: [],
      searchData: {},
      expand: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const param = {}
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true
      this.$api.post('/Adminmenu/index', param).then(res => {
        this.list = res.data
        this.loading = false

        this.searchForm = [{
          type: 'Input',
          label: '关键词',
          prop: 'keyword',
          width: '150px'
        }]
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/Adminmenu/listUpdate', {
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
      this.$api.post('/Adminmenu/getInfo', {
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
        this.$api.post('/Adminmenu/delete', {
          id: ids
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
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

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
