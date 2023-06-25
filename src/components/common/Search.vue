<template>
  <div v-if="searchVisible" style="margin-bottom:15px">
    <el-form ref="search" :size="size" inline class="searchForm">
      <el-form-item v-for="item in searchForm" :key="item.prop">
        <!--单选框-->
        <el-input
          v-if="item.type==='Input'"
          v-model="searchData[item.prop]"
          :style="'width:'+item.width"
          :placeholder="item.label"
        />
        <!--下拉框-->
        <el-select
          v-if="item.type==='Select'"
          v-model="searchData[item.prop]"
          :style="'width:'+item.width"
          :placeholder="item.label"
          clearable
        >
          <el-option v-for="(vo,i) in item.data" :key="i" :label="vo.key" :value="vo.val" />
        </el-select>

        <Treeselect
          v-if="item.type==='treeSelect'"
          v-model="searchData[item.prop]"
          :default-expand-level="1"
          :style="'width:'+item.width"
          :options="item.data"
          :normalizer="normalizer"
          :show-count="true"
          :placeholder="item.label"
        />

        <!--时间区间-->
        <el-date-picker
          v-if="item.type==='datetime'"
          v-model="searchData[item.prop]"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          clearable
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <el-button v-if="item.type==='day'" type="primary" plain :size="size" icon="el-icon-time" @click="daySearch">今日</el-button>
        <el-button v-if="item.type==='week'" type="primary" plain :size="size" icon="el-icon-time" @click="weekSearch">七日</el-button>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="size" icon="el-icon-search" @click="search">查询</el-button>
        <el-button :size="size" icon="el-icon-refresh" @click="searchReset">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Search',
  components: {
    Treeselect
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'mini'
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      searchData: {}
    }
  },
  // mounted() {
  //   const end = new Date();
  //   const start = new Date();
  //   end.setTime(end.getTime() + 3600 * 1000 * 24);

  //   let startYear = start.getFullYear()
  //   let startMonth = start.getMonth() + 1
  //   if(startMonth < 10){
  //     startMonth = "0"+startMonth
  //   }
  //   let startDate = start.getDate()
  //   if(startDate < 10){
  //     startDate = "0"+startDate
  //   }

  //   let endYear = end.getFullYear()
  //   let endMonth = end.getMonth() + 1
  //   if(endMonth < 10){
  //     endMonth = "0"+endMonth
  //   }
  //   let endDate = end.getDate()
  //   if(endDate < 10){
  //     endDate = "0"+endDate
  //   }

  //   this.searchData.create_time = [
  //       startYear+"-"+startMonth+"-"+startDate,
  //       endYear+"-"+endMonth+"-"+endDate
  //     ]
  // },
  methods: {
    search() {
      //this.searchData.is_search = 1
      this.$emit('update:searchData', this.searchData)
      this.$emit('refesh_list')
    },
    normalizer(data) {
      if (data.children && !data.children.length) {
        delete data.children
      }
      return {
        id: data.val,
        label: data.key,
        children: data.children
      }
    },
    searchReset() {
      this.searchData = {}
      this.$emit('refesh_list', [])
    },
    daySearch() {
      let nowTimestamp = new Date()
      let nowYear = nowTimestamp.getFullYear()
      let nowMonth = nowTimestamp.getMonth() + 1
      if(nowMonth < 10){
        nowMonth = "0"+nowMonth
      }
      let nowDate = nowTimestamp.getDate()
      if(nowDate < 10){
        nowDate = "0"+nowDate
      }

      let nextDay = new Date(nowTimestamp.getTime() + 24*60*60*1000)
      let nextYear = nextDay.getFullYear()
      let nextMonth = nextDay.getMonth() + 1
      if (nextMonth < 10) {
        nextMonth = "0"+nextMonth
      }
      let nextDate = nextDay.getDate()
      if(nextDate < 10){
        nextDate = "0"+nextDate
      }

      this.searchData.create_time = [
        nowYear+"-"+nowMonth+"-"+nowDate,
        nextYear+"-"+nextMonth+"-"+nextDate
      ]
      console.log(this.searchData)
      this.search()
    },
    weekSearch() {
      let nowTimestamp = new Date()

      let week = new Date(nowTimestamp.getTime() - 6*24*60*60*1000)
      let nowYear = week.getFullYear()
      let nowMonth = week.getMonth() + 1
      if(nowMonth < 10){
        nowMonth = "0"+nowMonth
      }
      let nowDate = week.getDate()
      if(nowDate < 10){
        nowDate = "0"+nowDate
      }

      let nextDay = new Date(nowTimestamp.getTime() + 24*60*60*1000)
      let nextYear = nextDay.getFullYear()
      let nextMonth = nextDay.getMonth() + 1
      if (nextMonth < 10) {
        nextMonth = "0"+nextMonth
      }
      let nextDate = nextDay.getDate()
      if(nextDate < 10){
        nextDate = "0"+nextDate
      }

      this.searchData.create_time = [
        nowYear+"-"+nowMonth+"-"+nowDate,
        nextYear+"-"+nextMonth+"-"+nextDate
      ]
      console.log(this.searchData)
      this.search()
    },
  }
}
</script>
<style scoped>
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 5px
  }

  .searchForm .el-form-item__label,
  .searchForm label {
    font-weight: normal;
  }
</style>
