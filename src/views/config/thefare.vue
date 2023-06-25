<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="上门服务车费设置" name="上门服务车费设置">
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
                <el-form-item label="起步距离" prop="startkm">
                  <el-input v-model="form.startkm" style="width:300px;" auto-complete="off" clearable placeholder="请输入起步距离">
                    <template slot="append">公里</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="起步价" prop="startat">
                  <el-input v-model="form.startat" style="width:300px;" auto-complete="off" clearable placeholder="请输入起步价">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="里程单价" prop="mileageprice">
                  <el-input v-model="form.mileageprice" style="width:300px;" auto-complete="off" clearable placeholder="请输入里程单价">
                    <template slot="append">元/公里</template>
                  </el-input>
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
  name: 'Configthefare',
  components: {},
  data() {
    return {
      form: {},
      loading: false,
      activeName: '上门服务车费设置',
      rules: {}
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', {
      mo: 'thefare'
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
