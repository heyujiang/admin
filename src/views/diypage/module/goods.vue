<template>
  <div class="module-item-goods" style="margin-top:0">
    <div :style="'padding:' + module.base.paddingTop + 'px 0;'">
      <div class="item-goods-con" :style="style">
        <moduleBg :base="module.base" />
        <moduleTitle v-if="module.title.title.show" :title="module.title" />
        <div class="item-goods" :class="'style'+module.base.column">
          <template v-if="module.base.source=='auto'">
            <div class="item">
              <div class="pic">
                <img :src="$util.icon('img.jpg')" alt="">
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" name="此处显示商品名称" />
                </div>
                <div v-if="module.base.sjg || module.base.sgm" class="price">
                  <template v-if="module.base.sjg">
                    <span>
                      <b>￥999</b>
                      <i>￥1000</i>
                    </span>
                  </template>
                  <template v-if="module.base.sgm">
                    <label>立即预约</label>
                  </template>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="pic">
                <img :src="$util.icon('img.jpg')" alt="">
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" name="此处显示商品名称" />
                </div>
                <div v-if="module.base.sjg || module.base.sgm" class="price">
                  <template v-if="module.base.sjg">
                    <span>
                      <b>￥999</b>
                      <i>￥1000</i>
                    </span>
                  </template>
                  <template v-if="module.base.sgm">
                    <label>立即预约</label>
                  </template>
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
                <img :src="item.cm.image" alt="">
                <template v-if="module.base.sth">
                  <span v-if="item.cm.isPreferential === 1">特惠</span>
                  <span v-if="item.cm.isBuyGive === 1">买赠</span>
                </template>
              </div>
              <div class="c">
                <div v-if="module.base.text.show" class="tit">
                  <moduleText :text="module.base.text" :name="item.cm.name" />
                </div>
                <div v-if="module.base.sjg || module.base.sgm" class="price">
                  <template v-if="module.base.sjg">
                    <span>
                      <b>￥{{ item.cm.price }}</b>
                      <i v-if="item.cm.original_price">￥{{ item.cm.original_price }}</i>
                    </span>
                  </template>
                  <template v-if="module.base.sgm">
                    <label v-if="item.cm.quantity > 0">立即预约</label>
                    <label v-if="item.cm.quantity <= 0" style="background:#aaa">已抢完</label>
                  </template>
                </div>
                <template v-if="module.base.sjs">
                  <p v-if="item.cm.startTime" class="ju">距离活动结束:{{ showtime(item.cm) }}</p>
                  <p v-else class="ju">距离活动开始：{{ showtime(item.cm) }}</p>
                </template>
              </div>
            </div>
            <div v-if="module.list.length == 0" class="noadd">
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="addGoods">添加商品</el-button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!--添加商品弹窗-->
    <SelectGoods :show.sync="showSelectGoods" size="small" />
  </div>
</template>

<script>
import moduleBg from '@/views/diypage/module/bg.vue'
import moduleText from '@/views/diypage/module/text.vue'
import SelectGoods from '@/views/diypage/attr/selectGoods.vue'
export default {
  components: {
    moduleBg,
    moduleText,
    SelectGoods
  },
  props: ['module'],
  data() {
    return {
      showSelectGoods: false
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

    addGoods() {
      if (!this.$parent.prev) {
        this.showSelectGoods = true
      }
    }

  }
}
</script>
