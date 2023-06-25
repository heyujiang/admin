<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="1200px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <el-form
        ref="form"
        :size="size"
        :model="form"
        :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane style="padding-top:10px" label="基本信息" name="基本信息">
            <el-row>
              <el-col :span="24">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name" auto-complete="off" clearable placeholder="请输入名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="分类" prop="cat_id">
                  <Treeselect
                    v-model="form.cat_id"
                    :default-expand-level="1"
                    :options="cidarray"
                    :normalizer="normalizer"
                    :show-count="true"
                    z-index="999999"
                    placeholder="请选择所分类"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="图片" prop="images">
                  <ImagesUpload size="small" file-type="images" :images.sync="form.images" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="纯积分兑换商品">
                  <el-switch v-model="form.is_points_goods" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.is_points_goods!=1">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="价格" prop="price">
                    <el-input v-model="form.price" auto-complete="off" clearable placeholder="请输入价格" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="原价" prop="original_price">
                    <el-input v-model="form.original_price" auto-complete="off" clearable placeholder="请输入原价" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="库存" prop="quantity">
                  <el-input-number
                    v-model="form.quantity"
                    controls-position="right"
                    style="width:200px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="请输入库存"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="兑换所需积分">
                  <el-input-number
                    v-model="form.pay_points"
                    controls-position="right"
                    style="width:200px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="兑换所需积分"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.is_points_goods!=1">
              <el-col :span="24">
                <el-form-item label="能抵扣的金额">
                  <el-input-number
                    v-model="form.points_price"
                    controls-position="right"
                    style="width:200px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="能抵扣的金额"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="购买得积分">
                  <el-input v-model="form.points" style="width:500px;" auto-complete="off" clearable placeholder="请输入">
                    <template slot="append"><span v-if="!form.points_method">%</span><span v-else>积分</span>
                      <el-radio-group v-model="form.points_method" style="padding-left: 10px;">
                        <el-radio :label="0">金额百分比</el-radio>
                        <el-radio :label="1">固定积分</el-radio>
                      </el-radio-group></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="排序">
                  <el-input-number
                    v-model="form.sort"
                    controls-position="right"
                    style="width:200px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="排序"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="详情" name="详情">
            <el-row>
              <el-col :span="24">
                <el-form-item label="详情" prop="description">
                  <WangEditor v-if="show" :wang-editor-content.sync="form.description" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="视频" name="视频">
            <el-row>
              <el-col :span="24">
                <el-form-item label="视频上传">
                  <ImagesUpload size="small" file-type="file" :file.sync="form.videourl" />
                  <div class="help-block">支持格试：mp4,3gp,m3u8</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="视频(网络地址)">
                  <el-input v-model="form.videourl" auto-complete="off" clearable placeholder="视频" />
                  <div class="help-block">如果视频已上传到服务，请复制连接填写到这里</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="规格/选项" name="规格/选项">
            <el-row>
              <el-col :span="24">
                <el-form-item label="多规格同时下单">
                  <el-switch v-model="form.is_skumore" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <SkuForm
                  :show="show"
                  :source-attribute="form.sourceAttribute"
                  :structure="structure"
                  :attribute.sync="form.attribute"
                  :sku.sync="form.sku"
                  :theme="theme"
                >
                  <template #image="slotProps">
                    <div class="image-upload-container">
                      <ImagesUpload size="small" file-type="image" :image.sync="slotProps.row.image" />
                    </div>
                  </template>
                </SkuForm>
              </el-col>
              <!--<el-col>
                <el-divider content-position="left">sku 数据</el-divider>
                <pre><code>{{ sku }}</code></pre>
              </el-col>-->
            </el-row>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="分销佣金设置" name="分销佣金设置">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否独立分销佣金">
                  <el-switch v-model="form.is_share_charges" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.is_share_charges==1">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="分销佣金类型">
                    <el-radio-group v-model="form.charges_method">
                      <el-radio :label="0">百分比</el-radio>
                      <el-radio :label="1">固定金额</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-for="(item,i) in form.sharecharges" :key="i">
                <el-col :span="24">
                  <el-form-item :label="item.title">
                    <el-input v-model="item.price" style="width:500px;" auto-complete="off" clearable placeholder="请输入">
                      <template v-if="form.charges_method==0" slot="append">%</template>
                      <template v-if="form.charges_method==1" slot="append">元</template>
                    </el-input>
                    <div class="help-block">{{ item.help_block }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="会员价格设置" name="会员价格设置">
            <el-row>
              <el-col :span="24">
                <el-form-item label="开启会员价格">
                  <el-switch v-model="form.is_member_discount" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.is_member_discount==1">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="折扣方式">
                    <el-radio-group v-model="form.member_discount_method">
                      <el-radio :label="0">百分比</el-radio>
                      <el-radio :label="1">固定金额</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-for="(item,i) in form.MemberGroup" :key="i">
                <el-col :span="24">
                  <el-form-item :label="item.title">
                    <el-input v-model="item.price" style="width:500px;" auto-complete="off" clearable placeholder="请输入">
                      <template v-if="form.member_discount_method==0" slot="append">%</template>
                      <template v-if="form.member_discount_method==1" slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane style="padding-top:10px" label="其他信息" name="其他信息">
            <el-row>
              <el-col :span="24">
                <el-form-item label="型号">
                  <el-input v-model="form.model" auto-complete="off" clearable placeholder="请输入型号" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="重量">
                  <el-input v-model="form.weight" style="width:500px;" auto-complete="off" clearable placeholder="请输入重量">
                    <template slot="append">千克（KG）</template>
                  </el-input>
                  <div class="help-block">重量跟物流费挂勾</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="库存单位">
                  <el-input v-model="form.quantity_unit" auto-complete="off" clearable placeholder="请输入库存单位" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="销量基数">
                  <el-input-number
                    v-model="form.sale_count_base"
                    controls-position="right"
                    style="width:300px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="请输入销量基数"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="点击量基数">
                  <el-input-number
                    v-model="form.viewed_base"
                    controls-position="right"
                    style="width:300px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="请输入点击量基数"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="产品所在地">
                  <el-input v-model="form.location" auto-complete="off" clearable placeholder="请输入产品所在地" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="联系电话">
                  <el-input v-model="form.tel" auto-complete="off" clearable placeholder="请输入联系电话" />
                  <div class="help-block">填写了电话后，客户电话咨询购买</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="最小起订数目">
                  <el-input-number
                    v-model="form.minimum"
                    controls-position="right"
                    style="width:300px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="请输入最小起订数目"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确 定</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ImagesUpload from '@/components/common/ImagesUpload.vue'
import WangEditor from '@/components/common/WangEditor.vue'
import SkuForm from '@/components/common/SkuForm.vue'
export default {
  name: 'Goodsupdate',
  components: {
    Treeselect,
    WangEditor,
    ImagesUpload,
    SkuForm
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    opentype: {
      type: String,
      default: 'add'
    },
    size: {
      type: String,
      default: 'small'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {

      dialogtitle: '',
      form: {
        title: '',
        sourceAttribute: [],
        attribute: [],
        sku: [],
        status: 1
      },
      cidarray: [],
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '显示文字不能为空',
          trigger: 'blur'
        }]
      },
      theme: 2,
      structure: [{
        name: 'image',
        type: 'slot',
        label: '图片'
      }, {
        name: 'price',
        type: 'input',
        label: '价格'
      }, {
        name: 'quantity',
        type: 'input',
        label: '库存'
      }],
      activeName: '基本信息'
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/goods/getField', { ptype: 1 }).then(res => {
          this.cidarray = res.data.cidarray
        })
      }
    }
  },
  methods: {
    open() {
      this.activeName = '基本信息'
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
      } else {
        this.dialogtitle = '添加'
      }
      this.form = this.info
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/goods/update', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$emit('refesh_list')
            this.closeForm()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    closeForm() {
      this.$emit('update:show', false)
      this.loading = false
      if (this.$refs['form'] !== undefined) {
        this.$refs['form'].resetFields()
      }
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
