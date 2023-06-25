<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="分销设置" name="分销设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分销层级">
                <el-radio-group v-model="form.level">
                  <el-radio label="0">不开启</el-radio>
                  <el-radio label="1">一层分销</el-radio>
                  <el-radio label="2">二层分销</el-radio>
                  <el-radio label="3">三层分销</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="分销内购">
                <el-radio-group v-model="form.is_rebate">
                  <el-radio label="0">关闭</el-radio>
                  <el-radio label="1">开启</el-radio>
                </el-radio-group>
                <div class="help-block">开启分销内购，分销商自己购买商品，享受一层佣金，上级享受二层佣金，上上级享受三层佣金</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="成为下线条件">
                <el-radio-group v-model="form.condition">
                  <el-radio label="0">首次点击链接</el-radio>
                  <el-radio label="1">首次下单</el-radio>
                  <el-radio label="2">首次付款</el-radio>
                </el-radio-group>
                <div class="help-block" hidden>首次点击分享链接： 可以自由设置分销商条件</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="成为分销达人条件">
                <el-radio-group v-model="form.share_condition">
                  <el-radio label="1">无条件（不需要申请）</el-radio>
                  <el-radio label="2">申请（需要审核）</el-radio>
                  <el-radio label="3">申请（无需审核）</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="分销申请头部图片">
                <ImagesUpload size="small" file-type="image" :image.sync="form.applypic"/>
                <div class="help-block">图片尺寸：750x300像素</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="推广海报图">
                <ImagesUpload size="small" is_local="1" file-type="image" :image.sync="form.poster"/>
                <div class="help-block">图片尺寸：600x750像素</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display: none">
            <el-col :span="24">
              <el-form-item label="提现方式">
                <el-radio-group v-model="form.pay_type">
                  <el-radio label="bank">银行卡支付</el-radio>
                  <el-radio label="wechat">微信支付</el-radio>
                  <el-radio label="alipay">支付宝支付</el-radio>
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="消费自动成为分销商">
                <el-input
                  v-model="form.auto_share_val"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入消费自动成为分销商"
                >
                  <template slot="append">元</template>
                </el-input>
                <div class="help-block">消费满指定金额(付款即生效,无需过售后)自动成为分销商，0元表示不自动</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="购买商品自动成为分销商">
                <el-radio-group v-model="form.share_good_status">
                  <el-radio label="0">关闭</el-radio>
                  <el-radio label="1">任意商品</el-radio>
                  <el-radio label="2">指定商品</el-radio>
                </el-radio-group>
                <div class="help-block">购买商品付款即生效，无需过售后</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.share_good_status==2">
            <el-col :span="24">
              <el-form-item label="填写商品的ID">
                <el-input
                  v-model="form.share_good_id"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入填写商品的ID"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户须知">
                <el-input v-model="form.content" type="textarea" auto-complete="off"
                          :autosize="{ minRows: 2, maxRows: 4}" clearable placeholder="请输入用户须知"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="申请协议">
                <el-input v-model="form.agree" type="textarea" auto-complete="off" :autosize="{ minRows: 2, maxRows: 4}"
                          clearable placeholder="请输入申请协议"
                />
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
import ImagesUpload from '@/components/common/ImagesUpload.vue'

export default {
  name: 'Configagent',
  components: {
    ImagesUpload
  },
  data() {
    return {
      form: {},
      loading: false,
      activeName: '分销设置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'agent'
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
