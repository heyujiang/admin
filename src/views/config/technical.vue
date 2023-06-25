<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="师傅设置" name="师傅设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="师傅抢单">
                <el-radio-group v-model="form.is_pickuporder">
                  <el-radio label="0">关闭</el-radio>
                  <el-radio label="1">开启</el-radio>
                </el-radio-group>
                <div class="help-block">开启后，师傅可以手机端抢单</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="默认返佣比例">
                <el-input v-model="form.return_percent" style="width:500px;" auto-complete="off" clearable placeholder="请输入默认佣金比例">
                  <template slot="append">%</template>
                </el-input>
                <div class="help-block">注：如果商家/服务点的师傅，返佣比例需要减去商家的返佣比例。比如：师傅返佣是60%,商家返佣10%,最终商家的师傅返佣50%</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display:none;">
            <el-col :span="24">
              <el-form-item label="提现方式">
                <el-radio-group v-model="form.pay_type">
                  <el-radio label="bank">银行卡</el-radio>
                  <el-radio label="wechat">微信支付</el-radio>
                  <el-radio label="alipay">支付宝</el-radio>
                  <el-radio label="remaining_sum">提现到余额</el-radio>
                </el-radio-group>
                <div class="help-block">微信自动支付，需要申请微信支付的企业付款到零钱功能</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="最少提现额度">
                <el-input
                  v-model="form.min_money"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入最少提现额度"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="每日提现上限">
                <el-input
                  v-model="form.cash_max_day"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入每日提现上限"
                >
                  <template slot="append">元</template>
                </el-input>
                <div class="help-block">0元表示不限制每日提现金额</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="提现手续费">
                <el-input
                  v-model="form.cash_service_charge"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入提现手续费"
                >
                  <template slot="append">%</template>
                </el-input>
                <div class="help-block">0表示不设置提现手续费
                  <span class="text-danger">提现手续费额外从提现中扣除</span><br>
                  例如：<span class="text-danger">10%</span>的提现手续费：<br>
                  提现<span class="text-danger">100</span>元，扣除手续费<span class="text-danger">10</span>元，
                  实际到手<span class="text-danger">90</span>元
                </div>
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
</template>
<script>
export default {
  name: 'Configtechnical',
  components: {},
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '师傅设置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'technical'
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
    setDefaultVal(key) {
      if (this.form[key] == null || this.form[key] == '') {
        this.form[key] = []
      }
    }
  }
}
</script>
