<template>
  <div>
    <!--基础设置-->
    <template>
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <AttrBase :base="attr.base" />
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
            <AttrImg :item="attr" />
            <AttrLink :link="attr.link" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AttrImg from '@/views/diypage/attr/img.vue'
import AttrLink from '@/views/diypage/attr/link.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
export default {
  name: 'AttrImageSingle',
  components: { AttrImg, AttrLink, AttrBase },
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
