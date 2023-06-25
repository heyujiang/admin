<template>
  <div>
    <div class="item c">
      <div class="label">{{ text.prompt }}：</div>
      <div class="input flex">
        <template v-if="!edit">
          <div class="input-line">
            <label class="sp1">
              <input
                class="radio"
                :checked="text.show==false"
                type="radio"
                @click="text.show=false"
              >隐藏</label>
            <label class="sp1">
              <input
                class="radio"
                :checked="text.show==true"
                type="radio"
                @click="text.show=true"
              >显示</label>
          </div>
        </template>
        <template v-if="edit">
          <div class="input-line">
            <input v-model="text.txt" type="text" :placeholder="text.prompt" maxlength="100" class="intxt">
            <label class="sp1">
              <input type="checkbox" :checked="!text.show" class="checkbox" @click="text.show = text.show ? false : true">隐藏
            </label>
          </div>
        </template>
      </div>
    </div>
    <div v-if="(text.show && edit) || (!edit && text.show)" class="item">
      <div class="label">文字样式：</div>
      <div class="input">
        <div class="input-line">
          <label class="sp1">
            <input
              class="radio"
              :checked="text.defaultstyle==false"
              type="radio"
              @click="text.defaultstyle=false"
            >默认</label>
          <label class="sp1">
            <input
              class="radio"
              :checked="text.defaultstyle==true"
              type="radio"
              @click="text.defaultstyle=true"
            >自定义</label>
        </div>
        <template v-if="text.defaultstyle">
          <div class="input-line">
            <div class="label">字体大小：</div>
            <div class="input">
              <el-select v-model="text.fontsize" placeholder="请选择">
                <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="input-line">
            <div class="label">字体设置：</div>
            <div class="input f">
              <el-tooltip effect="dark" content="颜色" placement="top"><colorPicker v-model="text.color" default-color="#333" /></el-tooltip>
              <el-tooltip effect="dark" content="加粗" placement="top">
                <div class="font" :class="text.bold ? 'on' : ''" @click="text.bold = text.bold ? false : true"><span class="iconfont icon-B" /></div>
              </el-tooltip>
              <el-tooltip effect="dark" content="斜体" placement="top">
                <div class="font" :class="text.italics ? 'on' : ''" @click="text.italics = text.italics ? false : true"><span class="iconfont icon-xieti" /></div>
              </el-tooltip>
              <el-tooltip effect="dark" content="下划线" placement="top">
                <div class="font" :class="text.underline ? 'on' : ''" @click="text.underline = text.underline ? false : true"><span class="iconfont icon-xiahuaxian1" /></div>
              </el-tooltip>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttrText',
  props: {
    text: { type: Object },
    edit: { default: true },
    ispagetitle: { default: false } // 是否标题
  },
  data() {
    return {
      fontSizeList: [
        { label: '12px', value: 12 },
        { label: '14px', value: 14 },
        { label: '16px', value: 15 },
        { label: '18px', value: 18 },
        { label: '20px', value: 20 },
        { label: '22px', value: 22 },
        { label: '24px', value: 24 },
        { label: '30px', value: 30 }
      ]
    }
  },
  watch: {
    text: {
      handler: function(newv, oldv) {
        // 如果更改的是页面标题执行
        if (this.ispagetitle) {
          this.$parent.$parent.$parent.name = newv.txt
          const pageindex = this.$parent.$parent.$parent.pageIndex
          this.$parent.$parent.$parent.pageList[pageindex].name = newv.txt
        }
      },
      deep: true
    }
  },
  mounted() {
  }
}
</script>
