<template>
    <div class="topbar">
          <el-menu
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          mode="horizontal"
        >
          <topbar-item v-for="(route,index) in permission_routes" :key="route.path" :item="route" :index="index"
                          :base-path="route.path"
            />
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopbarItem from './TopbarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { TopbarItem },

  data:{
    return:{
      activeIndex:0
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      console.log(meta,path)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

</style>
<style lang="scss" scoped>
  .topbar {
    height: 56px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    z-index: 1;
}
</style>