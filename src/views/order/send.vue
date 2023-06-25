<template>
  <div>
    <el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" :before-close="closeForm"
      append-to-body @open="open">
      <el-form ref="form" :size="size" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="物流信息" prop="is_express">
              <el-radio-group v-model="form.is_express">
                <el-radio :label="1">快递</el-radio>
                <el-radio :label="0">无需物流</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="快递公司">
              <el-select v-model="form.express_code" style="width:100%" filterable clearable placeholder="请选择快递公司">
                <el-option v-for="(item,i) in expressArray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="快递单号" prop="express_no">
              <el-input v-model="form.express_no" auto-complete="off" clearable placeholder="请输入快递单号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="留言（选填）">
              <el-input v-model="form.words" type="textarea" auto-complete="off" :autosize="{ minRows: 2, maxRows: 18}"
                clearable placeholder="请输入留言（选填）" />
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
          status: 1,
          is_express:'1'
        },
        loading: false,
        rules: {
          title: [{
            required: true,
            message: '显示文字不能为空',
            trigger: 'blur'
          }]
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
        this.dialogtitle = '发货'
        this.form = this.info
      },
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true
            this.$api.post('/order/send', this.form).then(res => {
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
