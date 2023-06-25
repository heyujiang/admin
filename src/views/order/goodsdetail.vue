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
            <td class="title" width="100">地址：</td>
            <td>
              <div>联系人：{{ form.orderInfo.shipping_name }} {{ form.orderInfo.shipping_tel }}</div>
              <div>地 址：{{ form.orderInfo.shipping_province_name}} {{ form.orderInfo.shipping_city_name}}{{ form.orderInfo.shipping_district_name}} {{ form.orderInfo.shipping_address	 }}</div>
            </td>
          </tr>
          <tr>
            <td class="title" width="100">商品：</td>
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
        </tbody>
      </table>
      <el-form
        ref="form"
        :size="size"
        :model="form"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'"
      />
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
      console.log(this.form)
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
          this.$api.post('/order/send', this.form).then(res => {
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
