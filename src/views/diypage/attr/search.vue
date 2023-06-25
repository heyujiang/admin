<template>
  <div>
    <!--基础设置-->
    <template>
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <div class="item c">
              <div class="label">提示文字：</div>
              <div class="input flex">
                <input v-model="attr.params.placeholder" type="text" placeholder="提示文字" maxlength="100" class="intxt" style="width: 220px;">
              </div>
            </div>

            <div class="item">
              <div class="label">位置：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.is_location == 0" type="radio" @click="attr.base.is_location = 0">
                    隐藏
                  </label>
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.is_location == 1" type="radio" @click="attr.base.is_location = 1">
                    城市
                  </label>
                  <label class="sp2">
                    <input class="radio" :checked="attr.base.is_location == 2" type="radio" @click="attr.base.is_location = 2">
                    社区
                  </label>
                </div>
              </div>
            </div>

            <div class="item">
              <div class="label">热搜：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.is_hotkey == 0" type="radio" @click="attr.base.is_hotkey = 0">
                    隐藏
                  </label>
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.is_hotkey == 1" type="radio" @click="attr.base.is_hotkey = 1">
                    显示
                  </label>
                </div>
              </div>
            </div>
            <template v-if="attr.base.is_hotkey==1">
              <div class="item c">
                <div class="label">热搜关键词：</div>
                <div class="input flex">
                  <input v-model="attr.params.hotkey" type="text" placeholder="热搜" maxlength="100" class="intxt" style="width: 220px;">
                </div>
              </div>
              <div class="item c">
                <div class="label">热搜文字色：</div>
                <div class="input f">
                  <el-tooltip effect="dark" content="颜色" placement="top">
                    <colorPicker v-model="attr.base.hotkeytxtColor" default-color="#333" />
                  </el-tooltip>
                </div>
              </div>
            </template>
            <div class="item">
              <div class="label">搜索框样式：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input class="radio" :name="attr.base.searchStyle" :checked="attr.base.searchStyle == ''" type="radio" @click="attr.base.searchStyle = ''">
                    方形
                  </label>
                  <label class="sp1">
                    <input class="radio" :name="attr.base.searchStyle" :checked="attr.base.searchStyle == 'radius'" type="radio" @click="attr.base.searchStyle = 'radius'">
                    圆角
                  </label>
                  <label class="sp1">
                    <input class="radio" :name="attr.base.searchStyle" :checked="attr.base.searchStyle == 'round'" type="radio" @click="attr.base.searchStyle = 'round'">
                    圆弧
                  </label>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="label">文字对齐：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input class="radio" :name="attr.base.textAlign" :checked="attr.base.textAlign == 'left'" type="radio" @click="attr.base.textAlign = 'left'">
                    居左
                  </label>
                  <label class="sp1">
                    <input class="radio" :name="attr.base.textAlign" :checked="attr.base.textAlign == 'center'" type="radio" @click="attr.base.textAlign = 'center'">
                    居中
                  </label>
                  <label class="sp1">
                    <input class="radio" :name="attr.base.textAlign" :checked="attr.base.textAlign == 'right'" type="radio" @click="attr.base.textAlign = 'right'">
                    居右
                  </label>
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

import AttrBase from '@/views/diypage/attr/base.vue'
export default {
  name: 'AttrSearch',
  components: { AttrBase },
  props: ['attr'],
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>
