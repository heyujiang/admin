<template>
  <span v-if="name==''" :style="style">{{ text.txt }}</span>
  <span v-else :style="style">{{ name }}</span>
</template>

<script>
export default {
  name: 'ModuleText',
  props: {
    'text': {
      type: Object
    },
    'name': {
      default: ''
    }
  },
  computed: {
    style() {
        let style = ''
        if (this.text) {
          if (this.text.defaultstyle) {
            style = `font-size:${this.text.fontsize}px;color:${this.text.color};`
            if (this.text.bold) {
              style += 'font-weight:bold;'
            }
            if (this.text.italics) {
              style += 'font-style:italic;'
            }
            if (this.text.underline) {
              style += 'text-decoration:underline;'
            }
          }
        }
        return style
    }
  }
}
</script>
