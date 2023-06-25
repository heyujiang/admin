<template>
  <div class="module-item-tuwen" :style="!module.base.margin ? 'margin-top:0' : ''">
    <div class="item-tuwen-con">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div v-if="module.base.style == 'style1'" class="item-tuwen-style1">
        <p v-if="module.title.show" class="tit"><moduleText :text="module.title" /></p>
        <div class="item">
          <p v-if="module.img"><img :src="module.img"></p>
          <p v-else><img :src="$util.icon('img400x200.jpg')" alt=""></p>
          <div v-if="module.note.show" class="note"><moduleText :text="module.note" /></div>
        </div>
      </div>
      <!--样式二-->
      <div v-if="module.base.style == 'style2'" class="item-tuwen-style2">
        <div class="item" style="width: 100%;">
          <p v-if="module.img"><img :src="module.img"></p>
          <p v-else><img :src="$util.icon('img400x200.jpg')" alt=""></p>
          <p v-if="module.title.show" class="tit"><moduleText :text="module.title" /></p>
          <div v-if="module.note.show" class="note"><moduleText :text="module.note" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
import moduleText from '@/views/diypage/module/text.vue'
export default {
  components: { moduleBg, moduleText },
  props: ['module'],
  data() {
    return {}
  },

  mounted() {},
  methods: {}
}
</script>

<style></style>
