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
            <el-button type="primary" :disabled="multiple" size="small" icon="el-icon-delete" @click="del(ids)">删除
            </el-button>
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
        <el-table-column align="center" type="selection" width="42" />
        <el-table-column align="left" property="withdraw_sn" label="编号" show-overflow-tooltip width="" />
        <el-table-column align="left" property="amounts" label="提现金额" show-overflow-tooltip width="" />
        <el-table-column align="left" property="actual_poundage" label="手续费" show-overflow-tooltip width="" />
        <el-table-column align="left" property="actual_amounts" label="实收金额" show-overflow-tooltip width="" />
        <el-table-column align="left" property="username" label="申请人" show-overflow-tooltip width="" />
        <el-table-column align="left" property="mode" label="收款方式" show-overflow-tooltip width="" />
        <el-table-column align="left" property="MemberBankcard" label="收款账号" show-overflow-tooltip width="" />
        <el-table-column align="left" property="create_time" label="申请时间" show-overflow-tooltip width="" />
        <el-table-column align="center" property="status" label="结算" show-overflow-tooltip width="">
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
          :fixed="$store.getters.device !== 'mobile'?'right':false"
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id">
              <el-button size="mini" type="primary" @click="detail(scope.row)">
                <i class="el-icon-view" />详情
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
    <!--查看详情-->
    <Detail :info="detailInfo" :show.sync="dialog.detailDialogStatus" size="small" @refesh_list="index" />
  </div>
</template>
<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import Detail from '@/views/withdraw/detail.vue'
import {
  confirm,
  param2Obj
} from '@/utils/common'
export default {
  name: 'Withdraw',
  components: {
    Search,
    Detail,
    Pagination
  },
  data() {
    return {
      dialog: {
        detailDialogStatus: false
      },
      ids: [],
      single: true,
      multiple: true,
      list: [],
      detailInfo: {},
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
      this.page_data.page = 1
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

      this.$api.post('/withdraw/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        // console.log(this.page_data);
        if (this.page_data.page == 1) {
          this.searchForm = [{
            type: 'Input',
            label: '关键词',
            prop: 'keyword',
            width: '230px'
          }]
        }
      })
    },
    listUpdate(row, field) {
      if (row.id) {
        this.$api.post('/withdraw/listUpdate', {
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
    detail(row) {
      const id = row.id ? row.id : this.ids.join(',')
      this.$api.post('/withdraw/getInfo', {
        id: id
      }).then(res => {
        this.dialog.detailDialogStatus = true
        this.detailInfo = res.data
      })
    },
    del(row) {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        const ids = row.id ? row.id : this.ids.join(',')

        this.$api.post('/withdraw/delete', {
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
