<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">

        <el-tab-pane style="padding-top:10px" label="分类样式设置" name="分类样式设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分类样式">
                <el-radio-group v-model="form.categorystyle">
                  <el-radio label="1">分类展示1</el-radio>
                  <el-radio label="2">分类展示2</el-radio>
                  <el-radio label="3">分类展示3</el-radio>
                  <el-radio label="4">分类展示4</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane style="padding-top:10px" label="发布需求分类样式设置" name="发布需求分类样式设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="发布需求分类样式">
                <el-radio-group v-model="form.pubCategorystyle">
                  <el-radio label="1">分类展示1</el-radio>
                  <el-radio label="2">分类展示2</el-radio>
                </el-radio-group>
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
  name: 'Configcategorystyle',
  components: {
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '分类样式设置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'categorystyle' }).then(res => {
      this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
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
