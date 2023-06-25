<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">

        <el-tab-pane style="padding-top:10px" label="AI舌诊配置" name="AI舌诊配置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="APPID" prop="app_id">
                <el-input v-model="form.app_id" auto-complete="off" clearable placeholder="请输入APPID" />
                <div class="help-block">AI舌诊<a target="_blank" href="https://www.shbayes.com/">接口申请</a></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="API key" prop="apikey">
                <el-input v-model="form.apikey" auto-complete="off" clearable placeholder="请输入API key" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="价格" prop="price">
                <el-input v-model="form.price" auto-complete="off" clearable placeholder="请输入价格" />
                <div class="help-block">一次多少钱</div>
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
  name: 'Configtongue',
  components: {
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: 'AI舌诊配置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'tongue' }).then(res => {
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
