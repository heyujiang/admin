<template>
  <div class="module-item-video" style="margin-top:0">
    <div class="item-video-con" :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-video">
        <div class="diy-video" :style="'padding:'+ module.base.paddingTop+ 'px 0;'">
          <video
            :style="'height:'+ module.base.height +'px;'"
            :src="module.videoUrl"
            :poster="module.base.poster"
            controls
          >
            您的浏览器不支持 video 标签
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
export default {
  components: {
    moduleBg
  },
  props: ['module'],
  data() {
    return {}
  },

  mounted() {},
  methods: {}
}
</script>
