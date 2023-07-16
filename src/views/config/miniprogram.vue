<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="主小程序配置" name="主小程序配置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="原始ID">
                <el-input v-model="form.original" auto-complete="off" clearable placeholder="请输入原始ID" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="AppId">
                <el-input v-model="form.app_id" auto-complete="off" clearable placeholder="请输入AppId" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="AppSecret">
                <el-input v-model="form.secret" auto-complete="off" clearable placeholder="请输入AppSecret" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="uniacid 和 acid">
                {{ form.weid }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

         <el-tab-pane style="padding-top:10px" label="抖音小程序配置" name="抖音小程序配置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="AppId">
                <el-input v-model="form.ttapp_id" auto-complete="off" clearable placeholder="请输入AppId" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Secret">
                <el-input v-model="form.ttsecret" auto-complete="off" clearable placeholder="请输入Secret" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- <el-tab-pane style="padding-top:10px" label="师傅端小程序配置" name="师傅端小程序配置"> -->
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="原始ID">
                <el-input v-model="form.techoriginal" auto-complete="off" clearable placeholder="请输入原始ID" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="AppId">
                <el-input v-model="form.techapp_id" auto-complete="off" clearable placeholder="请输入AppId" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="AppSecret">
                <el-input v-model="form.techsecret" auto-complete="off" clearable placeholder="请输入AppSecret" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="uniacid 和 acid">
                {{ form.weid }}
              </el-form-item>
            </el-col>
          </el-row> -->
        <!-- </el-tab-pane> -->
      </el-tabs>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Configminiprogram',
  components: {
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '主小程序配置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'miniprogram' }).then(res => {
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
