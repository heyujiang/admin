<template>
  <div class="module-item-search">
    <div class="item-search-con">
      <moduleBg :base="module.base" />
      <!--样式一-->
      <div class="item-search">
        <div class="diy-search">
          <div class="inner left" :class="module.base.searchStyle" :style="{'background': module.base.inputBackground}">
            <div class="search-input" :style="{'text-align': module.base.textAlign, 'color': module.base.inputColor}">
              <i class="el-icon-search sub-el-icon" />
              <span>{{ module.params.placeholder }}</span>
            </div>
          </div>
          <div v-if="module.base.is_hotkey=='1'" :style="'color:'+ module.base.hotkeytxtColor" class="hotkeybox">
            热搜 {{ module.params.hotkey }}
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
