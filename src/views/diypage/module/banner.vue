<template>
  <div class="module-item-slide" style="margin-top:0">
    <div class="item-slide-con" :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <moduleBg :base="module.base" />
      <div class="diy-item-slide">
        <swiper v-if="module.list.length>0" ref="mySwiper" class="item" :options="swiperOption">
          <swiper-slide v-for="(item, index) in module.list" :key="index">
            <p class="pic"><img v-if="item.img" :src="item.img"><img v-else :src="$util.icon('img400x200.jpg')" alt=""></p>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import moduleBg from '@/views/diypage/module/bg.vue'
import {
  Swiper,
  SwiperSlide,
  directive
} from 'vue-awesome-swiper'
import Swiper2, {
  Pagination
} from 'swiper'
Swiper2.use([Pagination])
import 'swiper/swiper-bundle.css'
export default {
  components: {
    moduleBg,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: ['module'],
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: 3000,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
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
