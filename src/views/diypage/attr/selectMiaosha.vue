<template>
  <div>
    <el-dialog
      title="选择秒杀商品"
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
          <el-table-column align="left" property="title" label="名称" show-overflow-tooltip width="380" />
          <el-table-column
            align="left"
            property="begin_date"
            label="开始时间"
            show-overflow-tooltip
            width=""
          />
          <el-table-column
            align="left"
            property="end_date"
            label="结速时间"
            show-overflow-tooltip
            width=""
          />
          <el-table-column
            align="left"
            property="create_time"
            label="创建时间"
            show-overflow-tooltip
            width=""
          />
          <el-table-column
            :fixed="$store.getters.device !== 'mobile'?'right':false"
            label="操作"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.id">
                <el-button size="mini" type="primary" @click="selectMiaosha(scope.row)"><i
                  class="el-icon-edit"
                />选择</el-button>
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
import module from '@/utils/module.js'
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import {
  param2Obj
} from '@/utils/common'
export default {
  name: 'SelectMiaosha',
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

      this.$api.post('/miaoshagoods/index', param).then(res => {
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
              width: '200px'
            }
          ]
        }
      })
    },
    // 选择
    selectMiaosha(item) {
      const arr = JSON.stringify(module.moduleShop)
      const goods = JSON.parse(arr)
      goods.cm = item
      let flag = true
      if (typeof this.$parent.attr != 'undefined') {
        this.$parent.attr.list.forEach(res => {
          if (res.cm.id == item.id) {
            flag = false
          }
        })
        if (flag) {
          this.$parent.attr.list.push(goods)
        } else {
          this.$message.error('不能选择重复商品')
          return false
        }
      }
      if (typeof this.$parent.module != 'undefined') {
        this.$parent.module.list.forEach(res => {
          if (res.cm.id == item.id) {
            flag = false
          }
        })
        if (flag) {
          this.$parent.module.list.push(goods)
        } else {
          this.$message.error('不能选择重复商品')
          return false
        }
      }
      this.closeSelect()
    },

    closeSelect() {
      this.$parent.showSelectMiaosha = false
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
