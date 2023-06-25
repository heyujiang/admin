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
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
            <el-button
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
      <el-table-column
        align="center"
        type=""
        property="id"
        label="编号"
        show-overflow-tooltip
        width="70"
      />
      <el-table-column
        align="left"
        property="title"
        label="名称"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="url"
        label="页面"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="params"
        label="参数"
        show-overflow-tooltip
        width=""
      />
      <el-table-column align="center" property="icon" label="图标" show-overflow-tooltip width="90">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              v-if="scope.row.icon"
              class="table_list_pic"
              :src="scope.row.icon"
              :preview-src-list="[scope.row.icon]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" property="iconactive" label="选中图标" show-overflow-tooltip width="90">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              v-if="scope.row.iconactive"
              class="table_list_pic"
              :src="scope.row.iconactive"
              :preview-src-list="[scope.row.iconactive]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        property="hump"
        label="凸起"
        show-overflow-tooltip
        width="100"
      />
      <el-table-column
        align="left"
        property="is_index"
        label="是否首页"
        show-overflow-tooltip
        width="100"
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
              size="mini"
              type="primary"
              @click="update(scope.row)"
            ><i
              class="el-icon-edit"
            />修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px;" />
    <!--添加/修改-->
    <Update :info="updateInfo" :opentype="opentype" :show.sync="dialog.updateDialogStatus" size="small" @refesh_list="getList" />

  </div>
</template>

<script>
import Search from '@/components/common/Search'
import Update from '@/views/bottommenu/update.vue'
import waves from '@/directive/waves' // waves directive
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Bottommenu',
  directives: { waves },
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
      const param = { path: this.$route.path }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true
      this.$api.post('/bottommenu/index', param).then(res => {
        this.list = res.data
        this.loading = false

        this.searchForm = [{
          type: 'Input',
          label: '关键词',
          prop: 'keyword',
          width: '230px'
        }
        ]
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/bottommenu/listUpdate', {
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
      this.$api.post('/bottommenu/getInfo', {
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
        this.$api.post('/bottommenu/delete', {
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
