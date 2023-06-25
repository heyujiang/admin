<template>
  <div>
    <el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" :before-close="closeForm"
      append-to-body @open="open">
      <el-form ref="form" :size="size" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
        <table class="table table-bordered" align="center" width="100%"
          style="word-break:break-all; margin-bottom:50px;  font-size:13px;">
          <tbody>
            <tr>
              <td class="title" width="100">支付凭证：</td>
              <td>
                <img :src="form.offline_img.image" width="600" />
              </td>
            </tr>
            <tr>
              <td class="title" width="100">备注：</td>
              <td>
                {{ form.offline_img.remark}}
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确认收款</span>
          <span v-else>处 理  中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'Articleupdate',
    components: {},
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
        expressArray: [],
        form: {
         offline_img:{}
        },
        loading: false,
        rules: {
        }
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$api.post('/order/getExpress').then(res => {
            this.expressArray = res.data.expressArray
          })
        }
      }
    },
    methods: {
      open() {
        this.dialogtitle = '支付凭证'
        this.form = this.info
      },
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true
            this.$api.post('/order/offlinepay', this.form).then(res => {
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
