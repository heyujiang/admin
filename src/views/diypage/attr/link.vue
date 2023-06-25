<template>
  <div>
    <div class="item">
      <div class="input">
        <div class="input-line">
          <div class="tit">
            <el-button type="primary" icon="el-icon-link" @click="openLink">设置跳转</el-button>
          </div>
          <div class="input">
            <input type="text" style="width: 200px;" readonly="readonly" class="intxt" :value="link.miaoshu" placeholder="请设置导航链接">
          </div>
        </div>
      </div>
    </div>
    <!--设置连接弹窗-->
    <SiteLink :show.sync="showSiteLink" size="small" />
  </div>
</template>

<script>
import SiteLink from '@/views/diypage/attr/siteLink.vue'
export default {
  name: 'AttrLink',
  components: {
    SiteLink
  },
  props: ['link'],
  data() {
    return {
      showSiteLink: false
    }
  },
  mounted() {

  },
  methods: {
    openLink() {
      this.showSiteLink = true
    }
  }
}
</script>
