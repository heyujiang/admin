<template>
  <div class="appdiy-module-attr" @click.stop>
    <AttrNav v-if="attr.type == 'navBar'" :attr="attr" />
    <AttrSlide v-if="attr.type == 'banner'" :attr="attr" />
    <AttrSearch v-if="attr.type == 'search'" :attr="attr" />
    <AttrCoupon v-if="attr.type == 'coupon'" :attr="attr" />
    <AttrWindow v-if="attr.type == 'window'" :attr="attr" />
    <AttrDuo v-if="attr.type == 'duo'" :attr="attr" />
    <AttrImageSingle v-if="attr.type == 'imageSingle'" :attr="attr" />
    <AttrVideo v-if="attr.type == 'video'" :attr="attr" />
    <AttrNotice v-if="attr.type == 'notice'" :attr="attr" />
    <AttrTuwen v-if="attr.type == 'tuwen'" :attr="attr" />
    <AttrGoods v-if="attr.type == 'goods'" :attr="attr" />
    <AttrTechnical v-if="attr.type == 'technical'" :attr="attr" />
    <AttrTuan v-if="attr.type == 'tuan'" :attr="attr" />
    <AttrMiaosha v-if="attr.type == 'miaosha'" :attr="attr" />

  </div>
</template>

<script>
import '@/assets/diy/css/attr.scss'
import AttrNav from '@/views/diypage/attr/nav.vue'
import AttrSlide from '@/views/diypage/attr/banner.vue'
import AttrSearch from '@/views/diypage/attr/search.vue'
import AttrCoupon from '@/views/diypage/attr/coupon.vue'
import AttrWindow from '@/views/diypage/attr/window.vue'
import AttrDuo from '@/views/diypage/attr/duo.vue'
import AttrImageSingle from '@/views/diypage/attr/imageSingle.vue'
import AttrVideo from '@/views/diypage/attr/video.vue'
import AttrNotice from '@/views/diypage/attr/notice.vue'
import AttrTuwen from '@/views/diypage/attr/tuwen.vue'
import AttrGoods from '@/views/diypage/attr/goods.vue'
import AttrTechnical from '@/views/diypage/attr/technical.vue'
import AttrTuan from '@/views/diypage/attr/tuan.vue'
import AttrMiaosha from '@/views/diypage/attr/miaosha.vue'
export default {
  name: 'Attr',
  components: { AttrNav, AttrSlide, AttrCoupon, AttrSearch, AttrWindow, AttrDuo, AttrVideo, AttrNotice, AttrImageSingle, AttrTuwen, AttrGoods, AttrTechnical,AttrTuan,AttrMiaosha },
  props: ['attr'],
  mounted() {

  }
}
</script>
