<template>
  <div class="appdiy-module-attr" @click.stop>
    <AttrConHead v-if="attr.type == 1" :attr="attr" />
  </div>
</template>

<script>
import '@/assets/diy/css/attr.scss'
import AttrConHead from '@/views/diypage/attr/con_head.vue'
export default {
  name: 'ConAttr',
  components: { AttrConHead },
  props: ['attr'],
  mounted() {

  }
}
</script>
