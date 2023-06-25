<template>
  <div>
    <el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" @open="open"
      :before-close="closeForm" append-to-body>
      <el-form :size="size" ref="form" :model="form" :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户帐号" prop="groupid">
              <el-select style="width:100%" v-model="form.uid" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in userslist" :key="i" :label="item.key" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title" autoComplete="off" clearable placeholder="请输入名称">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="类型" prop="kefutype">
              <el-checkbox-group v-model="form.kefutype">
                <el-checkbox label="is_mpkefu">
                  公众号
                </el-checkbox>
                <el-checkbox label="is_wxappkefu">
                  小程序
                </el-checkbox>
                <el-checkbox label="is_mobilekefu">
                  微网
                </el-checkbox>
                <el-checkbox label="is_webkefu">
                  PC网站
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="接待方式" prop="reception">
              <el-radio-group v-model="form.reception">
                <el-radio :label="0">在线</el-radio>
                <el-radio :label="1">QQ</el-radio>
                <el-radio :label="2">电话</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属客服组" prop="groupid">
              <el-select style="width:100%" v-model="form.groupid" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in groups" :key="i" :label="item.key" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="头像" prop="touxiang">
              <ImagesUpload size="small" fileType="image" :image.sync="form.touxiang"></ImagesUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客服服务时间" prop="week">
              <el-checkbox-group v-model="form.week">
                <el-checkbox label="1">
                  周一
                </el-checkbox>
                <el-checkbox label="2">
                  周二
                </el-checkbox>
                <el-checkbox label="3">
                  周三
                </el-checkbox>
                <el-checkbox label="4">
                  周四
                </el-checkbox>
                <el-checkbox label="5">
                  周五
                </el-checkbox>
                <el-checkbox label="6">
                  周六
                </el-checkbox>
                <el-checkbox label="7">
                  周日
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="客服开始时间">
              <el-time-picker style="width:180px;" value-format="HH:mm" format="HH:mm" v-model="form.begintime" clearable placeholder="请输入客服开始时间">
              </el-time-picker>
               到
              <el-time-picker style="width:180px;" value-format="HH:mm" format="HH:mm" v-model="form.endtime" clearable placeholder="请输入客服结速时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回复的内容" prop="recovery">
                <el-input v-model="form.recovery" autoComplete="off" clearable placeholder="请输入回复的内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-switch :active-value="1" :inactive-value="0" v-model="form.status"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序" prop="px">
              <el-input-number controls-position="right" style="width:200px;" autoComplete="off" v-model="form.px"
                clearable :min="0" placeholder="排序" />
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
    name: 'update',
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
        type: Object,
      },
    },
    data() {
      return {
        dialogtitle: '',
        form: {},
        groups: [],
        userslist:[],
        loading: false,
        rules: {
          title: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }, ],
        },
        formThead: ['apple', 'banana']
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$api.post('/kefu.Seating/getField').then(res => {
            this.groups = res.data.groups
            this.userslist = res.data.userslist
          })
        }
      }
    },
    methods: {
      open() {
        if (this.opentype == 'update') {
          this.dialogtitle = "修改";
          this.form = this.info
          if (this.info.pid == '0') {
            this.$delete(this.info, 'pid')
          }
        } else {
          this.dialogtitle = "添加";
          this.form.type = 1;
          this.form.status = 1;
          this.form = {
            title: '',
            reception:0,
            kefutype:['is_mpkefu'],
            week: ['1', '2', '3', '4', '5', '6'],
            type: 1,
            status: 1,
          };
          //console.log(this.form);
        }
      },
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true
            this.$api.post('/kefu.Seating/update', this.form).then(res => {
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
      },
    }
  }
</script>
