<template>
  <div class="page">
    <!--组件部分-->
    <Leftmenu ref="left" @componentsClick="componentsClick" @placeholder="placeholderFun" />

    <!--内容部份-->
    <div class="appdiy-module-container">
      <!--页面标题-->
      <div v-for="(item,index) in pagebase" :key="index">
        <conTitle v-if="item.type==1" :params="item" />
      </div>
      <div
        ref="editorWrapper"
        class="appdiy-module"
        @dragover.prevent
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover="dragovers"
        @drop="drops"
      >
        <div v-for="(item,index) in pagebase" :key="index">
          <moduleBg v-if="item.type==1" :base="item.base" />
        </div>

        <div v-show="placeholder" class="placeholder" :data-index="0">放在这里</div>
        <!--DIY组件部份-->
        <Module
          ref="module"
          :modulelist="modulelist"
          @moduleClick="moduleClick"
          @moduleMouseovers="moduleMouseovers"
          @moduleMouseout="moduleMouseout"
        />
        <div v-if="modulelist.length == 0 && !placeholder" class="appdiy-nomodule">
          <h2>拖动或点击左侧模块进行页面DIY</h2>
        </div>
      </div>

      <!--操作-->
      <ul
        v-if="showOption && modulelist.length > 0"
        class="appdiy-module-option"
        :style="'top:' + optionTop + 'px'"
        @mouseenter="showOption = true"
        @mouseleave="showOption = false"
      >
        <li v-if="modulelist.length != 1 && activeIndex != 0" @click="up">
          <el-tooltip effect="dark" content="上移" placement="right"><span class="el-icon-top" /></el-tooltip>
        </li>
        <li @click="modulelist.splice(activeIndex, 1)">
          <el-tooltip effect="dark" content="删除" placement="right"><span class="el-icon-close" /></el-tooltip>
        </li>
        <li @click="copy">
          <el-tooltip effect="dark" content="复制" placement="right"><span class="el-icon-document-copy" />
          </el-tooltip>
        </li>
        <li v-if="modulelist.length != 1 && activeIndex != modulelist.length - 1" @click="down">
          <el-tooltip effect="dark" content="下移" placement="right"><span class="el-icon-bottom" /></el-tooltip>
        </li>
      </ul>
    </div>

    <!--模块属性-->
    <transition name="right">
      <Attr v-if="showAttr" :attr="curAttrData" />
    </transition>
    <!--控件属性-->
    <transition name="right">
      <conAttr v-if="showConAttr" :attr="conAttrData" />
    </transition>
    <!--预览-->
    <Preview :modulelist="modulelist" :pagebase="pagebase" :show.sync="showPreview" size="small" />
    <el-dialog title="提示" :visible.sync="saveConfirm" width="30%" center>
      <span>是否需要保存之前页面操作？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveConfirm = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import Leftmenu from '@/views/diypage/common/Leftmenu.vue'
