<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="800px"
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
        :label-width="$store.getters.device !== 'mobile'?'20%':'90px'"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否查看价格" prop="is_lookprice">
              <el-switch v-model="form.is_lookprice" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="商品购买权限" prop="is_buyright">
              <el-switch v-model="form.is_buyright" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会员折扣百分比" prop="discount">
              <el-input v-model="form.discount" style="width:300px;" auto-complete="off" clearable placeholder="请输入会员折扣">
                <template slot="append">%</template>
              </el-input>
              <div class="help-block">0为不打折</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="升级价格" prop="upgrademoney">
              <el-input v-model="form.upgrademoney" auto-complete="off" clearable placeholder="请输入升级价格" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="购买送优惠券">
              <el-select v-model="form.coupon_id" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in couponarray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="购买送优惠券数量">
              <el-input-number
                v-model="form.number"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="累计消费升级" prop="upgrade_consumption">
              <el-input
                v-model="form.upgrade_consumption"
                style="width:300px;"
                auto-complete="off"
                clearable
                placeholder="请输入累计消费升级"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="直推多少人升级">
              <el-input-number
                v-model="form.upgrade_invitation"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="购买指定商品升级">
              <div>
                <span v-if="form.upgrade_goods">
                  <el-image
                    v-if="form.upgrade_goods.image"
                    class="goods_pic"
                    :src="form.upgrade_goods.image"
                    :preview-src-list="[form.upgrade_goods.image]"
                  />
                </span>
                <el-button size="small" type="primary" plain @click="showSelectGoods = true">选择商品</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="自动升级条件">
              <el-radio-group v-model="form.auto_upgrade_where">
                <el-radio :label="1">直推/累计消费/购买指定商品，任意一项</el-radio>
                <el-radio :label="2">直推并累计消费</el-radio>
                <el-radio :label="3">直推并购买指定商品</el-radio>
                <el-radio :label="4">累计消费并购买指定商品</el-radio>
                <el-radio :label="5">直推并累计消费并购买指定商品</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                auto-complete="off"
                :autosize="{ minRows: 2, maxRows: 4}"
                clearable
                placeholder="请输入描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="默认" prop="is_default">
              <el-switch v-model="form.is_default" :active-value="1" :inactive-value="0" />
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
import SelectGoods from '@/views/memberauthgroup/selectGoods.vue'
export default {
  name: 'Memberauthgroupupdate',
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
      couponarray: [],
      loading: false,
      showSelectGoods: false,
      rules: {
        title: [{
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/memberauthgroup/getField', {
          ptype: 1
        }).then(res => {
          this.couponarray = res.data.couponarray
        })
      }
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
          is_lookprice: 1,
          status: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/memberauthgroup/update', this.form).then(res => {
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
