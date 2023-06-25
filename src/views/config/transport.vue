<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">

        <el-tab-pane style="padding-top:10px" label="物流信息配置" name="物流信息配置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="快递鸟商户ID" prop="kdniao_id">
                <el-input v-model="form.kdniao_id" auto-complete="off" clearable placeholder="请输入快递鸟商户ID" />
                <div class="help-block">快递鸟用于快递实时查询，<a target="_blank" href="http://www.kdniao.com/">快递鸟接口申请</a></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="快递鸟API key" prop="kdniao_apikey">
                <el-input v-model="form.kdniao_apikey" auto-complete="off" clearable placeholder="请输入快递鸟商户ID" />
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
  name: 'Configtransport',
  components: {
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '物流信息配置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'transport' }).then(res => {
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
