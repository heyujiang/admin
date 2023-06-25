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
    >
      <el-table-column
        align="center"
        type=""
        property="id"
        label="编号"
        show-overflow-tooltip
        width="70"
      />
      <el-table-column align="center" property="head_img_url" label="头像" show-overflow-tooltip width="90">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              v-if="scope.row.head_img_url"
              class="table_list_pic"
              :src="scope.row.head_img_url"
              :preview-src-list="[scope.row.head_img_url]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        property="nick_name"
        label="微信昵称"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="goodsName"
        label="产品/服务"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="level"
        label="评分(总分5分)"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="content"
        label="评语"
        show-overflow-tooltip
        width=""
      />
      <el-table-column
        align="left"
        property="create_time"
        label="评价时间"
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
    </el-table>
    <Pagination
      :total="page_data.total"
      :page.sync="page_data.page"
      :limit.sync="page_data.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import {
  param2Obj
} from '@/utils/common'
export default {
  name: 'Comment',
  directives: { waves },
  components: {
    Search,
    Pagination
  },
  data() {
    return {
      ids: [],
      single: true,
      multiple: true,
      list: [],
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
    this.getList()
  },
  methods: {
    searchgo() {
      this.page_data.page = 1;
      this.getList()
    },
    getList() {
      const param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true
      this.$api.post('/Comment/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
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
        this.$api.post('/Comment/listUpdate', {
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
