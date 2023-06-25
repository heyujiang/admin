<template>
  <div class="module-background" :style="style" />
</template>

<script>
export default {
  name: 'ModuleBg',
  props: ['base'],
  computed: {
    style() {
      let bg = ''
      if (this.base.bg == 2) {
        bg = 'background:none;'
      } else if (this.base.bg == 3) {
        if (this.base.bt == 1) {
          bg = `background:${this.base.bc};`
        } else if (this.base.bt == 2 && this.base.bi != '') {
          bg = `background:url(${this.base.bi}) no-repeat 0px 0px;background-size:100%;`
        }
      }
      return bg
    }
  }
}
</script>
