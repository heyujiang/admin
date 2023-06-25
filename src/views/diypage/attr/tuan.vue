<template>
  <div>
    <ul class="module-attr-tab">
      <li v-for="(item, index) in tab" :key="index" :class="cur === index ? 'on' : ''" @click="cur = index">
        {{ item.name }}
      </li>
    </ul>
    <!--基础设置-->
    <template v-if="cur == 0">
      <div class="att-con-box">
        <div class="att-con-pd">
          <div class="item">
            <div class="label">来源：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.source=='choice'"
                    type="radio"
                    @click="attr.base.source='choice'"
                  >
                  手动选择
                </label>
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.source=='auto'"
                    type="radio"
                    @click="attr.base.source='auto'"
                  >
                  自动选择
                </label>
              </div>
            </div>
          </div>
          <div v-if="attr.base.source=='auto'">
            <div class="item">
              <div class="label">排序：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.goodsSort=='all'"
                      type="radio"
                      @click="attr.base.auto.goodsSort='all'"
                    >
                    综合
                  </label>
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.goodsSort=='sales'"
                      type="radio"
                      @click="attr.base.auto.goodsSort='sales'"
                    >
                    销量
                  </label>
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.goodsSort=='price'"
                      type="radio"
                      @click="attr.base.auto.goodsSort='price'"
                    >
                    价格
                  </label>
                </div>
              </div>
            </div>
            <div class="item c">
              <div class="label">显示数量：</div>
              <div class="input flex">
                <input
                  v-model="attr.base.auto.showNum"
                  type="number"
                  placeholder="显示数量"
                  maxlength="100"
                  class="intxt"
                  style="width: 180px;"
                >
              </div>
            </div>
          </div>

          <div v-if="attr.base.source=='choice'">
            <div v-for="(item, index) in attr.list" :key="index" class="attr-nav-item">
              <div class="ht">
                <div class="t" :class="item.open ? 'on' : ''" @click="item.open = item.open ? false : true">
                  商品{{ index + 1 }}
                  <span class="el-icon-arrow-down" />
                </div>
                <div class="opt">
                  <el-button
                    v-if="index != 0"
                    type="primary"
                    icon="el-icon-arrow-up"
                    circle
                    @click="up(attr.list, index)"
                  />
                  <el-button
                    v-if="index != attr.list.length - 1"
                    type="primary"
                    icon="el-icon-arrow-down"
                    circle
                    @click="down(attr.list, index)"
                  />
                  <el-button type="danger" icon="el-icon-delete" circle @click="attr.list.splice(index, 1)" />
                </div>
              </div>
              <transition name="down">
                <div v-if="item.open" class="hm">
                  <div class="tuan">
                    <img :src="item.cm.image" alt="">
                    <div class="text">
                      <p class="p1">{{ item.cm.name }}</p>
                      <p v-if="item.cm.currencyCouponList && item.cm.type == 1">
                        ￥{{ item.cm.currencyCouponList[0].decreaseMoney }} 无门槛</p>
                      <p v-if="item.cm.type == 2">{{ item.cm.priceDescribe }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div v-if="attr.list.length < attr.max" class="attr-nav-add" @click="showSelectTuan = true">
              <span class="el-icon-circle-plus-outline" />
              最多添加{{ attr.max }}个
            </div>
          </div>
        </div>

      </div>
    </template>
    <!--样式设置-->
    <template v-if="cur == 1">
      <div class="att-con-box">
        <div class="att-con-pd">
          <AttrText :text="attr.title.title" />
          <AttrText :text="attr.title.more" />
          <AttrBase :base="attr.base" />
          <div class="item c">
            <div class="label">上下边距：</div>
            <div class="input flex">
              <div style="width: 180px;">
                <el-input-number v-model="attr.base.paddingTop" size="mini" :min="0" />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">分列数量：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.column==1"
                    type="radio"
                    @click="attr.base.column = 1"
                  >
                  一列
                </label>
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.column==2"
                    type="radio"
                    @click="attr.base.column = 2"
                  >
                  两列
                </label>
                <label class="sp1">
                  <input
                    class="radio"
                    :checked="attr.base.column==3"
                    type="radio"
                    @click="attr.base.column = 3"
                  >
                  三列
                </label>
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
          <AttrText :text="attr.base.text" :edit="false" />
          <div class="item">
            <div class="label">显示内容：</div>
            <div class="input">
              <div class="input-line">
                <label class="sp2"><input
                  type="checkbox"
                  :checked="attr.base.sjg"
                  class="checkbox"
                  @click="attr.base.sjg = attr.base.sjg ? false : true"
                >商品价格</label>
                <label class="sp2"><input
                  type="checkbox"
                  :checked="attr.base.sgm"
                  class="checkbox"
                  @click="attr.base.sgm = attr.base.sgm ? false : true"
                >购买按钮</label>
              </div>
              <div class="input-line">
                <label class="sp2"><input
                  type="checkbox"
                  :checked="attr.base.sth"
                  class="checkbox"
                  @click="attr.base.sth = attr.base.sth ? false : true"
                >商品特惠</label>
                <label class="sp2"><input
                  type="checkbox"
                  :checked="attr.base.sjs"
                  class="checkbox"
                  @click="attr.base.sjs = attr.base.sjs ? false : true"
                >结束时间</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!--添加商品弹窗-->
    <SelectTuan :show.sync="showSelectTuan" size="small" />
  </div>
</template>

<script>
import AttrText from '@/views/diypage/attr/text.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
import SelectTuan from '@/views/diypage/attr/selectTuan.vue'
export default {
  name: 'AttrTuan',
  components: {
    AttrText,
    AttrBase,
    SelectTuan
  },
  props: ['attr'],
  data() {
    return {
      tab: [{
        name: '基础设置',
        content: ''
      }, {
        name: '样式设置',
        content: ''
      }],
      cur: 0,
      categoryoptions: [],
      showSelectTuan: false
    }
  },
  created() {
    this.$api.post('/Category/getTree').then(res => {
      this.categoryoptions = res.data
    })
  },
  methods: {
    // 上移
    up(arr, index) {
      arr.splice(index - 1, 0, arr[index])
      arr.splice(index + 1, 1)
    },
    // 下移
    down(arr, index) {
      arr.splice(index + 2, 0, arr[index])
      arr.splice(index, 1)
    },
    normalizer(data) {
      if (data.children && !data.children.length) {
        delete data.children
      }
      return {
        id: data.val,
        label: data.key,
        children: data.children
      }
    }
  }
}
</script>

<style></style>
