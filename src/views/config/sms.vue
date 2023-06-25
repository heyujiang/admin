<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="阿里云短信接口配置" name="阿里云短信接口配置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="开启" prop="status">
                <el-switch v-model="form.status" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <block v-if="form.status==1">
            <el-row>
              <el-col :span="24">
                <el-form-item label="AccessKeyId">
                  <el-input v-model="form.AccessKeyId" auto-complete="off" clearable placeholder="请输入AccessKeyId" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="Secret">
                  <el-input v-model="form.Secret" auto-complete="off" clearable placeholder="请输入Secret" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="SignName(签名)">
                  <el-input v-model="form.SignName" auto-complete="off" clearable placeholder="请输入SignName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="TemplateCode(模板编号)">
                  <el-input
                    v-model="form.TemplateCode"
                    auto-complete="off"
                    clearable
                    placeholder="请输入TemplateCode(模板编号)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </block>
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
  name: 'Configsms',
  components: {},
  data() {
    return {
      form: {},
      loading: false,
      activeName: '阿里云短信接口配置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'sms'
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
