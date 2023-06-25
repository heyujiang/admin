<template>
  <!--设置连接-->
  <div>
    <el-dialog
      title="设置跳转"
      width="1000px"
      class="icon-dialog"
      :before-close="closeLink"
      :visible.sync="show"
      append-to-body
    >
      <div class="linkDialog" @click.stop>
        <div class="linkd-box">
          <ul class="linkd-menu">
            <li
              v-for="(item, index) in menu"
              :key="index"
              :class="item.ptype === ptype ? 'on' : ''"
              @click="getdata(item)"
            >
              <span :class="item.icon"/>
              {{ item.txt }}
            </li>
          </ul>
          <div class="linkd-con">
            <!--自定义链接-->
            <div v-if="ptype == 'custom'" class="linkd-zdy">
              <el-select v-model="zdyLinktype" placeholder="跳转类型">
                <el-option v-for="item in zdyLinktypeoptions" :key="item.value" :label="item.label"
                           :value="item.value"
                />
              </el-select>
              <el-input v-if="zdyLinktype=='wxapp'" v-model="zdyappid" class="appidinput" placeholder="请输入appID"/>
              <el-input v-model="zdyLink" placeholder="请输入连接/页面"/>
              <el-button type="primary" icon="el-icon-circle-check" @click="inputLink">确定</el-button>
            </div>
            <div v-else>
              <Search
                size="small"
                :search-visible="searchVisible"
                :search-data.sync="searchData"
                :search-form="searchForm"
                @refesh_list="searchgo"
              />
              <el-table
                v-loading="loading"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                :border="false"
                :stripe="true"
                class="eltable"
                :data="list"
                style="width: 100%"
              >
                <el-table-column
                  v-for="column in Fields"
                  :key="column.fieldsmingcheng"
                  :prop="column.inputtype+','+column.fieldsmingcheng"
                  :label="column.viewmingcheng"
                  :width="column.width"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div v-if="scope.column.property.split(',')[0] == 'pics'">
                      <div class="demo-image__preview">
                        <el-image
                          class="table_list_pic"
                          :src="scope.row[scope.column.property.split(',')[1]] || require('@/assets/no_touxiang.png')"
                          :preview-src-list="[scope.row[scope.column.property.split(',')[1]] || require('@/assets/no_touxiang.png')]"
                        />
                      </div>
                    </div>
                    <div v-else>
                      {{ scope.row[scope.column.property.split(',')[1]] }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :fixed="$store.getters.device !== 'mobile'?'right':false"
                  label="操作"
                  align="center"
                  width="80"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.id">
                      <el-button size="mini" type="primary" @click="selectLink(scope.row)"><i class="el-icon-edit"/>选择
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <Pagination
                :total="page_data.total"
                :page.sync="page_data.page"
                :limit.sync="page_data.limit"
                @pagination="index"
              />
            </div>

          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/components/common/Search'
import Pagination from '@/components/Pagination'
import {
  param2Obj
} from '@/utils/common'

export default {
  name: 'SiteLink',
  components: {
    Search,
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    opentype: {
      type: String,
      default: 'add'
    },
    size: {
      type: String,
      default: 'small'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      txt: '栏目面页',
      ptype: 'pageslist', // 当前菜类型 1 商品 2 文章 3 页面链接 4 自定义链接
      menu: [], // 左侧菜单类型
      list: [],
      Fields: [],
      loading: false,
      searchVisible: true,
      searchForm: [],
      searchData: {},

      page_data: {
        limit: 20,
        page: 1,
        total: 20
      },
      curpage: 0, // 当前页面
      zdyLinktype: '', // 自定义连接
      zdyLinktypeoptions: [{
        value: 'web',
        label: '网页'
      }, {
        value: 'wxapp',
        label: '小程序'
      }, {
        value: 'wxapppage',
        label: '小程序页面'
      }],
      zdyappid: '', // appid
      zdyLink: '' // 自定义连接
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.linklist()
        this.index()
        if (this.$parent.link.ptype == 'custom') {
          this.zdyLinktype = this.$parent.link.zdyLinktype
          this.zdyappid = this.$parent.link.zdyappid
          this.zdyLink = this.$parent.link.path
        }
      }
    }
  },
  methods: {
    getdata(item) {
      this.ptype = item.ptype
      this.txt = item.txt
      if (this.ptype != 'custom') {
        this.index()
      }
    },
    linklist() {
      this.$api.post('/diypagelink/linklist').then(res => {
        this.menu = res.data
      })
    },
    searchgo() {
      this.page_data.page = 1
      this.index()
    },
    index() {
      const param = {
        ptype: this.ptype,
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      Object.assign(param, this.searchData)
      Object.assign(param, param2Obj(this.$route.fullPath))
      this.loading = true

      this.$api.post('/diypagelink/index', param).then(res => {
        this.list = res.data.data
        this.page_data.total = res.data.total
        this.loading = false
        if (this.page_data.page == 1) {
          this.Fields = res.field_data.Fields
          this.searchForm = [{
            type: 'Input',
            label: '关键词',
            prop: 'keyword',
            width: '230px'
          }]
        }
      })
    },
    // 选择
    selectLink(row) {
      this.$parent.link.id = row.id
      this.$parent.link.miaoshu = '【' + this.txt + '】' + (row.title || row.name)
      this.$parent.link.ptype = this.ptype
      console.log(this.$parent.link)
      this.closeLink()
    },

    // 自定义连接
    inputLink() {
      if (this.zdyLink == '') {
        this.$message.error('请输入链接')
        return
      }
      if (this.zdyLinktype == 'web') {
        if (!this.checkURL(this.zdyLink)) {
          this.$message.error('请输入正确的链接')
          return
        }
        this.txt = '网址'
      } else if (this.zdyLinktype == 'wxapp') {
        this.txt = '小程序'
      } else if (this.zdyLinktype == 'wxapppage') {
        this.txt = '内部页面'
      }

      this.$parent.link.ptype = this.ptype
      this.$parent.link.zdyLinktype = this.zdyLinktype
      this.$parent.link.zdyappid = this.zdyappid
      this.$parent.link.miaoshu = '【' + this.txt + '】' + this.zdyLink
      this.$parent.link.path = this.zdyLink
      this.closeLink()
    },

    checkURL(URL) {
      var str = URL
      var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
      var objExp = new RegExp(Expression)
      if (objExp.test(str) == true) {
        return true
      } else {
        return false
      }
    },
    closeLink() {
      this.$parent.showSiteLink = false
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
/***连接弹窗***/
$color: #1890ff;

.icon-dialog {
  .el-dialog {
    margin-bottom: 0;
    margin-top: 4vh !important;
    display: flex;
    flex-direction: column;
    z-index: 99999;
    max-height: 92vh;
    overflow: hidden;

    .el-dialog__header {
      padding-top: 14px;
    }

    .el-dialog__body {
      overflow: hidden;
      padding: 5px 5px 0 5px !important;
      margin: 0;
    }
  }
}

.linkDialog {
  overflow: hidden;
  background: #fff;

  .linkd-box {
    display: flex;
    min-height: 600px;
  }

  .linkd-box {
    .linkd-menu {
      width: 200px;
      border-right: 1px solid #eee;

      li {
        padding: 12px;
        cursor: pointer;
        border-bottom: 1px solid #f1f1f1;
        color: #666;

        span {
          margin-right: 5px;
        }

        &.on,
        &:hover {
          color: $color;
          font-weight: bold;
        }
      }
    }

    .linkd-con {
      flex: 1;
      padding: 20px;
      height: 100%;
      overflow: hidden auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      .linkd-zdy {
        margin: 0 auto;
        margin-top: 20%;
        max-width: 90%;
        display: flex;

        .appidinput {
          margin-right: 8px;
          width: 360px;
        }

        .el-select {
          width: 280px;
          margin-right: 8px;
        }

        .el-button {
          margin-left: 12px;
        }
      }
    }
  }
}

.table_list_pic {
  width: 60px;
  vertical-align: middle;
}
</style>
