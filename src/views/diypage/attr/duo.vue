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
              多功能图文{{ index + 1 }}
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
              <AttrText :text="item.text" />
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
          <AttrBase :base="attr.base" :type="attr.type" />
          <div class="item c">
            <div class="label">模块排列：</div>
            <div class="input">
              <div class="input-line">
                <el-select v-model="attr.base.column" placeholder="请选择排列">
                  <el-option label="1列" value="1" />
                  <el-option label="2列" value="2" />
                  <el-option label="3列" value="3" />
                  <el-option label="4列" value="4" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">显示类型：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.display=='list'"
                    type="radio"
                    @click="attr.base.display = 'list'"
                  >
                  列表平铺
                </label>
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.display=='slide'"
                    type="radio"
                    @click="attr.base.display = 'slide'"
                  >
                  横向滑动
                </label>
              </div>
            </div>
          </div>
          <div class="item c">
            <div class="label">图片圆角：</div>
            <div class="input flex">
              <el-input-number v-model="attr.base.borderradius" size="mini" :max="50" :min="0" /> %
            </div>
          </div>
          <div class="item c">
            <div class="label mg">文字颜色：</div>
            <div class="input">
              <el-tooltip effect="dark" content="颜色" placement="top"><colorPicker v-model="attr.base.fc" :default-color="attr.base.fc" /></el-tooltip>
            </div>
          </div>
          <div class="item">
            <div class="label">模块间隙：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp1">
                  <input class="radio" :name="attr.base.margin" :checked="!attr.base.margin" type="radio" @click="attr.base.margin = false">
                  隐藏
                </label>
                <label class="sp1">
                  <input class="radio" :name="attr.base.margin" :checked="attr.base.margin" type="radio" @click="attr.base.margin = true">
                  显示
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AttrText from '@/views/diypage/attr/text.vue'
import AttrImg from '@/views/diypage/attr/img.vue'
import AttrLink from '@/views/diypage/attr/link.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
import module from '@/utils/module.js'
export default {
  name: 'AttrDuo',
  components: { AttrText, AttrImg, AttrLink, AttrBase },
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
      this.$util.addItem(this.attr.list, module.moduleDuo[0])
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
