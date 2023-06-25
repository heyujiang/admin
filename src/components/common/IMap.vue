<template>
  <div>
    <baidu-map class="bm-view" v-if="refresh" :center="center" :zoom="zoom" :dragging="true" @click="click" @ready="ready">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-marker v-if="showMarker" :position="markerPoint"></bm-marker>
    </baidu-map>
    <div style="height: 20px;line-height: 20px;">经度：{{markerPoint.lng}}；纬度：{{markerPoint.lat}}</div>
  </div>
  
</template>
<script>
export default {
  name: 'IMap',
  props: {
    coordinate: {
      type: Object,
      default: function() {
        return {"lng":0,"lat":0}
      }
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      center: {lng:0,lat:0},
      markerPoint:{lng:0,lat:0},
      zoom: 16,
      showMarker: true,
      showPoint: false,
      pointPoint:{}
    };
  },
  methods: {
    ready ({BMap, map}) {
      this.showPoint = false;
      console.log(this.coordinate)
      if (this.coordinate) {
        this.center = this.coordinate
        this.markerPoint = this.center
      }else{
        this.center = '北京'
        this.showMarker = false
      }
      this.zoom = 16
    },
    click ({type, target, point, pixel, overlay}){
      console.log(point)
      if (!this.showMarker) {
        this.showMarker = true
      }
      this.markerPoint = point
      this.$emit('update:coordinate',point)
    }
  }
};
</script>
<style>
  .bm-view {
    width: 100%;
    height: 300px;
  }
  .BMap_cpyCtrl {
      display: none;
  }
  .anchorBL {
      display: none;
  }
</style>
