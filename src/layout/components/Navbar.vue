<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <div v-if="store_title" class="right-menu-item"><b>{{ store_title }}</b></div>
        <div v-if="city_title" class="right-menu-item"><b>{{ city_title }}</b></div>
        <a v-if="is_console && is_w7 && !store_title && !city_title" href="?console=1#/dashboard"
          class="right-menu-item">控制台</a>
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-avatar :src="avatar || require('@/assets/no_admintouxiang.png')" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" placement="bottom"
        style="cursor: pointer;margin-right:15px;">
        <span class="el-dropdown-link">
          {{ username }}<i class="icontool el-icon-arrow-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-lock" @click.native="updatePassword">修改密码
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出帐号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Password :show.sync="passwordDialogStatus" size="small" />
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import Search from '@/components/HeaderSearch'
  import Password from '@/views/sysbase/password'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      Search,
      Password
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'username',
        'is_console',
        'store_title',
        'city_title',
        'avatar',
        'device'
      ])
    },
    data() {
      return {
        passwordDialogStatus: false,
        is_w7: true
      }
    },
    created() {
      if (this.getQueryString('version') == 3) {
        this.is_w7 = false
      }
    },
    methods: {
      getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      updatePassword() {
        this.passwordDialogStatus = true
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        //this.$router.push(`/login`)
        var m = this.getQueryString('m');
        if (m) {
          window.open('./?m='+m, '_self')
        } else {
          window.open('./', '_self')
        }

      }
    }
  }
</script>
<style scoped>
>>> .sidebar-container {
  width: 150px !important;
}
</style>
<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    // top: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    z-index: 1;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 16px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 35px;
            height: 35px;
            border-radius: 20px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