import Module from '@/views/diypage/common/Module.vue'
import Attr from '@/views/diypage/common/Attr.vue'
import conAttr from '@/views/diypage/common/conAttr.vue'
import conTitle from '@/views/diypage/module/contitle.vue'
import moduleBg from '@/views/diypage/module/bg.vue'
import Preview from '@/views/diypage/preview.vue'
import '@/assets/diy/css/diy.scss'
import moduledata from '@/utils/module.js'
import {
  confirm
} from '@/utils/common'
export default {
  components: {
    moduleBg,
    Leftmenu,
    Module,
    Attr,
    conAttr,
    conTitle,
    Preview
  },
  data() {
    return {
      id: '', // 页面ID
      title: '', // 页面名称
      pageIndex: 0, // 当前页面
      pageList: [], // 页面数据
      activeIndex: '', // 移上去模块
      selectIndex: '', // 选中模块
      placeholder: false, // 显示空白区域
      showOption: false, // 显示操作按钮
      optionTop: 0, // 操作按钮距离顶部
      modulelist: [], // 组件列表
      initpagebase: [], // 初始化页面参数
      pagebase: [], // 页面参数
      showAttr: true, // 显示模块属性
      showConAttr: true, // 显示控件属性
      curAttrData: [], // 当前属性数据
      conAttrData: [], // 当前控件属性数据
      saveData: [], // 保存数据
      saveConfirm: false,
      showPreview: false // 显示预览
    }
  },

  mounted() {
    this.initPage()
  },
  methods: {

    // 初始化页面
    initPage() {
      this.$api.post('/diypage/getpageInfo').then(res => {
        if (res.data) {
          this.pageList = res.data
        } else {
          const initpagebase = JSON.stringify(moduledata.pagebase)
          const pagebase = []
          pagebase.push(JSON.parse(initpagebase))

          this.pageList.push({
            modulelist: [],
            pagebase: pagebase,
            title: '自定义页面1',
            id: 1,
            iscopy: true,
            isdel: true
          })
        }
        this.$refs.left.pageList = this.pageList
        this.modulelist = this.pageList[this.pageIndex].modulelist
        this.pagebase = this.pageList[this.pageIndex].pagebase
        this.title = this.pageList[this.pageIndex].title
        this.pagebase[0].params.title = this.title
        this.conAttrData = this.pagebase[0]
      })
    },

    // 左侧组件点击
    componentsClick(json, style) {
      const that = this
      const item = JSON.parse(json)
      item.base.style = style
      this.pageList[this.pageIndex].modulelist.push(item)
      this.$nextTick(() => {
        if (this.$refs.editorWrapper) {
          that.$util.scrollTop(this.$refs.editorWrapper, this.$refs.editorWrapper.scrollHeight, 500)
        }
      })
    },

    // 空白区域
    placeholderFun(flag) {
      this.placeholder = flag
      this.$refs.module.placeholder = flag
    },

    // 当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上
    dragenter(event) {
      // 拖动到容器的“放到这里（它是个提示）”盒子，就给盒子加上焦点样式
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.add('on')
      }
    },

    // 当拖动的元素或文本选择离开有效的放置目标时将触发该事件。此事件作用在目标元素上（具体请看 html5 DataTransfer对象）
    dragleave(event) {
      // 离开目标容器的“放到这里（它是个提示）”盒子，就给盒子移除焦点样式
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('on')
      }
    },

    // 拖拽元素在目标元素上移动的时候触发的事件
    dragovers(event) {
      event.preventDefault()
    },

    // 拖拽组件区域元素的事件drop 被拖拽的元素在目标元素上同时鼠标放开触发的事件
    drops(event) {
      const style = event.dataTransfer.getData('style') // 获取样式
      const data = JSON.parse(event.dataTransfer.getData('text')) // 获取dragstart事件传递的参数
      data.base.style = style
      this.placeholder = false
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('on')
      }
      event.dataTransfer.clearData() // 清除dragstart事件传递的参数
      if (this.pageList[this.pageIndex].modulelist.length === 0) {
        this.pageList[this.pageIndex].modulelist.push(data)
      } else if (event.target.classList.contains('placeholder')) {
        const index = event.target.getAttribute('data-index')
        this.pageList[this.pageIndex].modulelist.splice(index, 0, data)
      }
    },

    // 模块获取焦点，显示操作按钮
    moduleMouseovers(item) {
      this.optionTop = item.top - 60
      this.showOption = true
      this.activeIndex = item.index
    },

    // 容器失去焦点，隐藏按钮区域
    moduleMouseout() {
      this.showOption = false
    },

    // 上移
    up() {
      this.modulelist.splice(this.activeIndex - 1, 0, this.modulelist[this.activeIndex])
      this.modulelist.splice(this.activeIndex + 1, 1)
      this.selectIndex = this.activeIndex - 1
      this.showOption = false
    },

    // 下移
    down() {
      this.modulelist.splice(this.activeIndex + 2, 0, this.modulelist[this.activeIndex])
      this.modulelist.splice(this.activeIndex, 1)
      this.showOption = false
    },

    // 复制模块
    copy() {
      const item = JSON.stringify(this.modulelist[this.activeIndex])
      this.modulelist.push(JSON.parse(item))
    },

    // 组件点击
    moduleClick(index) {
      this.selectIndex = index
      this.showConAttr = false
      this.curAttrData = this.modulelist[this.selectIndex]
    },

    // 控件点击显示属性
    pagebaseClick(type) {
      this.showConAttr = true
      this.conAttrData = this.pagebase[0]
    },

    // 关闭属性
    closeAttr() {
      this.showConAttr = false
    },

    // 保存
    save() {
      // console.log(this.pageList);
      var _this = this
      _this.$api.post('/diypage/update', {
        pageList: _this.pageList
      }).then(res => {
        _this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    // 切换页面
    changePage(id) {
      this.modulelist = []
      this.pagebase = {}
      this.pageList.forEach((res, index) => {
        if (res.id == id) {
          this.id = res.id
          this.title = res.title
          this.pageIndex = index
          this.modulelist = res.modulelist
          this.pagebase = res.pagebase
        }
      }, this)
      this.pagebase[0].params.title = this.title
    },

    // 新增页面
    addPage() {
      var _this = this
      const initpagebase = JSON.stringify(moduledata.pagebase)
      const pagebase = []
      pagebase.push(JSON.parse(initpagebase))

      _this.$api.post('/diypage/add', { pagebase: pagebase }).then(res => {
        const id = res.data
        _this.pageList.push({
          modulelist: [],
          pagebase: pagebase,
          title: '自定义页面' + id,
          id: id,
          iscopy: true,
          isdel: true
        })
        _this.$refs.left.pageList = _this.pageList
      })
    },
    // 设为首页
    setindex(id) {
      var _this = this
      _this.$api.post('/diypage/setindex', {
        id: id
      }).then(res => {
        _this.initPage()
        _this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    // 设为审核页
    setaudit(id) {
      var _this = this
      _this.$api.post('/diypage/setaudit', {
        id: id
      }).then(res => {
        _this.initPage()
        _this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    // 切换页面
    delPage(id) {
      var _this = this

      if (_this.pageList.length > 1) {
        confirm({
          content: '确定要删除页面吗？'
        }).then(() => {
          _this.$api.post('/diypage/delete', {
            id: id
          }).then(res => {
            _this.initPage()
          })
        }).catch(() => {})
      } else {
        _this.$message({
          message: '不能删除最后一个页面！',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style scoped="scoped" lang="scss">

</style>
<style lang="scss">
  $color:#1890ff;

  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
  }

  ul,
  li,
  dl,
  dd {
    list-style-type: none;
  }

  *:focus {
    outline: none;
  }

  img {
    max-width: 100%;
  }

  .radio {
    margin-right: 6px;
    position: relative;
    width: 16px;
    height: 16px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .radio:checked,
  .radio.on {
    border-color: $color;
    background: $color url(../../assets/diy/gou.png) no-repeat center;
    background-size: 9px auto;
  }

  .checkbox {
    position: relative;
    width: 16px;
    margin-right: 6px;
    height: 16px;
    background: #fff;
    border-radius: 2px;
    -webkit-appearance: none;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .checkbox:checked {
    border-color: $color;
    background: $color url(../../assets/diy/gou.png) no-repeat center;
    background-size: 10px auto;
  }

  /***渐渐右向左动画***/
  .right-enter-active {
    animation: fadeRight 0.3s cubic-bezier(.17, .84, .44, 1);
  }

  .right-leave-active {
    animation: fadeOutRight 0.3s cubic-bezier(.17, .84, .44, 1);
  }

  @keyframes fadeRight {
    0% {
      transform: translateX(100%)
    }

    100% {
      transform: translateX(0%);
    }
  }

  @keyframes fadeOutRight {
    0% {
      transform: translateX(0)
    }

    100% {
      transform: translateX(100%)
    }
  }

  /***向上动画***/
  .down-enter-active {
    animation: down1 0.3s cubic-bezier(.17, .84, .44, 1);
  }

  .down-leave-active {
    animation: down2 0s cubic-bezier(.17, .84, .44, 1);
  }

  @keyframes down1 {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes down2 {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }

    100% {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  /***放大动画***/
  .scale-enter-active {
    animation: scale22 0.4s cubic-bezier(.17, .84, .44, 1);
  }

  .scale-leave-active {
    animation: scale21 0.3s cubic-bezier(.17, .84, .44, 1);
  }

  @keyframes scale22 {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }

    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale21 {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    30% {
      transform: scale(1.05);
      opacity: 0.8
    }

    100% {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  /***渐渐显示动画***/
  .mask-enter-active {
    animation: fadeIn 0.3s;
  }

  .mask-leave-active {
    animation: fadeOut 0.3s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1
    }

    100% {
      opacity: 0;
    }
  }

  .nodata {
    text-align: center;
    color: #bfbfbf;
    padding: 100px 0;

    img {
      width: 150px;
    }
  }
</style>
<style scoped="scoped" lang="scss">
  .page {
    background: #f1f1f1;
  }

  @import '@/assets/diy/css/diy.scss';
</style>
