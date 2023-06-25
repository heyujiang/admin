<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="1000px"
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
            <el-form-item label="商品/服务">
              <div v-if="form.goods" class="ordergoodsbox">
                <el-image
                  v-if="form.goods.image"
                  class="goods_pic"
                  :src="form.goods.image"
                  :preview-src-list="[form.goods.image]"
                />
                <div class="ordergoodstext">{{ form.goods.name }}<br>￥{{ form.goods.price }}</div>
              </div>
              <div>
                <el-button size="small" type="primary" plain @click="showSelectGoods = true">选择商品</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总金额">
              {{ form.total }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="数量" prop="number">
              <el-input-number
                v-model="number"
                controls-position="right"
                style="width:200px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入数量"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" auto-complete="off" clearable placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户姓名" prop="shipping_name">
              <el-input v-model="form.shipping_name" auto-complete="off" clearable placeholder="请输入客户姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户电话" prop="shipping_tel">
              <el-input v-model="form.shipping_tel" auto-complete="off" clearable placeholder="请输入客户电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户所在地区">
              <el-cascader v-model="form.area" expand-trigger="hover" :options="areaoptions" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户地址" prop="shipping_address">
              <el-input v-model="form.shipping_address" auto-complete="off" clearable placeholder="请输入客户地址" />
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
import SelectGoods from '@/views/order/selectGoods.vue'
export default {
  name: 'Serviceadd',
  components: {
    SelectGoods
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
        status: 1
      },
      number: 1,
      loading: false,
      areaoptions: [],
      showSelectGoods: false,
      rules: {
        number: [{
          required: true,
          message: '数量不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/Area/getpcTree').then(res => {
          this.areaoptions = res.data
        })
      }
    },
    number(val) {
      this.form.number = this.number
      this.getordertotal()
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
          goods_id: 0,
          total: 0,
          number: this.number,
          goods: [],
          status: 1
        }
        // console.log(this.form);
      }
    },
    getordertotal() {
      if (this.form.goods_id) {
        this.$api.post('/order/total', this.form).then(res => {
          this.form.total = res.data.amountTotle
        })
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/order/add', this.form).then(res => {
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
  .ordergoodsbox {
    width: 100%;
    padding-bottom: 10px;
    float: left;
  }

  .goods_pic {
    width: 100px;
    vertical-align: middle;
    float: left;
  }

  .ordergoodstext {
    padding: 10px;
    float: left;
  }
</style>
