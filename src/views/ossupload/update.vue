<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="800px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <el-form
        ref="form"
        :size="size"
        :model="form"
        :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'20%':'130px'"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item>
              {{form.title}}OSS设置
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="form.code=='qiniuyun'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="AK(Accesskey)">
                <el-input v-model="form.settings.qny_oss_accessKey" auto-complete="off" clearable placeholder="请输入Accesskey" />
                <div class="help-block">用于签名的公钥</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="SK(Secretkey)">
                <el-input v-model="form.settings.qny_oss_secretKey" auto-complete="off" clearable placeholder="请输入Secretkey" />
                <div class="help-block">用于签名的私钥</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Bucket(空间名称)">
                <el-input v-model="form.settings.qny_oss_bucket" auto-complete="off" clearable placeholder="请输入Bucket" />
                <div class="help-block">请保证bucket为可公共读取的</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Url(域名)">
                <el-input v-model="form.settings.qny_oss_domain" auto-complete="off" clearable placeholder="请输入Url" />
                <div class="help-block">完整的域名(开头有http://)</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="form.code=='ali'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="Access Key ID">
                <el-input v-model="form.settings.ali_oss_accessKeyId" auto-complete="off" clearable placeholder="请输入Access Key ID" />
                <div class="help-block">Access Key ID是您访问阿里云API的密钥，具有该账户完全的权限，请您妥善保管。</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Access Key Secret">
                <el-input v-model="form.settings.ali_oss_accessKeySecret" auto-complete="off" clearable placeholder="请输入Access Key Secret" />
                <div class="help-block">Access Key Secret是您访问阿里云API的密钥，具有该账户完全的权限，请您妥善保管。(填写完Access Key ID 和 Access Key Secret 后请选择bucket)</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Bucket(空间名称)">
                <el-input v-model="form.settings.ali_oss_bucket" auto-complete="off" clearable placeholder="请输入Bucket" />
                <div class="help-block">请保证bucket为可公共读取的</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Url(域名)">
                <el-input v-model="form.settings.ali_oss_endpoint" auto-complete="off" clearable placeholder="请输入Url" />
                <div class="help-block">完整的域名(开头有http://)</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确 定</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'ossuploadupdate',
  components: {
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    opentype: {
      type: String,
      default: 'add'
    },
    size: {
      type: String,
      default: 'small'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      dialogtitle: '',
      form: {
        title: '',
        settings: {},
        status: 1
      },
      loading: false,
      rules: {
      }
    }
  },
  watch: {
    show(val) {
    }
  },
  methods: {
    open() {
      this.dialogtitle = '参数配置'
      this.form = this.info
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/ossupload/update', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$emit('refesh_list')
            this.closeForm()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    closeForm() {
      this.$emit('update:show', false)
      this.loading = false
      if (this.$refs['form'] !== undefined) {
        this.$refs['form'].resetFields()
      }
    }
  }
}
</script>
