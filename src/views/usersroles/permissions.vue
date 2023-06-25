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
        <el-row v-if="form.pidarray.is_console">
          <el-col :span="24">
            <el-form-item label="控制台管理员">
              <el-switch v-model="form.is_console" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.pidarray.is_admin">
          <el-col :span="24">
            <el-form-item label="平台管理员">
              <el-switch v-model="form.is_admin" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.pidarray.is_store">
          <el-col :span="24">
            <el-form-item label="商家管理员">
              <el-switch v-model="form.is_store" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="菜单权限">
          <el-radio-group v-model="form.is_allrole">
            <el-radio :label="0">部分权限</el-radio>
            <el-radio v-if="form.pidarray.is_allrole || form.pidarray.pid==0" :label="1">全部权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row v-show="form.is_allrole==0">
          <el-col :span="24">
            <el-form-item label="" prop="role_type">
              <el-tree
                ref="menu"
                class="tree-border"
                :data="options"
                show-checkbox
                node-key="access"
                :default-checked-keys="form.access"
                :check-strictly="strictly"
                :default-expand-all="true"
                empty-text="加载中，请稍后"
                :props="defaultProps"
                @check="checkStrictly"
              />
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
  name: 'Rolespermissions',
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
        access: [],
        pidarray: []
      },
      options: [],
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
        this.$api.post('/Sysbase/getRolesMenus').then(res => {
          this.options = res.menus
        })
      }
    }
  },
  methods: {
    open() {
      this.form = this.info
      this.dialogtitle = this.form.title + '权限设置'
      if (this.info.pid == '0') {
        this.$delete(this.info, 'pid')
      }
      this.setDefaultVal('access')
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.form.access = this.getMenuAllCheckedKeys()

          this.$api.post('/Usersroles/permissions', this.form).then(res => {
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
    getMenuAllCheckedKeys() {
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      const halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
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
