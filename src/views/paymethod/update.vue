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
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="form.code=='wx_pay'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="是否服务商支付">
                <el-switch v-model="form.settings.service_pay" active-value="1" :inactive-value="0" />
                <div class="help-block">确定是服务商支付才开启，一般不要开启</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="微信支付商户号">
                <el-input v-model="form.settings.mchid" auto-complete="off" clearable placeholder="请输入微信支付商户号" />
                <div class="help-block">财付通微信支付商户号</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="微信支付密钥">
                <el-input v-model="form.settings.signkey" auto-complete="off" :maxlength="32" clearable placeholder="请输入微信支付密钥" />
                <div class="help-block">财付通商户权限密钥</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.settings.service_pay=='1'">
            <el-col :span="24">
              <el-form-item label="子商户号">
                <el-input v-model="form.settings.sub_mch_id" auto-complete="off" clearable placeholder="请输入子商户号" />
                <div class="help-block">服务商子商户号</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="apiclient_cert.pem 证书">
                <ImagesUpload size="small" is_local="1" file-type="file" :file.sync="form.settings.cert_path" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="apiclient_key.pem 证书">
                <ImagesUpload size="small" is_local="1" file-type="file" :file.sync="form.settings.key_path" />
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
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Paymethodupdate',
  components: {
    ImagesUpload
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
      PinpaiType: [],
      form: {
        title: '',
        settings: {},
        status: 1
      },
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {

    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '支付参数设置'
        this.form = this.info
      } else {
        this.dialogtitle = '添加'
        this.form = {
          title: '',
          settings: {},
          status: 1
        }

        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/paymethod/update', this.form).then(res => {
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
