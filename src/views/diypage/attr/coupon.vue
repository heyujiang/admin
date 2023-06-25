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
              <div class="label">显示数量：</div>
              <div class="input flex">
                <el-input-number v-model="attr.max" size="mini" :min="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AttrBase from '@/views/diypage/attr/base.vue'
export default {
  name: 'AttrCoupon',
  components: { AttrBase },
  props: ['attr'],
  data() {
    return {}
  },

  methods: {
  }
}
</script>
