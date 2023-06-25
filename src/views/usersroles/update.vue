<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="800px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <el-form ref="form" :size="size" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级权限级" prop="pid">
              <Treeselect
                v-model="form.pid"
                :default-expand-level="1"
                :options="pids"
                :normalizer="normalizer"
                :show-count="true"
                z-index="999999"
                placeholder="请选择上级权限级"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="description">
              <el-input v-model="form.description" auto-complete="off" clearable placeholder="请输入备注" />
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Rolesupdate',
  components: { Treeselect },
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
      default: ''
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      dialogtitle: '',
      form: {
        status: 1,
        access: []
      },
      pids: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      strictly: true,
      loading: false,
      rules: {}
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.$api.post('/Usersroles/getField').then(res => {
          this.pids = res.data.pids
        })
      }
    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
        this.form = this.info
        if (this.info.pid == '0') {
          this.$delete(this.info, 'pid')
        }
        console.log(this.form)
        this.setDefaultVal('access')
      } else {
        this.dialogtitle = '添加'
        this.form = {
          sex: 1,
          status: 1,
          datarules: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/Usersroles/update', this.form).then(res => {
            this.$message({
              message: '操作成功',
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
    setDefaultVal(key) {
      if (this.form[key] == null || this.form[key] == '') {
        this.form[key] = []
      }
    },
    checkStrictly() {
      this.strictly = false
    },
    normalizer(data) {
      if (data.children && !data.children.length) {
        delete data.children
      }
      return {
        id: data.val,
        label: data.key,
        children: data.children
      }
    },
    closeForm() {
      this.$emit('update:show', false)
      this.loading = false
      if (this.$refs['form'] !== undefined) {
        this.$refs['form'].resetFields()
      }
      this.strictly = true
    }
  }
}
</script>
