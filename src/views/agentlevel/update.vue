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
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="返佣比例">
              <el-input v-model="form.return_percent" style="width:300px;" auto-complete="off" clearable placeholder="请输入返佣比例">
                <template slot="append">%</template>
              </el-input>
              <div class="help-block">在层级分销佣金的基础上再计算比例，<br>比如分销佣金是：10元;<br>设置100%就是10元，设置80%就是8元，设置120%就是12元</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="升级条件(拉新)">
              <el-input-number
                v-model="form.upgrade_pullnew"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="升级条件(拉新)"
              />
              <div class="help-block">拉新用户达到数量，即可升级</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="升级条件(分销金额)">
              <el-input v-model="form.upgrade_sales" style="width:300px;" auto-complete="off" clearable placeholder="请输入升级条件(分销金额)">
                <template slot="append">元</template>
              </el-input>
              <div class="help-block">下线用户购买总金额达到，即可升级</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="开启团队奖" prop="status">
              <el-switch v-model="form.is_teamaward" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="默认" prop="is_default">
              <el-switch v-model="form.is_default" :active-value="1" :inactive-value="0" />
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
  name: 'Agentlevelupdate',
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
          this.$api.post('/agentlevel/update', this.form).then(res => {
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
