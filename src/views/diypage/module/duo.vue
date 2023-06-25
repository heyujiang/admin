<template>
  <div class="module-item-duo" :style="!module.base.margin ? 'margin-top:0' : ''">
    <div class="item-duo-con" :style="style">
      <moduleBg :base="module.base" />
      <!--平铺-->
      <div :class="'col' + module.base.column + ' item-duo-display__' + module.base.display">
        <div v-for="(item, index) in module.list" :key="index" class="item" @click="$util.openAttr(module.list,index)">
          <div class="c">
            <p class="pic"><img
              v-if="item.img"
              :style="'border-radius:'+module.base.borderradius+'%'"
              :src="item.img"
            ><img
              v-else
              :style="'border-radius:'+module.base.borderradius+'%'"
              :src="$util.icon('img.jpg')"
              alt=""
            ></p>
            <p v-if="item.text.show" class="txt">
              <moduleText :text="item.text" />
            </p>
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
  computed: {
    style() {
      if (this.module.base.fc != '') {
        return `color:${this.module.base.fc}`
      } else {
        return ''
      }
    }
  },

  created() {},
  mounted() {},
  methods: {}
}
</script>
