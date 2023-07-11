<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <topbar class="topbar-container"/>
        <navbar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main/>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
      <div style="padding: 10px;font-size:12px ;color: #999;text-align: center;">{{ w7copyright }}</div>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import api from '@/utils/api'
import {
  AppMain,
  Navbar,
  Settings,
  Sidebar,
  TagsView,
  Topbar
} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Topbar
  },
  mixins: [ResizeMixin],
  mounted() {
    var audio = new Audio(require('@/assets/new_order.mp3'))
    var that = this
    setInterval(function() {
      api.post('/orderremind/index').then(res => {
        console.log(res)
        if (res.data) {
          api.post('/orderremind/delete', { id: res.data.id })

          // 播放提示音
          audio.play()
          // 右上角提示消息
          that.$notify({
            title: '新订单',
            message: '您有新的订单待处理'
          })
        }
      })
    }, 10000)
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters([
      'w7copyright'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', {
        withoutAnimation: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}



.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
