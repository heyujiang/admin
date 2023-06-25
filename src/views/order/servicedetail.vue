<template>
  <div>
    <el-dialog
      title="查看详情"
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
        :label-width="$store.getters.device !== 'mobile'?'18%':'90px'"
      >
        <table
          class="table table-bordered"
          align="center"
          width="100%"
          style="word-break:break-all; margin-bottom:50px;  font-size:13px;"
        >
          <tbody>
            <tr>
              <td class="title" width="100">订单编号：</td>
              <td>
                {{ form.orderInfo.order_num_alias }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">下单用户：</td>
              <td>
                {{ form.orderInfo.member.nickname }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">下单时间：</td>
              <td>
                {{ form.orderInfo.create_time }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">预约时间：</td>
              <td>
                {{ form.orderInfo.ServiceTime }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">订单状态：</td>
              <td>
                {{ form.orderInfo.orderStatus.name_yuyue }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">支付方式：</td>
              <td>
                {{ form.orderInfo.paymethod.title }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">支付时间：</td>
              <td>
                {{ form.orderInfo.pay_time }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">订单金额：</td>
              <td>
                <el-input v-model="form.orderInfo.total" auto-complete="off" clearable placeholder="请输入订单金额" />
              </td>
            </tr>
            <tr>
              <td class="title" width="100">服务地址：</td>
              <td>
                <div>联系人：{{ form.orderInfo.shipping_name }} {{ form.orderInfo.shipping_tel }}</div>
                <div>地 址：{{ form.orderInfo.shipping_province }}{{ form.orderInfo.shipping_city }}{{ form.orderInfo.shipping_district }}{{ form.orderInfo.shipping_address }}</div>
              </td>
            </tr>
            <tr>
              <td class="title" width="100">订购的服务：</td>
              <td>
                <div v-for="(item, index) in form.goods" :key="index">
                  <div class="image__preview">
                    <el-image
                      v-if="item.image"
                      class="table_list_pic"
                      :src="item.image"
                      :preview-src-list="[item.image]"
                    />
                  </div>
                  <div class="goodstext">
                    <div>{{ item.name+'\n' }}</div>
                    <div v-if="item.sku">{{ item.sku+'\n' }}</div>
                    <div>数量：{{ item.quantity }}</div>
                    <div>小计：{{ item.total }}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="title" width="100">订单备注：</td>
              <td>
                <div>{{ form.orderInfo.remark }}</div>
                <div v-for="(scr, index) in form.orderInfo.OrderImage" :key="index">
                  <div class="image__preview">
                    <el-image
                      v-if="scr"
                      class="table_list_pic"
                      :src="scr"
                      :preview-src-list="[scr]"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="form.orderInfo.video_src">
              <td class="title" width="100">视频：</td>
              <td>
                <a style="color: red" target="_blank" :href="form.orderInfo.video_src">点击查看</a>
              </td>
            </tr>
          </tbody>
        </table>
        <el-row v-for="(item, index) in form.fields" :key="index">
          <el-col v-if="item.inputtype === 'text'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-input
                v-model="item.fieldsvalue"
                auto-complete="off"
                clearable
                :placeholder="'请输入'+item.viewmingcheng"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'textarea'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-input
                v-model="item.fieldsvalue"
                type="textarea"
                auto-complete="off"
                :autosize="{ minRows: 2, maxRows: 18}"
                clearable
                :placeholder="'请输入'+item.viewmingcheng"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'pics'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <ImagesUpload size="small" file-type="image" :image.sync="item.fieldsvalue" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'select'" :span="24">
            <el-form-item v-if="item.fieldsmingcheng==='province_id'" :label="item.viewmingcheng">
              <el-cascader v-model="item.fieldsvalue" expand-trigger="hover" :options="areaoptions" />
            </el-form-item>
            <el-form-item v-else :label="item.viewmingcheng">
              <el-select v-model="item.fieldsvalue" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in item.selectvaluearray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'radio'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-radio-group v-model="item.fieldsvalue">
                <el-radio v-for="(item,i) in item.selectvaluearray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'switch'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-switch v-model="item.fieldsvalue" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'date'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-date-picker v-model="item.fieldsvalue" type="datetime" placeholder="选择时间" />
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
  </div>
</template>
<script>
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Orderdetail',
  components: {
    ImagesUpload
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        orderInfo: {
          orderStatus: {},
          address: {},
          paymethod: {},
          member: {}
        }
      },
      loading: false
    }
  },
  watch: {
    show(val) {
    }
  },
  methods: {
    open() {
      this.form = this.info
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/order/update', this.form).then(res => {
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
<style>
  .image__preview {
    float: left;
    padding-right: 5px;
  }

  .goodstext {
    float: left;
    padding-left: 5px;
    width: 200px;
  }

  .table_list_pic {
    width: 60px;
  }
</style>
