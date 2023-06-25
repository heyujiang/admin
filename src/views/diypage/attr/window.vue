<template>
  <div>
    <ul class="module-attr-tab">
      <li v-for="(item, index) in tab" :key="index" :class="cur === index ? 'on' : ''" @click="cur = index">{{ item.name }}</li>
    </ul>
    <!--基础设置-->
    <template v-if="cur == 0">
      <div class="att-con-box">
        <div v-for="(item, index) in attr.list" :key="index" class="attr-nav-item">
          <div class="ht">
            <div class="t" :class="item.open ? 'on' : ''" @click="item.open = item.open ? false : true">
              图片橱窗{{ index + 1 }}
              <span class="el-icon-arrow-down" />
            </div>
            <div class="opt">
              <el-button v-if="index != 0" type="primary" icon="el-icon-arrow-up" circle @click="up(attr.list, index)" />
              <el-button v-if="index != attr.list.length - 1" type="primary" icon="el-icon-arrow-down" circle @click="down(attr.list, index)" />
              <el-button type="danger" icon="el-icon-delete" circle @click="attr.list.splice(index, 1)" />
            </div>
          </div>
          <transition name="down">
            <div v-if="item.open" class="hm">
              <AttrImg :item="item" />
              <AttrLink :link="item.link" />
            </div>
          </transition>
        </div>
        <div v-if="attr.list.length < attr.max" class="attr-nav-add" @click="addNavList">
          <span class="el-icon-circle-plus-outline" />
          最多添加{{ attr.max }}个
        </div>
      </div>
    </template>
    <!--样式设置-->
    <template v-if="cur == 1">
      <div class="att-con-box">
        <div class="att-con-pd">
          <div class="item c">
            <div class="label">上下边距：</div>
            <div class="input flex">
              <div style="width: 180px;">
                <el-input-number v-model="attr.base.paddingTop" size="mini" :min="0" />
              </div>
            </div>
          </div>
          <div class="item c">
            <div class="label">左右边距：</div>
            <div class="input flex">
              <div style="width: 180px;">
                <el-input-number v-model="attr.base.paddingLeft" size="mini" :min="0" />
              </div>
            </div>
          </div>
          <AttrBase :base="attr.base" :type="attr.type" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AttrImg from '@/views/diypage/attr/img.vue'
import AttrLink from '@/views/diypage/attr/link.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
import module from '@/utils/module.js'
export default {
  name: 'AttrWindow',
  components: { AttrImg, AttrLink, AttrBase },
  props: ['attr'],
  data() {
    return {
      tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
      cur: 0
    }
  },

  methods: {
    // 添加导航
    addNavList() {
      this.$util.addItem(this.attr.list, module.moduleBanner[0])
    },
    // 上移
    up(arr, index) {
      arr.splice(index - 1, 0, arr[index])
      arr.splice(index + 1, 1)
    },
    // 下移
    down(arr, index) {
      arr.splice(index + 2, 0, arr[index])
      arr.splice(index, 1)
    }
  }
}
</script>

<style></style>
