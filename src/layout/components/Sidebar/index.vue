<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(route,index) in son_permission_routes" :key="route.path" :item="route" :index="index"
                      :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'son_permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      console.log(meta,path)
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
#app .sidebar-container ::v-deep .el-menu ul {
  width: 120px !important;
  position: fixed;
  top: 0px;
  left: 150px;
  background: #1f2d3d !important;
  overflow: auto !important;
}

#app .sidebar-container ::v-deep .el-menu ul .sub-el-icon {
  display: none;
}

#app .sidebar-container ::v-deep .el-menu ul li {
  position: relative;
}

#app .sidebar-container ::v-deep .el-menu ul li ul {
  width: 120px !important;
  position: relative !important;
  left: 0;
}

#app .sidebar-container ::v-deep .el-menu ul li ul li {
  padding-left: 20px !important;

}

::v-deep .el-icon-arrow-down:before {
  display: none;
}

::v-deep #app .sidebar-container ::v-deep .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container ::v-deep .el-submenu .el-menu-item {
  background: rgb(48, 65, 86) !important;
}

</style>
