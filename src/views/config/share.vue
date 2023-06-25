<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="佣金设置" name="佣金设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分销佣金类型">
                <el-radio-group v-model="form.price_type">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定金额</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="一层佣金">
                <el-input
                  v-model="form.first"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入一层佣金"
                >
                  <template v-if="form.price_type==0" slot="append">%</template>
                  <template v-if="form.price_type==1" slot="append">元</template>
                </el-input>
                <div class="help-block">注：一层为顾客的直接上级<br>（如果开启分销内购,分销商自己购买商品，享受一层佣金）</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="二层佣金">
                <el-input
                  v-model="form.second"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入二层佣金"
                >
                  <template v-if="form.price_type==0" slot="append">%</template>
                  <template v-if="form.price_type==1" slot="append">元</template>
                </el-input>
                <div class="help-block">注：二层为顾客的上上级</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="三层佣金">
                <el-input
                  v-model="form.third"
                  style="width:500px;"
                  auto-complete="off"
                  clearable
                  placeholder="请输入三层佣金"
                >
                  <template v-if="form.price_type==0" slot="append">%</template>
                  <template v-if="form.price_type==1" slot="append">元</template>
                </el-input>
                <div class="help-block">注：三层为顾客的上上上级</div>
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
  name: 'Configshare',
  components: {},
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '佣金设置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'share'
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
