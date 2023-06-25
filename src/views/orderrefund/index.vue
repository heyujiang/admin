<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="16">
        <Search size="small" :search-visible="searchVisible" :search-data.sync="searchData" :search-form="searchForm"
          @refesh_list="searchgo" />
      </el-col>
      <el-col :span="8">
        <div class="btn-group" style="margin-bottom:11px;float: right;">
          <div>
            <el-button v-if="checkPermission('/orderrefund/delete')" type="primary" :disabled="multiple" size="small" icon="el-icon-delete" @click="del(ids)">删除
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="rowClass" row-key="id"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :border="false" :stripe="true" class="eltable"
        :data="list" style="width: 100%" @selection-change="selection">
        <el-table-column align="center" type="selection" width="42" />
        <el-table-column align="left" property="order_num_alias" label="订单号" show-overflow-tooltip width="130" />
        <el-table-column align="left" property="member.nickname" label="用户" show-overflow-tooltip width="130" />
        <el-table-column label="商品" align="left" width="300">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.orderGoods" :key="index">
              <div class="image__preview">
                <el-image v-if="item.image" class="table_list_pic" :src="item.image" :preview-src-list="[item.image]" />
              </div>
              <div class="goodstext">
                <div>{{ item.name+'\n' }}</div>
                <div v-if="item.sku">{{ item.sku+'\n' }}</div>
                <div>数量：{{ item.quantity }}</div>
                <div>小计：{{ item.total }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" property="orderRefund.refund_type_name" label="售后类型" show-overflow-tooltip
          width="130" />
        <el-table-column label="申请信息" align="left" width="180">
          <template slot-scope="scope">
            <div>联系人：{{ scope.row.orderRefund.lianxiren }}</div>
            <div>联系方式：{{ scope.row.orderRefund.tel }}</div>
            <div>理由：{{ scope.row.orderRefund.refund_desc }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" property="total" label="订单金额" show-overflow-tooltip width="130" />
        <el-table-column align="left" property="order_status" label="订单状态" show-overflow-tooltip width="130" />
        <el-table-column align="left" property="pay_time" label="支付时间" show-overflow-tooltip width="" />
        <el-table-column align="left" property="create_time" label="下单时间" show-overflow-tooltip width="" />
        <el-table-column align="left" property="shipping_type" label="发货方式" show-overflow-tooltip width="" />
        <el-table-column label="支付方式" align="left">
          <template slot-scope="scope">
            <div>{{ scope.row.payment_code_name }}</div>
          </template>
        </el-table-column>
        <el-table-column :fixed="$store.getters.device !== 'mobile'?'right':false" label="操作" align="center"
          width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button v-if="scope.row.orderRefund.refund_status==0 && checkPermission('/orderrefund/retreat')" size="mini" type="primary"
                @click="retreat(scope.row)">
                处理退款
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="page_data.total" :page.sync="page_data.page" :limit.sync="page_data.limit"
        @pagination="index" />
    </div>
    <!--发货-->
    <Retreat :info="retreatInfo" :show.sync="dialog.retreatDialogStatus" size="small" @refesh_list="index" />
  </div>
</template>
<script>
  import Search from '@/components/common/Search'
  import Pagination from '@/components/Pagination'
  import Retreat from '@/views/orderrefund/retreat.vue'
  import {
    confirm,
    param2Obj
  } from '@/utils/common'
  export default {
    name: 'Orderrefund',
    components: {
      Search,
      Retreat,
      Pagination
    },
    data() {
      return {
        dialog: {
          retreatDialogStatus: false
        },
        ids: [],
        single: true,
        multiple: true,
        list: [],
        detailInfo: {},
        retreatInfo: {},
        offlineInfo: {},
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
          path: this.$route.path,
          limit: this.page_data.limit,
          page: this.page_data.page
        }
        Object.assign(param, this.searchData)
        Object.assign(param, param2Obj(this.$route.fullPath))
        this.loading = true

        this.$api.post('/orderrefund/index', param).then(res => {
          this.list = res.data.data
          this.page_data.total = res.data.total
          this.loading = false
          if (this.page_data.page == 1) {
            this.searchForm = [{
                type: 'Input',
                label: '关键词',
                prop: 'keyword',
                width: '230px'
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
      },
      retreat(row) {
        const id = row.id ? row.id : this.ids.join(',')
        this.$api.post('/orderrefund/getInfo', {
          id: id
        }).then(res => {
          this.dialog.retreatDialogStatus = true
          this.retreatInfo = res.data
        })
      },
      del(row) {
        confirm({
          content: '确定要操作吗'
        }).then(() => {
          const ids = row.id ? row.id : this.ids.join(',')

          this.$api.post('/orderrefund/delete', {
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
