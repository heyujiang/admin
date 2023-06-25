<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="padding-top:10px" label="基本信息" name="基本信息">
          <el-row>
            <el-col :span="24">
              <el-form-item label="前台界面标题">
                <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入系统名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户默认像">
                <ImagesUpload size="small" file-type="image" :image.sync="form.defaultavatar" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="多客服接待方式">
                <el-radio-group v-model="form.jiedai">
                  <el-radio label="0">列表展示在线客服</el-radio>
                  <el-radio label="1">客服排队接待</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="客服消息提醒">
                <el-radio-group v-model="form.inform">
                  <el-radio label="1">开启</el-radio>
                  <el-radio label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="消息提醒方式">
                <el-radio-group v-model="form.tplmessage">
                  <el-radio label="0">普通消息(收不到普通消息的情况下会发模板消息)</el-radio>
                  <el-radio label="1">模板消息</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="聊天页面返回设置">
                <el-radio-group v-model="form.topback">
                  <el-radio label="0">返回首页</el-radio>
                  <el-radio label="1">返回所在客服组</el-radio>
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
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Configkefu',
  components: {
    ImagesUpload
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '基本信息',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'kefu' }).then(res => {
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
