<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="900px"
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
        :label-width="$store.getters.device !== 'mobile'?'20%':'90px'"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="开始业绩">
              <el-input-number
                v-model="form.beginamount"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入开始业绩"
              />
              <div class="help-block">团队业绩达到这个金额即可以拿到这个佣金</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="最高业绩">
              <el-input-number
                v-model="form.endamount"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入最高业绩"
              />
              <div class="help-block">团队人业绩到这个金额即可以拿到这个佣金</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="返佣比例">
              <el-input v-model="form.percent" style="width:300px;" auto-complete="off" clearable placeholder="请输入返佣比例">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
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
  name: 'Agentteamawardupdate',
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
        name: [{
          required: true,
          message: '名称不能为空',
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
        this.dialogtitle = '修改'
        this.form = this.info
      } else {
        this.dialogtitle = '添加'
        this.form = {
          type: 1,
          status: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/agentteamaward/update', this.form).then(res => {
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
