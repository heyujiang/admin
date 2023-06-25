<template>
  <div class="appdiy-title" :style="'background:'+params.base.titleBackgroundColor" @click.stop="pagebaseClick">
    <span class="el-icon-arrow-left" :style="'color:'+params.base.titleTextColor"></span>
    <p  class="tit"><span :style="'font-size:14px;color:'+params.base.titleTextColor">{{ params.params.title }}</span></p>
    <img src="@/assets/diy/xcx.png" alt="">
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    'params': {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    pagebaseClick() {
        this.$parent.pagebaseClick(this.params.type)
    }
  }
}
</script>
