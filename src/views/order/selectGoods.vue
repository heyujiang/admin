<template>
  <div>
    <el-dialog
      title="选择商品"
      width="1110px"
      class="icon-dialog"
      :before-close="closeSelect"
      :visible.sync="show"
      append-to-body
    >
      <div>
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="searchgo"
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
          <el-table-column align="center" type="" property="id" label="编号" show-overflow-tooltip width="70" />
          <el-table-column align="center" property="image" label="图片" show-overflow-tooltip width="90">
            <template slot-scope="scope">
              <div>
                <el-image
                  v-if="scope.row.image"
                  class="table_list_pic"
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" property="cat_id" label="类目" show-overflow-tooltip width="150" />
          <el-table-column align="left" property="name" label="名称" show-overflow-tooltip width="380" />
          <el-table-column align="left" property="price" label="价格" show-overflow-tooltip width="" />
          <el-table-column align="left" property="quantity" label="库存" show-overflow-tooltip width="" />
          <el-table-column
            :fixed="$store.getters.device !== 'mobile'?'right':false"
            label="操作"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.id">
                <el-button size="mini" type="primary" @click="selectGoods(scope.row)"><i class="el-icon-edit" />选择
                </el-button>
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
  name: 'SelectGoods',
  components: {
    Search,
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    opentype: {
      type: String,
      default: 'add'
    },
    size: {
      type: String,
      default: 'small'
    },
    info: {
      type: Object
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

      this.$api.post('/goods/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        // console.log(this.page_data);
        if (this.page_data.page == 1) {
          this.searchForm = [{
            type: 'treeSelect',
            label: '分类',
            prop: 'cat_id',
            data: res.field_data.cidarray,
            width: '150px'
          },
          {
            type: 'Input',
            label: '关键词',
            prop: 'keyword',
            width: '200px'
          }
          ]
        }
      })
    },
    // 选择
    selectGoods(item) {
      if (typeof this.$parent.form != 'undefined') {
        this.$parent.form.goods_id = item.id
        this.$parent.form.title = item.name
        this.$parent.form.goods = item
        this.$parent.getordertotal()
      }

      this.closeSelect()
    },

    closeSelect() {
      this.$parent.showSelectGoods = false
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
