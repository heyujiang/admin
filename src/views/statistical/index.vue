<template>
  <div>
    <el-row class="app-toptool" type="flex">
      <el-col :span="6">
        <el-button-group>
          <el-button :type="interval=='日'?'primary':''" @click="gointerval('日')">本日</el-button>
          <el-button :type="interval=='周'?'primary':''" @click="gointerval('周')">本周</el-button>
          <el-button :type="interval=='月'?'primary':''" @click="gointerval('月')">本月</el-button>
          <el-button :type="interval=='年'?'primary':''" @click="gointerval('年')">本年</el-button>
        </el-button-group>
      </el-col>
      <el-col>
        <Search
          size="small"
          :search-visible="searchVisible"
          :search-data.sync="searchData"
          :search-form="searchForm"
          @refesh_list="index"
        />
      </el-col>
    </el-row>
    <div id="charts_one" style="width:100%;min-height:80vh">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :row-class-name="rowClass"
        row-key="id"
        :row-style="{height:60+'px'}"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :border="false"
        :stripe="true"
        class="eltable"
        :data="list"
        style="width: 100%"
      >
        <el-table-column align="center" property="ptypename" label="类型" show-overflow-tooltip />
        <el-table-column align="center" property="starttime" label="开始时间" show-overflow-tooltip />
        <el-table-column align="center" property="endtime" label="结束时间" show-overflow-tooltip />
        <el-table-column align="center" property="ordercount" label="订单数量" show-overflow-tooltip />
        <el-table-column align="center" property="deposit" label="定金合计" show-overflow-tooltip />
        <el-table-column align="center" property="additional" label="尾款合计" show-overflow-tooltip />
        <el-table-column align="center" property="total" label="支付合计" show-overflow-tooltip />
        <el-table-column align="center" property="AgentIncome" label="分销商收入" show-overflow-tooltip />
        <el-table-column align="center" property="TechnicalIncome" label="师傅收入" show-overflow-tooltip />
        <el-table-column align="center" property="StoreIncome" label="商家收入" show-overflow-tooltip />
        <el-table-column align="center" property="OperatingcityIncome" label="城市代理收入" show-overflow-tooltip />
        <el-table-column align="center" property="platformIncome" label="平台收入" show-overflow-tooltip />
      </el-table>
    </div>
  </div>
</template>
<script>
import Search from '@/components/common/Search.vue'
export default {
  name: 'Statistical',
  components: {
    Search
  },
  data() {
    return {
      ids: [],
      single: true,
      multiple: true,
      list: [],
      exceldata: [],
      dumppage: 1,
      ws: {},
      filename: '',
      loading: false,
      searchVisible: true,
      searchForm: [],
      searchData: {},
      interval: '周'
    }
  },
  mounted() {
    this.index()
    this.searchForm = [{
      type: 'datetime',
      label: '创建时间',
      prop: 'create_time',
      width: '150px'
    }]
  },
  methods: {
    index() {
      const param = {
        interval: this.interval
      }
      Object.assign(param, this.searchData)
      this.loading = true
      this.$api.post('/statistical/index', param).then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    gointerval(e) {
      this.interval = e
      this.index()
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
<style>
  .eltable th {
    height: 30px;
    line-height: 30px;
  }
</style>
