<template>
  <div>
    <el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" :before-close="closeForm"
      append-to-body @open="open">
      <el-form ref="form" :size="size" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="打印机类型" prop="pinpai">
              <el-select v-model="form.pinpai" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in PinpaiType" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="USER">
              <el-input v-model="form.settings.user" auto-complete="off" clearable placeholder="请输入USER" />
              <div class="help-block">飞鹅云后台注册用户名</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="UKEY">
              <el-input v-model="form.settings.ukey" auto-complete="off" clearable placeholder="请输入UKEY" />
              <div class="help-block">飞鹅云后台登录生成的UKEY</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="打印机编号">
              <el-input v-model="form.settings.sn" auto-complete="off" clearable placeholder="请输入打印机编号" />
              <div class="help-block">打印机编号9位,查看飞鹅打印机底部贴纸上面的打印机编号</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="打印机key">
              <el-input v-model="form.settings.key" auto-complete="off" clearable placeholder="请输入打印机key" />
              <div class="help-block">查看飞鹅打印机底部贴纸上面的打印机key</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="打印联数">
              <el-input v-model="form.settings.time" auto-complete="off" clearable placeholder="请输入打印联数" />
              <div class="help-block">同一订单，打印的次数</div>
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
    name: 'printerupdate',
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
        PinpaiType: [],
        form: {
            name: '',
            settings: {},
            status: 1
          },
        loading: false,
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          pinpai: [{
            required: true,
            message: '请选择打印机类型',
            trigger: 'blur'
          }]
        }
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$api.post('/printer/getField').then(res => {
            this.PinpaiType = res.data.PinpaiType
          })
        }
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
            name: '',
            settings: {},
            status: 1
          };

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
