<template>
  <div class="module-item-imagesingle" style="margin-top:0">
    <div class="item-imagesingle-con" :style="'padding:' + module.base.paddingTop + 'px '+ module.base.paddingLeft + 'px'">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-imagesingle">
        <div class="item">
          <p v-if="module.img"><img :src="module.img"></p>
          <p v-else><img :src="$util.icon('img400x200.jpg')" alt=""></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
export default {
  components: { moduleBg },
  props: ['module'],
  data() {
    return {}
  },

  mounted() {},
  methods: {}
}
</script>
