<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="1080px"
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="关联商品">
              <div>
                <span v-if="form.goods"><el-image
                  v-if="form.goods.image"
                  class="goods_pic"
                  :src="form.goods.image"
                  :preview-src-list="[form.goods.image]"
                /></span> <el-button size="small" type="primary" plain @click="showSelectGoods = true">选择商品</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称">
              {{ form.title }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.attribute.length">
          <el-col :span="24">
            <el-form-item label="规格">
              <SkuForm
                :show="form.attribute.length>0"
                :disabled="true"
                :source-attribute.sync="form.sourceAttribute"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="秒杀价格" prop="price">
              <el-input v-model="form.price" auto-complete="off" clearable placeholder="请输入价格" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="开始时间" prop="begin_date">
              <el-date-picker
                v-model="form.begin_date"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="结速时间">
              <el-date-picker
                v-model="form.end_date"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="限单" prop="buy_limit">
              <el-input-number
                v-model="form.buy_limit"
                controls-position="right"
                style="width:200px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入限单数量"
              />
              <div class="help-block">限制出售多少单 ，0为不限制。</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="限购" prop="buy_max">
              <el-input-number
                v-model="form.buy_max"
                controls-position="right"
                style="width:200px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入限购数量"
              />
              <div class="help-block">限制每单购买数量 ，0为不限制。</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确 定</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加商品弹窗-->
    <SelectGoods :show.sync="showSelectGoods" size="small" />
  </div>
</template>
<script>
import SelectGoods from '@/views/miaoshagoods/selectGoods.vue'
import ImagesUpload from '@/components/common/ImagesUpload.vue'
import SkuForm from '@/components/common/SkuForm.vue'
export default {
  name: 'Miaoshagoodsupdate',
  components: { SelectGoods, ImagesUpload, SkuForm },
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
        attribute: [],
        sourceAttribute: [],
        status: 1
      },
      loading: false,
      showSelectGoods: false,
      rules: {
        price: [{
          required: true,
          message: '请填写价格',
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
      }]
    }
  },
  watch: {
    show(val) {
    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
        this.form = this.info
      } else {
        this.dialogtitle = '添加'
        this.form = {
          sort: 100,
          goods_id: 0,
          goods: [],
          attribute: [],
          sourceAttribute: [],
          status: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/miaoshagoods/update', this.form).then(res => {
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
    }
  }
}
</script>
<style scoped>
  .goods_pic {
    width: 100px;
    vertical-align: middle;
  }
</style>
