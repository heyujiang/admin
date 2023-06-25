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
      <el-form ref="form" :size="size" :model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="首重(千克)" prop="snum">
              <el-input-number
                v-model="form.snum"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入首重(千克)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="首运费(元)">
              <el-input v-model="form.sprice" auto-complete="off" clearable placeholder="请输入首运费(元)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="续重(千克)">
              <el-input-number
                v-model="form.xnum"
                controls-position="right"
                style="width:300px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="请输入续重(千克)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="续运费(元)">
              <el-input v-model="form.xprice" auto-complete="off" clearable placeholder="请输入续运费(元)" />
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="可配送区域" prop="role_type">
              <el-tree
                ref="menu"
                class="tree-border"
                :data="options"
                show-checkbox
                node-key="id"
                :default-checked-keys="form.area_id"
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
  name: 'Rolesupdate',
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
        area_id: []
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
        this.$api.post('/Area/geteltree').then(res => {
          this.options = res.data
        })
      }
    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
        this.form = this.info
        console.log(this.form)
        this.setDefaultVal('area_id')
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
          this.form.area_id = this.getMenuAllCheckedKeys()

          this.$api.post('/transportextend/update', this.form).then(res => {
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
