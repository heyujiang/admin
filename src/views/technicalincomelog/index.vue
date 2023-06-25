<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="18">
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="searchgo"
        />
      </el-col>
      <el-col :span="6" />
    </el-row>
    <div id="charts_one" style="width:100%;min-height:80vh">
      <el-table
        ref="multipleTable"
        v-loading="loading"
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
          property="order_num_alias"
          label="订单号"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          align="center"
          property="nickname"
          label="用户名"
          show-overflow-tooltip
        />
        <el-table-column label="服务内容" align="left" width="300">
          <template v-if="scope.row.orderGoods.length>0" slot-scope="scope">
            <div v-for="(item, index) in scope.row.orderGoods" :key="index">
              <div class="image__preview">
                <el-image v-if="item.image" class="table_list_pic" :src="item.image" :preview-src-list="[item.image]" />
              </div>
              <div class="goodstext">
                <div>{{ item.name+'\n' }}</div>
                <div v-if="item.quantity">数量：{{ item.quantity }}</div>
                <div v-if="item.total">小计：{{ item.total }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div> {{ scope.row.pay_subject }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="title"
          label="师傅"
          show-overflow-tooltip
        />
        <el-table-column align="left" property="yue_time" label="预约时间" show-overflow-tooltip width="200" />
        <el-table-column align="left" property="order_total" label="订单金额" show-overflow-tooltip width="130" />
        <el-table-column align="left" property="income" label="结算金额" show-overflow-tooltip width="130" />
        <el-table-column
          align="center"
          property="create_time"
          label="结算时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ parseTime(scope.row.create_time) }}
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
  </div>
</template>
<script>
import Search from '@/components/common/Search.vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'Technicalincomelog',
  components: {
    Search,
    Pagination
  },
  data() {
    return {
      ids: [],
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
      let param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      if (this.searchData) param = Object.assign(param, this.searchData)
      this.loading = true

      this.$api.post('/technicalincomelog/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        if (this.page_data.page == 1) {
          this.searchForm = [{
            type: 'Input',
            label: '订单号/用户名/师傅名',
            prop: 'keyword',
            width: '200px'
          },
          {
            type: 'datetime',
            label: '创建时间',
            prop: 'create_time',
            width: '150px'
          }
          ]
        }
      })
    }
  }
}
</script>
<style scoped>
  .image__preview {
    float: left;
  }

  .goodstext {
    float: left;
    padding-left: 10px;
    width: 200px;
  }

  .table_list_pic {
    width: 60px;
    vertical-align: middle;
  }
</style>
