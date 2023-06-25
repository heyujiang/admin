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
            <div class="item c">
              <div class="label">分类：</div>
              <div class="input flex">
                <Treeselect
                  v-model="attr.base.auto.category"
                  :default-expand-level="1"
                  :options="categoryoptions"
                  :normalizer="normalizer"
                  :show-count="true"
                  z-index="999999"
                  placeholder="请选择分类"
                />
              </div>
            </div>
            <div class="item">
              <div class="label">排序：</div>
              <div class="input">
                <div class="input-line">
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.Sort=='all'"
                      type="radio"
                      @click="attr.base.auto.Sort='all'"
                    >
                    综合
                  </label>
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.Sort=='service_times'"
                      type="radio"
                      @click="attr.base.auto.Sort='service_times'"
                    >
                    服务次数
                  </label>
                  <label class="sp1">
                    <input
                      class="radio"
                      :checked="attr.base.auto.Sort=='create_time'"
                      type="radio"
                      @click="attr.base.auto.Sort='create_time'"
                    >
                    入驻时间
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
                  师傅{{ index + 1 }}
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
                  <div class="technical">
                    <img :src="item.cm.touxiang" alt="">
                    <div class="text">
                      <p class="p1">{{ item.cm.title }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div v-if="attr.list.length < attr.max" class="attr-nav-add" @click="showSelectTechnical = true">
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
        </div>
      </div>
    </template>

    <!--添加师傅弹窗-->
    <SelectTechnical :show.sync="showSelectTechnical" size="small" />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import AttrText from '@/views/diypage/attr/text.vue'
import AttrBase from '@/views/diypage/attr/base.vue'
import SelectTechnical from '@/views/diypage/attr/selectTechnical.vue'
export default {
  name: 'AttrTechnical',
  components: {
    Treeselect,
    AttrText,
    AttrBase,
    SelectTechnical
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
      showSelectTechnical: false
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
