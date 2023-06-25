<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="送积分设置" name="送积分设置">

          <el-row>
            <el-col :span="24">
              <el-form-item label="开启统一送积分设置" prop="status">
                <el-switch v-model="form.status" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="邀请新用户">
                <el-input-number
                  v-model="form.addmember"
                  controls-position="right"
                  style="width:300px;"
                  auto-complete="off"
                  clearable
                  :min="0"
                  placeholder="邀请新用户加多少分"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="邀请分销达人">
                <el-input-number
                  v-model="form.addagent"
                  controls-position="right"
                  style="width:300px;"
                  auto-complete="off"
                  clearable
                  :min="0"
                  placeholder="邀请分销达人加多少分"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="邀请师傅入驻">
                <el-input-number
                  v-model="form.addtechnical"
                  controls-position="right"
                  style="width:300px;"
                  auto-complete="off"
                  clearable
                  :min="0"
                  placeholder="邀请师傅入驻加多少分"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="邀请商户入驻">
                <el-input-number
                  v-model="form.addstore"
                  controls-position="right"
                  style="width:300px;"
                  auto-complete="off"
                  clearable
                  :min="0"
                  placeholder="邀请商户入驻加多少分"
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
export default {
  name: 'Configpoints',
  components: {
  },
  data() {
    return {
      form: {
        addcustomer: '',
        adddongtai: '',
        upjieduan: '',
        deal: '',
        status: 0
      },
      loading: false,
      activeName: '送积分设置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'points' }).then(res => {
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
