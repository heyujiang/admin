<template>
  <div>
    <el-alert title="模板行业" type="info" show-icon>
      <div>
        IT科技/IT软件与服务<br>
        IT科技/互联网|电子商务
      </div>
    </el-alert>
    <div class="app-container ">
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
        <el-tabs v-model="activeName">

          <el-tab-pane style="padding-top:10px" label="公众号模板消息配置" name="公众号模板消息配置">
            <el-row>
              <el-col :span="24">
                <el-form-item label="默认ID">
                  <el-input v-model="form.default_tpl" auto-complete="off" clearable placeholder="请输入默认ID" />
                  <div class="help-block">如果其的模板没有设置，统一使用这个模板发送</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="订单支付">
                  <el-input v-model="form.pay_tpl" auto-complete="off" clearable placeholder="请输入订单支付" />
                  <div class="help-block">客户支付成功，平台师傅/管理员会收到通知(OPENTM417184616)</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="退款通知">
                  <el-input v-model="form.refund_tpl" auto-complete="off" clearable placeholder="请输入退款通知" />
                  <div class="help-block">订单退款，平台管理员会收到通知</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="平台推荐订单通知">
                  <el-input v-model="form.undertake_tpl" auto-complete="off" clearable placeholder="请输入平台推荐订单通知" />
                  <div class="help-block">有符合师傅接的单会通知(OPENTM416673651)</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="平台派单/师傅接单">
                  <el-input v-model="form.technical_tpl" auto-complete="off" clearable placeholder="请输入师傅接单" />
                  <div class="help-block">派单给师傅通知(OPENTM416673651)</div>
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
  name: 'Configmessagetpl',
  components: {
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '公众号模板消息配置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'messagetpl' }).then(res => {
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
            this.$message({ message: '操作成功', type: 'success' })
          }).catch(() => {
            this.loading = false
          })
        }
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
