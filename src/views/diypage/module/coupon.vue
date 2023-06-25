<template>
  <div class="module-item-coupon">
    <div class="item-coupon-con" :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-coupon">
        <div class="diy-coupon dis-flex flex-x-around">
          <div v-for="(item,index) in module.list" :key="index" class="coupon-wrapper">
            <div class="coupon-item">
              <i class="before" :style="'background:'+module.base.background" />
              <div
                :class="'color__'+item.color"
                class="left-content dis-flex flex-dir-column flex-x-center flex-y-center"
              >
                <div class="content-top">
                  <span class="unit">￥</span>
                  <span class="price">{{ item.reduce_price }}</span>
                </div>
                <div class="content-bottom">
                  <span>满{{ item.min_price }}元可用</span>
                </div>
              </div>
              <div class="right-receive dis-flex flex-dir-column flex-x-center flex-y-center">
                <span>立即</span>
                <span>领取</span>
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
    return {}
  },

  computed: {},

  created() {},

  mounted() {},
  methods: {}
}
</script>
