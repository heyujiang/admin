<template>
  <div>
    <el-dialog title="" width="375px" :before-close="beforeClose" :visible.sync="show">
      <div class="appdiy-preview">
        <span class="el-icon-close" @click="$parent.showPreview=false" />
        <div class="appdiy-module-container">
          <div v-for="(item,index) in pagebase" :key="index">
            <!--页面标题-->
            <conTitle v-if="item.type==1" :params="item" :name="name" :prev="true" />
          </div>

          <div class="appdiy-module">
            <!--DIY组件部份-->
            <Module ref="module" :modulelist="modulelist" :prev="true" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Module from '@/views/diypage/common/Module.vue'
  import conTitle from '@/views/diypage/module/contitle.vue'
  export default {
    name: 'Preview',
    components: {
      Module,
      conTitle
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      pagebase: {
        type: Array
      },
      modulelist: {
        type: Array
      },
      name: {
        default: ''
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      beforeClose() {
        this.$parent.showPreview = false
      }
    }
  }
</script>
