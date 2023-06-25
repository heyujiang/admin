<template>
  <div>
    <el-dialog
      title="派单"
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
                {{ form.orderInfo.total }}
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
                    <div>数量：{{ item.quantity }}</div>
                    <div>小计：{{ item.total }}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <el-row v-if="!form.sid">
          <el-col :span="24">
            <el-form-item label="指派给">
              <el-radio-group v-model="form.orderInfo.sendto" style="padding-left: 10px;">
                <el-radio :label="1">商家/门店</el-radio>
                <el-radio :label="2">师傅</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!form.sid && form.orderInfo.sendto==1">
          <el-col :span="24">
            <el-form-item label="商家">
              <el-select
                v-model="form.orderInfo.sid"
                style="width:100%"
                filterable
                clearable
                placeholder="请选择"
                @change="changeOnMainPersonBB"
              >
                <el-option v-for="(item,i) in sidarray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!form.sid && form.orderInfo.sendto==2">
          <el-col :span="24">
            <el-form-item label="师傅">
              <el-select v-model="form.uuid" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in technical" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.sid">
          <el-col :span="24">
            <el-form-item label="派单给师傅">
              <el-select v-model="form.siduuid" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in technical" :key="i" :label="item.key" :value="item.val" />
              </el-select>
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
export default {
  name: 'Orderdetail',
  components: {
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
      loading: false,
      sidarray: {},
      technical: {}
    }
  },
  watch: {
    show(val) {
    }
  },
  methods: {
    open() {
      this.form = this.info
      this.sidarray = this.form.sidarray
      this.technical = this.form.technical
    },
    changeOnMainPersonBB(sid) {
      this.$api.post('/order/getTechnical', { sid: sid }).then(res => {
        this.technical = res.data.technical
      })
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/order/staff', this.form).then(res => {
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
  }

  .goodstext {
    float: left;
    padding-left: 10px;
    width: 200px;
  }

  .table_list_pic {
    width: 60px;
  }
</style>
