<template>
  <div>
    <el-alert title="小程序需要加以下类目" type="info" show-icon>
      <div>
        生活服务>家政服务<br>
        商家自营>3C数码
      </div>
    </el-alert>
    <div class="app-container ">

      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
        <el-tabs v-model="activeName">
          <el-tab-pane style="padding-top:10px" label="小程序订阅消息配置" name="小程序订阅消息配置">
            <el-row>
              <el-col :span="24">
                <el-form-item label="订单支付">
                  <el-input
                    v-model="form.pay_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入订单支付"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('pay_tpl')">获取</el-button>
                  <div class="help-block">用户支付完成后向用户发送消息</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="退款通知">
                  <el-input
                    v-model="form.refund_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入退款通知"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('refund_tpl')">获取</el-button>
                  <div class="help-block">用户取消订单后向用户发送消息，若订单已付款则在后台审核通过后向用户发送消息</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="订单指派通知">
                  <el-input
                    v-model="form.staff_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入订单发货"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('staff_tpl')">获取</el-button>
                  <div class="help-block">后台指派师傅后向用户发送消息</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="尾款支付通知">
                  <el-input
                    v-model="form.itional_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入尾款支付通知"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('itional_tpl')">获取</el-button>
                  <div class="help-block">如果需要支付尾款，推送给用户(服务项目允许尾款)</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="服务完成通知">
                  <el-input
                    v-model="form.complete_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入服务完成通知"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('complete_tpl')">获取</el-button>
                  <div class="help-block">服务完成，推送给用户</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="订单发货">
                  <el-input
                    v-model="form.send_tpl"
                    style="width: 600px;margin-right: 6px;"
                    auto-complete="off"
                    clearable
                    placeholder="请输入订单发货"
                  />
                  <el-button size="small" type="primary" plain @click="gettplid('send_tpl')">获取</el-button>
                  <div class="help-block">后台发货后向用户发送消息</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
          <el-button size="small" type="primary" @click="submit">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Configsubscribemessage',
  components: {},
  data() {
    return {
      form: {},
      loading: false,
      activeName: '小程序订阅消息配置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'subscribemessage'
    }).then(res => {
      this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
      this.setDefaultVal('keyword')
    })
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/config/update', this.form).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    gettplid(tpl) {
      this.$api.post('/config/getsubscribemessage', {
        tpl: tpl
      }).then(res => {
        this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
      }).catch(() => {

      })
    },
    setDefaultVal(key) {
      if (this.form[key] == null || this.form[key] == '') {
        this.form[key] = []
      }
    }
  }
}
</script>
