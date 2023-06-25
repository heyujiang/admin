<template>
  <div>
    <el-dialog
      title="推广订单"
      width="1110px"
      class="icon-dialog"
      :before-close="closewindow"
      :visible.sync="show"
      append-to-body
      @open="index"
    >
      <div>
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="index"
        />
        <el-table
          v-loading="loading"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :border="false"
          :stripe="true"
          class="eltable"
          :data="list"
          style="width: 100%"
        >
          <el-table-column align="center" type="" property="order_num_alias" label="订单号" show-overflow-tooltip width="200" />
          <el-table-column align="left" property="username" label="	用户信息" show-overflow-tooltip width="" />
          <el-table-column align="left" property="create_time" label="时间" show-overflow-tooltip width="" />
          <el-table-column align="left" property="order_total" label="订单金额" show-overflow-tooltip width="" />
          <el-table-column align="left" property="income" label="返佣金额" show-overflow-tooltip width="" />
        </el-table>
        <Pagination
          :total="page_data.total"
          :page.sync="page_data.page"
          :limit.sync="page_data.limit"
          @pagination="index"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import {
  param2Obj
} from '@/utils/common'
export default {
  name: 'Agentorder',
  components: {
    Search,
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    uid: {
      type: Number
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      ws: {},
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
  watch: {
    show(val) {
      if (val) {
        this.searchForm = [{
          type: 'Input',
          label: '关键词',
          prop: 'keyword',
          width: '200px'
        }]
      }
    }
  },
  methods: {
    index() {
      const param = {
        uid: this.uid,
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/agent/agentorder', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
      })
    },
    closewindow() {
      this.$emit('update:show', false)
      this.loading = false
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
