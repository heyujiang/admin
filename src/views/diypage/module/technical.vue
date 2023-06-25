<template>
  <div class="module-item-technical" style="margin-top:0">
    <div :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <div class="item-technical-con" :style="style">
        <moduleBg :base="module.base" />
        <div class="item-technical" :class="'style'+module.base.column">
          <template v-if="module.base.source=='auto'">
            <div class="item">
              <div class="pic">
                <img :src="$util.icon('img.jpg')" alt="">
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" name="此处显示师傅名称" />
                </div>
              </div>
            </div>
            <div class="item">
              <div class="pic">
                <img :src="$util.icon('img.jpg')" alt="">
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" name="此处显示师傅名称" />
                </div>
              </div>
            </div>
          </template>
          <template v-if="module.base.source=='choice'">
            <div
              v-for="(item, index) in module.list"
              :key="index"
              class="item"
              @click="$util.openAttr(module.list,index)"
            >
              <div class="pic">
                <img :src="item.cm.touxiang" alt="">
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" :name="item.cm.title" />
                </div>
              </div>
            </div>
            <div v-if="module.list.length == 0" class="noadd">
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="addTechnical">添加师傅</el-button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!--添加师傅弹窗-->
    <SelectTechnical :show.sync="showSelectTechnical" size="small" />
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
import moduleText from '@/views/diypage/module/text.vue'
import SelectTechnical from '@/views/diypage/attr/selectTechnical.vue'
export default {
  components: {
    moduleBg,
    moduleText,
    SelectTechnical
  },
  props: ['module'],
  data() {
    return {
      showSelectTechnical: false
    }
  },

  computed: {
    style() {
      if (this.module.base.fc != '') {
        return `color:${this.module.base.fc}`
      } else {
        return ''
      }
    }
  },

  mounted() {},
  methods: {
    showtime(item) {
      const time = item.endTime - item.startTime
      if (time < 0) {
        return '活动已结束'
      }
      const re = this.$util.timeformat(time)
      return `${re.day}天${re.hour}时${re.minute}分${re.second}秒`
    },

    addTechnical() {
      if (!this.$parent.prev) {
        this.showSelectTechnical = true
      }
    }

  }
}
</script>
