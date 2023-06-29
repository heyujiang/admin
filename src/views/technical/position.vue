<template>
    <div>
      <el-dialog
        :title="师傅位置"
        width="900px"
        class="icon-dialog"
        :visible.sync="show"
        :before-close="closeForm"
        append-to-body
        @open="open"
      >

        <div slot="title">
            <IMap :coordinate.sync="position" :refresh="mapRefresh"></IMap>
        </div>
        <div>
            <el-cascader v-model="info.area" expand-trigger="hover" :change-on-select="true" :options="areaoptions" disabled/>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button :loading="loading" type="primary" @click="closeForm">
            <span v-if="!loading">确 定</span>
          </el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import IMap from '@/components/common/IMap.vue'

  export default {
    name: 'TechnicalPosition',
    components: {
      IMap
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
      info: {
        type: Object
      }
    },
    data() {
      return {
        position:{lng:0,lat:0},
        mapRefresh: false,
        areaoptions:[]
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$api.post('/Area/getpcTree').then(res => {
            this.areaoptions = res.data
          })
        }
      }
    },
    methods: {
      open() {
        this.mapRefresh = true   //每次打开刷新地图地图组件
        this.position.lng = this.info.longitude
        this.position.lat = this.info.latitude
      },
      closeForm() {
        this.$emit('update:show', false)
        this.mapRefresh = false //每次打开刷新地图地图组件
      }
    }
  }
  </script>