<template>
  <div>
    <ul class="module-attr-tab">
      <li v-for="(item, index) in tab" :key="index" :class="cur === index ? 'on' : ''" @click="cur = index">{{
          item.name
        }}
      </li>
    </ul>
    <!--基础设置-->
    <template v-if="cur == 0">
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <AttrText :text="attr.title"/>
            <AttrImg :item="attr"/>
            <AttrLink :link="attr.link"/>
            <div class="item flex c">
              <div class="label">短文描述：</div>
              <div class="input">
                <el-input v-model="attr.note.txt" type="textarea" maxlength="500" :rows="4" placeholder="请输入内容"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--样式设置-->
    <template v-if="cur == 1">
      <div class="att-con-box">
        <div class="att-con-pd">
          <AttrBase :base="attr.base"/>
          <AttrText :text="attr.note" :edit="false"/>
          <div class="item">
            <div class="label">模块间隙：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp1">
                  <input class="radio" :name="attr.base.margin" :checked="!attr.base.margin" type="radio"
                         @click="attr.base.margin = false"
                  >
                  隐藏
                </label>
                <label class="sp1">
                  <input class="radio" :name="attr.base.margin" :checked="attr.base.margin" type="radio"
                         @click="attr.base.margin = true"
                  >
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

export default {
  name: 'AttrTuwen',
  components: { AttrText, AttrImg, AttrLink, AttrBase },
  props: ['attr'],
  data() {
    return {
      tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
      cur: 0
    }
  },

  methods: {}
}
</script>

<style></style>
