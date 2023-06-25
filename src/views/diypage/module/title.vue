<template>
  <div class="module-item-title">
    <div class="tit">
      <moduleText :text="title.title" />
    </div>
    <div v-if="title.more.show" class="mo">
      <moduleText :text="title.more" />
    </div>
  </div>
</template>

<script>
import moduleText from '@/views/diypage/module/text.vue'
export default {
  name: 'ModuleTitle',
  components: {
    moduleText
  },
  props: {
    'title': {
      type: Object
    }
  }
}

</script>
