<template>
  <div>
    <el-dialog :title="dialogtitle" width="900px" class="icon-dialog" :visible.sync="show" :before-close="closeForm"
      append-to-body @open="open">
      <el-form ref="form" :size="size" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'20%':'90px'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分红比例">
              <el-input v-model="form.return_percent" style="width:300px;" auto-complete="off" clearable placeholder="请输入分红比例">
                <template slot="append">%</template>
              </el-input>
              <div class="help-block">比如销售：1000元;<br>设置10%就是100元，设置8%就是80元</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分红时间1按天2按周3按月4按季5按年">
              <el-radio-group v-model="form.periodtime">
                <el-radio label="1">按天</el-radio>
                <el-radio label="2">按周</el-radio>
                <el-radio label="3">按月</el-radio>
                <el-radio label="4">按季</el-radio>
                <el-radio label="5">按年</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="按购买总额分红" prop="is_buytotal">
              <el-switch v-model="form.is_buytotal" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="同级别合伙人平分" prop="is_average">
              <el-switch v-model="form.is_average" :active-value="1" :inactive-value="0" />
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
      show(val) {}
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
