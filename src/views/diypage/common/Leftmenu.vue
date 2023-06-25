<template>
  <div class="left">
    <div class="pagelist">
      <!--页面-->
      <div class="left-box">
        <ul>
          <li v-for="(item,index) in pageList" :key="index">
            <div class="fl" :class="item.id==id?'on':''" @click="changePage(index)">{{ item.title }}</div>
            <div class="fr">
              <button type="button" @click="setindex(index)"><em
                :style="item.is_index?'color: #1890ff;':''"
                class="el-icon-s-home"
              /></button>
              <button type="button" @click="setaudit(index)"><em
                :style="item.is_submitaudit?'color: #1890ff;':''"
                class="el-icon-s-check"
              /></button>
              <!--<button type="button" :disabled="!item.iscopy"><em class="el-icon-copy-document" /></button>-->
              <button type="button" @click="delPage(index)"><em class="el-icon-delete" /></button>
            </div>
          </li>
        </ul>
        <div class="add-page" @click="$parent.addPage"><span class="el-icon-plus" />新建自定义页面</div>
        <section class="savebox">
          <div class="fr">
            <el-button icon="el-icon-view" @click="$parent.showPreview=true">预览</el-button>
            <el-button type="primary" icon="el-icon-circle-check" @click="$parent.save">保存</el-button>
          </div>
        </section>
      </div>
    </div>
    <!--模块-->
    <div class="leftcon">
      <div class="left-menu">
        <el-card class="el-card" shadow="never" :header-style="{border:'0px'}" :body-style="{ padding: '0px' }">
          <div class="el-card__header">
            <span>DIY组件</span>
          </div>
          <div v-for="(item, index) in list" :key="index">
            <div
              v-if="$util.checkversionisv3(item)"
              class="item"
              draggable="true"
              @click="comClick(item)"
              @dragend="dragend"
              @dragstart="dragstart(item)"
            >
              <img draggable="false" :src="$util.icon(item.pic)">
              <div class="txt">{{ item.name }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import module from '@/utils/module.js'
export default {
  name: 'Leftmenu',
  data() {
    return {
      id: 1,
      list: [], // 模块
      pagebase: {}, // 页面基础参数
      pageList: [] // 页面内容
    }
  },

  mounted() {
    // 页面组件
    this.list = module.pageData
    this.list.forEach((res, i1) => {
      if (res.base.sc) {
        res.base.sc.forEach((r, i2) => {
          r.pic = res.type + '_' + r.keys + '.png'
        })
      }
    })

    // 控件
    this.pagebase = module.pagebase
  },

  methods: {
    dragstart(item) {
      var style
      if (item.base.sc) {
        style = item.base.sc[0].keys
      }
      event.dataTransfer.setData('style', style)
      event.dataTransfer.setData('text', JSON.stringify(item))
      event.dataTransfer.effectAllowed = 'copyMove'
      this.$emit('placeholder', true)
    },

    dragend(item) {
      this.$emit('placeholder', false)
    },

    comClick(item) {
      var style
      const json = JSON.stringify(item)
      if (item.base.sc) {
        style = item.base.sc[0].keys
      }
      this.$emit('componentsClick', json, style)
    },

    // 切换页面
    changePage(index) {
      this.id = this.pageList[index].id
      this.$parent.changePage(this.id)
    },
    // 设为首页
    setindex(index) {
      this.$parent.setindex(this.pageList[index].id)
    },
    // 设为审核页
    setaudit(index) {
      this.$parent.setaudit(this.pageList[index].id)
    },
    // 删除页面
    delPage(index) {
      this.$parent.delPage(this.pageList[index].id)
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  $color: #1890ff;

  .left {
    font-size: 14px;
    width: 480px;
    display: flex;
    overflow: hidden;
    position: fixed;
    height: 100%;
    margin-top: -2px;

    .pagelist {
      border-top: 1px solid #eee;
      padding-top: 13px;
      width: 250px;
    }

    .leftcon {
      flex: 1;
      height: 100%;
      background: #fff;
      overflow-y: auto;
      position: relative;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      padding-bottom: 50px;
    }

    .leftcon::-webkit-scrollbar {
      width: 0;
    }

    .left-menu {
      padding-top: 15px;

      .el-card {
        border: 0px;
      }

      .el-card__header {
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left: 10px;
        border: 0px;
        color: #999999;
      }

      .item {
        &:hover {
          border-color: $color;
          box-shadow: #409eff 0 0 10px;
        }

        img {
          width: 60%;

        }

        .txt {
          padding-top: 5px;
          color: #666666;
        }

        cursor: move;
        text-align: center;
        padding: 10px;
        float: left;
        width: 38%;
        margin-bottom: 15px;
        margin-left: 8%;
        background: #f7f7f7;
        border: 1px solid #eee;
        border-radius: 5px;
      }
    }

    .left-box {
      ul {
        padding: 0 20px;
      }

      ul li {
        height: 45px;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-top: 12px;
        display: flex;
        background: #f7f7f7;
        padding: 0 12px;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #666;

        .fl {
          flex: 1;
          cursor: pointer;
          height: 50px;
          line-height: 50px;

          &.on {
            color: $color;
          }
        }

        .fr {
          button {
            margin: 0px;
            padding: 0px;
            background: none;
            border: 0;
            -webkit-appearance: none;

            &[disabled]:hover {
              cursor: not-allowed;

              em {
                color: #999;
                cursor: not-allowed;
              }
            }
          }

          em {
            margin-left: 8px;
            font-size: 18px;
            color: #999;
            cursor: pointer;

            &:hover {
              color: $color;
            }
          }
        }
      }

      .add-page {
        span {
          margin-right: 12px;
        }

        cursor:pointer;
        height:45px;
        border:1px solid #eee;
        margin:20px;
        font-size:14px;
        display: flex;
        align-items:center;
        justify-content:center;
        background:$color;
        color:#fff;
        border-radius:40px;
      }

      .savebox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        padding-left: 24px;
        height: 65px;
        overflow: hidden;
        position: fixed;
        z-index: 22;
        bottom: 0;
        background: #ffffff;

        .fr {
          display: flex;
          align-items: center;

          .el-button {
            margin-left: 6px;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
