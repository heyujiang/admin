<template>
  <div>
    <!--基础设置-->
    <template>
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <AttrText :text="attr.text" />
            <div class="item c">
              <div class="label">上下边距：</div>
              <div class="input flex">
                <div style="width: 180px;">
                  <el-input-number v-model="attr.base.paddingTop" size="mini" :min="0" />
                </div>
              </div>
            </div>
            <AttrBase :base="attr.base" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import AttrText from '@/views/diypage/attr/text.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
export default {
  name: 'AttrNotice',
  components: { AttrText, AttrBase },
  props: ['attr'],
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style></style>
