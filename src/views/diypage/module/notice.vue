<template>
  <div class="module-item-notice" style="margin-top:0">
    <div class="item-notice-con" :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-notice">
        <div
          class="diy-notice dis-flex"
          :style="'background:'+ module.base.background +'; padding:'+ module.base.paddingTop +'px 10px;'"
        >
          <div class="notice__icon">
            <img v-if="module.base.icon" :src="module.base.icon"><img v-else :src="$util.icon(module.base.default_icon)">
          </div>
          <div class="notice__text flex-box am-text-truncate">
            <moduleText :text="module.text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
import moduleText from '@/views/diypage/module/text.vue'
export default {
  components: {
    moduleBg,
    moduleText
  },
  props: ['module'],
  data() {
    return {}
  },

  mounted() {},
  methods: {}
}
</script>
