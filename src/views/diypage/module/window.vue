<template>
  <div class="module-item-window" style="margin-top:0">
    <div class="item-window-con" :style="'padding:' + module.base.paddingTop + 'px '+ module.base.paddingLeft + 'px'">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-window-style1" :class="'col' + module.base.column">
        <div class="display">
          <div class="display-left" style="padding: 0px 0px;">
            <img v-if="module.list[0]" :src="module.list[0].img"><img v-else :src="$util.icon('window_01.jpg')">
          </div>
          <div class="display-right">
            <div class="display-right1" style="padding: 0px 0px;">
              <img v-if="module.list[1]" :src="module.list[1].img"><img v-else :src="$util.icon('window_02.jpg')">
            </div>
            <div class="display-right2">
              <div class="left" style="padding: 0px 0px;">
                <img v-if="module.list[2]" :src="module.list[2].img"><img v-else :src="$util.icon('window_03.jpg')">
              </div>
              <div class="right" style="padding: 0px 0px;">
                <img v-if="module.list[3]" :src="module.list[3].img"><img v-else :src="$util.icon('window_04.jpg')">
              </div>
            </div>
          </div>
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
    return {
    }
  },

  computed: {
  },

  created() {
  },

  mounted() {},
  methods: {}
}
</script>
