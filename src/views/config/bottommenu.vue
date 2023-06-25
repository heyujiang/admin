<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="底部菜单样式设置" name="底部菜单样式设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="文字颜色">
                <el-input v-model="form.color" auto-complete="off" clearable placeholder="输入文字颜色" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="选中文字颜色">
                <el-input v-model="form.selectedColor" auto-complete="off" clearable placeholder="输入选中文字颜色" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="背景颜色">
                <el-input v-model="form.backgroundColor" auto-complete="off" clearable placeholder="输入背景颜色" />
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
  name: 'Configbottommenu',
  components: {},
  data() {
    return {
      form: {
        color: '',
        selectedColor: '',
        backgroundColor: ''
      },
      loading: false,
      activeName: '底部菜单样式设置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'bottommenu' }).then(res => {
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
