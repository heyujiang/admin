<template>
  <div>
    <el-dialog
      title="查看详情"
      width="800px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <table
        class="table table-bordered"
        align="center"
        width="100%"
        style="word-break:break-all; margin-bottom:50px;  font-size:13px;"
      >
        <tbody>
          <tr>
            <td class="title" width="100">订单编号：</td>
            <td>
              {{ form.withdraw_sn }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">提现用户：</td>
            <td>
              {{ form.username }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">申请时间：</td>
            <td>
              {{ form.create_time }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">金额：</td>
            <td>
              {{ form.amounts }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">收款方式：</td>
            <td>
              {{ form.mode }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">收款帐号：</td>
            <td>
              {{ form.MemberBankcard }}
            </td>
          </tr>
        </tbody>
      </table>
      <el-form ref="form" :size="size" :model="form" :label-width="$store.getters.device !== 'mobile'?'16%':'90px'" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确定结算</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Withdrawdetail',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      loading: false
    }
  },
  watch: {
    show(val) {}
  },
  methods: {
    open() {
      this.form = this.info
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/withdraw/audit', this.form).then(res => {
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
<style>
  .image__preview {
    float: left;
  }

  .goodstext {
    float: left;
    padding-left: 10px;
    width: 200px;
  }

  .table_list_pic {
    width: 60px;
  }
</style>
