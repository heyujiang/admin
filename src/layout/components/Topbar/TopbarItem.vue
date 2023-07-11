<template>
    <div style="display: inline-block;">
      <template
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
      >
        <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" class="submenu-title-noDropdown" @click="selectMenu([])">
            <item v-if="onlyOneChild.path == 'dashboard'" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                  :title="onlyOneChild.meta.title"
            />
            <item v-else :title="onlyOneChild.meta.title"/>
          </el-menu-item>
        </app-link>
      </template>

      <template v-else>
        <el-menu-item :index="item.path" class="submenu-title-noDropdown" @click="selectMenu(item.children)">
            <item :icon="item.meta.icon" :title="item.meta.title"/>
        </el-menu-item>
      </template>
    </div>
</template>

<script>
  import path from 'path'
  import store from '@/store'
  import { isExternal } from '@/utils/validate'
  import Item from '../Sidebar/Item'
  import AppLink from '../Sidebar/Link'
  import FixiOSBug from '../Sidebar/FixiOSBug'

  export default {
    name: 'TopbarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        default: 0
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      this.onlyOneChild = null
      return {}
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        console.log(children,parent)
        const showingChildren = children.filter(item => {
          item.meta.activeMenu = parent.path
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
      selectMenu(route){
        console.log(route)
        store.dispatch('user/setSonRoute',route)
        if(route.length > 0){
            this.$router.push(route[0])
        }
      }
    }
  }
  </script>

  <style scoped>
  /* >>> .el-menu-item {
    padding: 0 10px !important;
  }

  >>> .el-submenu__title {
    padding: 0 10px !important;
  }

  >>> .sub-el-icon {
    margin-right: 10px !important;
  }

  >>> .svg-icon {
    margin-right: 10px !important;
  } */
</style>