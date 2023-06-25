<template>
  <div>
    <!--基础设置-->
    <template>
      <div class="att-con-box">
        <div class="attr-nav-item">
          <div class="att-con-pd">
            <div class="item c">
              <div class="label">页面标题：</div>
              <div class="input flex">
                <input v-model="attr.params.title" type="text" placeholder="页面标题" maxlength="100" class="intxt"
                  style="width: 220px;">
              </div>
            </div>
            <div class="item c">
              <div class="label">分享标题：</div>
              <div class="input flex">
                <input v-model="attr.params.share_title" type="text" placeholder="分享标题" maxlength="100" class="intxt"
                  style="width: 220px;">
              </div>
            </div>
            <div class="item">
              <div class="label">标题栏文字：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.titleTextColor == '#000000'" type="radio"
                      @click="attr.base.titleTextColor = '#000000'">
                    黑色
                  </label>
                  <label class="sp1">
                    <input class="radio" :checked="attr.base.titleTextColor == '#ffffff'" type="radio"
                      @click="attr.base.titleTextColor = '#ffffff'">
                    白色
                  </label>
                </div>
              </div>
            </div>
            <div class="item c">
              <div class="label">头部背景：</div>
              <div class="input f">
                <el-tooltip effect="dark" content="颜色" placement="top">
                  <colorPicker v-model="attr.base.titleBackgroundColor" default-color="#333" />
                </el-tooltip>
              </div>
            </div>
            <AttrBase name="内容区背景" :base="attr.base" :type="attr.type" />
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
    name: 'AttrConHead',
    components: {
      AttrText,
      AttrBase
    },
    props: ['attr'],
    data() {
      return {}
    },

    methods: {}
  }
</script>
