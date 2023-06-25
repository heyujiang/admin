<template>
  <div>
    <ul class="module-attr-tab">
      <li v-for="(item, index) in tab" :key="index" :class="cur === index ? 'on' : ''" @click="cur = index">{{ item.name }}</li>
    </ul>
    <!--基础设置-->
    <template v-if="cur == 0">
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <AttrImg :item="attr" title="视频封面：" />
            <div class="item c">
              <div class="label">视频地址：</div>
              <div class="input flex">
                <input v-model="attr.videoUrl" type="text" placeholder="视频地址" class="intxt" style="width: 220px;">
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
          <div class="item c">
            <div class="label">上下边距：</div>
            <div class="input flex">
              <div style="width: 180px;">
                <el-input-number v-model="attr.base.paddingTop" size="mini" :min="0" />
              </div>
            </div>
          </div>
          <div class="item c">
            <div class="label">视频高度：</div>
            <div class="input flex">
              <div style="width: 180px;">
                <el-input-number v-model="attr.base.height" size="mini" :min="10" />
              </div>
            </div>
          </div>
          <AttrBase :base="attr.base" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AttrImg from '@/views/diypage/attr/img.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
export default {
  name: 'AttrVideo',
  components: { AttrImg, AttrBase },
  props: ['attr'],
  data() {
    return {
      tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
      cur: 0
    }
  },

  methods: {
  }
}
</script>

<style></style>
