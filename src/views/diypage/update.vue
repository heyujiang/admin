<template>
  <div>
    <el-dialog
      width="1320px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <div class="el-dialog-div">
        <iframe frameborder="0" name="rightFrame" scrolling="yes" :src="form.url" style="height: 92%; visibility: inherit; width:100%; z-index: 1" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Printerupdate',
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
      form: {
        title: '',
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
        this.dialogtitle = '面页设计'
        this.form = this.info
      } else {
        this.dialogtitle = '添加'
        this.form = {
          title: '',
          status: 1
        }

        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/printer/update', this.form).then(res => {
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

<style lang="scss" scoped>
  .icon-dialog{
      .el-dialog {
          margin-bottom: 0;
          margin-top: 4vh !important;
          display: flex;
          flex-direction: column;
          z-index:99999;
          max-height: 92vh;
          overflow: hidden;
          .el-dialog__header {
          padding-top: 14px;
          }
          .el-dialog__body {
              overflow: hidden;
              padding:5px 5px  0 5px !important;
              margin:0;
          }
      }
  }
 .el-dialog-div{
    height: 92vh;
     overflow: hidden;
    }
</style>
