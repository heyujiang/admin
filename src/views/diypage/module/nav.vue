<template>
  <div class="module-item-nav module-common" style="margin-top:0">
    <div :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <moduleBg :base="module.base" />
      <div class="item-nav-con" :class="module.base.column==5?'col5':''">
        <div v-for="(item,index) in module.list" :key="index" class="item" @click="$util.openAttr(module.list,index)">
          <template v-if="item.icon.style!=2">
            <img v-if="item.icon.style==3 && item.icon.custompic" class="item-nav-img" :src="item.icon.custompic">
            <img v-else class="item-nav-img" :src="item.icon.pic">
          </template>
          <div v-if="item.text.show" class="item-nav-text" :style="module.base.fc!=''?'color:'+module.base.fc:''">
            <moduleText :text="item.text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleText from '@/views/diypage/module/text.vue'
import moduleBg from '@/views/diypage/module/bg.vue'
export default {
  components: {
    moduleText,
    moduleBg
  },
  props: ['module'],
  data() {
    return {
    }
  },
  computed: {

  }
}
</script>

<style>
</style>
