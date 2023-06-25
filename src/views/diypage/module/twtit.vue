<template>
  <div class="module-item-twtit">
    <moduleText :text="title" />
  </div>
</template>

<script>
import moduleText from '@/views/diypage/module/text.vue'
export default {
  name: 'ModuleTwtit',
  components: {
    moduleText
  },
  props: ['title']
}
</script>
