<template>
  <div id="module">
    <section v-for="(element, index) in modulelist" :key="index" class="section-module">
      <div
        class="appdiy-module-item"
        :class="selectIndex === index ? 'on' : ''"
        @click.stop="moduleClick(index)"
        @mouseenter="mouseovers(index)"
        @mouseleave="mouseout"
      >
        <template v-if="!prev">
          <span class="xline" />
          <span class="xline" />
          <span class="xline" />
          <span class="xline" />
        </template>
        <moduleBanner v-if="element.type == 'banner'" :module="element" />
        <moduleNav v-if="element.type == 'navBar'" :module="element" />
        <moduleSearch v-if="element.type == 'search'" :module="element" />
        <moduleCoupon v-if="element.type == 'coupon'" :module="element" />
        <moduleWindow v-if="element.type == 'window'" :module="element" />
        <moduleDuo v-if="element.type == 'duo'" :module="element" />
        <modlueImageSingle v-if="element.type == 'imageSingle'" :module="element" />
        <modlueVideo v-if="element.type == 'video'" :module="element" />
        <modlueNotice v-if="element.type == 'notice'" :module="element" />
        <modlueTuwen v-if="element.type == 'tuwen'" :module="element" />
        <modlueGoods v-if="element.type == 'goods'" :module="element" />
        <modlueTechnical v-if="element.type == 'technical'" :module="element" />
        <modlueTuan v-if="element.type == 'tuan'" :module="element" />
        <modlueMiaosha v-if="element.type == 'miaosha'" :module="element" />
      </div>
      <div v-if="placeholder" class="placeholder" :data-index="index + 1">放在这里</div>
    </section>
  </div>
</template>

<script>
import moduleNav from '@/views/diypage/module/nav.vue'
import moduleBanner from '@/views/diypage/module/banner.vue'
import moduleSearch from '@/views/diypage/module/search.vue'
import moduleCoupon from '@/views/diypage/module/coupon.vue'
import moduleWindow from '@/views/diypage/module/window.vue'
import moduleDuo from '@/views/diypage/module/duo.vue'
import modlueImageSingle from '@/views/diypage/module/imageSingle.vue'
import modlueVideo from '@/views/diypage/module/video.vue'
import modlueNotice from '@/views/diypage/module/notice.vue'
import modlueTuwen from '@/views/diypage/module/tuwen.vue'
import modlueGoods from '@/views/diypage/module/goods.vue'
import modlueTechnical from '@/views/diypage/module/technical.vue'
import modlueTuan from '@/views/diypage/module/tuan.vue'
import modlueMiaosha from '@/views/diypage/module/miaosha.vue'

export default {
  name: 'Module',
  components: {
    moduleNav,
    moduleBanner,
    moduleSearch,
    moduleCoupon,
    moduleWindow,
    moduleDuo,
    modlueImageSingle,
    modlueVideo,
    modlueNotice,
    modlueTuwen,
    modlueGoods,
    modlueTechnical,
    modlueTuan,
    modlueMiaosha
  },
  props: {
    'modulelist': {
      type: Array
    },
    'prev': {
      default: false
    }
  },
  data() {
    return {
      placeholder: false,
      selectIndex: '', // 选中
      activeIndex: '' // 当前活动active
    }
  },

  methods: {
    // 模块点击
    moduleClick(index) {
      this.selectIndex = index
      this.$emit('moduleClick', index)
    },

    // 鼠标移入模块
    mouseovers(index) {
      const top = event.target.getBoundingClientRect().top
      this.$emit('moduleMouseovers', {
        top: top,
        index: index
      })
    },

    // 鼠标离开模块
    mouseout() {
      this.$emit('moduleMouseout')
    }
  }
}
</script>
