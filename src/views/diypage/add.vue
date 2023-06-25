<template>
  <div>
    <el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" :before-close="closeForm"
      append-to-body @open="open">
      <el-form ref="form" :size="size" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="页面名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入页面名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设为首页">
              <el-switch v-model="form.is_index" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
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
    name: 'diypageadd',
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
        this.dialogtitle = '添加'
        this.form = {
          title: '',
          status: 1
        };
      },
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true
            this.$api.post('/diypage/update', this.form).then(res => {
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
