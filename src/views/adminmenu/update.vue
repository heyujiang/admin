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
      <el-form
        ref="form"
        :size="size"
        :model="form"
        :rules="rules"
        :label-width="$store.getters.device !== 'mobile'?'16%':'90px'"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="节点名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入节点名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="节点名称商城" prop="title_v2">
              <el-input v-model="form.title_v2" auto-complete="off" clearable placeholder="请输入节点名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="节点名称服务" prop="title_v3">
              <el-input v-model="form.title_v3" auto-complete="off" clearable placeholder="请输入节点名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属父类" prop="pid">
              <Treeselect
                v-model="form.pid"
                :default-expand-level="1"
                :options="pids"
                :normalizer="normalizer"
                :show-count="true"
                z-index="999999"
                placeholder="请选择所属父类"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">方法</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.type == 1">
          <el-col :span="24">
            <el-form-item label="组件路径" prop="pages_path">
              <el-input v-model="form.pages_path" auto-complete="off" clearable placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="控制台菜单">
              <el-switch v-model="form.is_console" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="管理员菜单">
              <el-switch v-model="form.is_admin" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="城市代理菜单">
              <el-switch v-model="form.is_city" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="商家菜单">
              <el-switch v-model="form.is_store" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="商城">
              <el-switch v-model="form.is_v2" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上门服务">
              <el-switch v-model="form.is_v3" :active-value="1" :inactive-value="0" />
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
            <el-form-item label="节点标识" prop="path">
              <el-input v-model="form.path" auto-complete="off" clearable placeholder="请输入节点标识" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.type == 1">
          <el-col :span="24">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" placeholder="点击选择图标" clearable>
                <el-button slot="append" type="success" icon="el-icon-thumb" @click="iconOpen('icon')">
                  请选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                controls-position="right"
                style="width:200px;"
                auto-complete="off"
                clearable
                :min="0"
                placeholder="排序"
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
      <Icon
        :iconshow.sync="iconDialogStatus"
        :current-icon-model.sync="currentIconModel"
        size="small"
        @selectIcon="selectIcon"
      />
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Icon from '@/components/common/Icon.vue'
export default {
  name: 'Adminmenuupdate',
  components: {
    Treeselect,
    Icon
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
      type: Object
    }
  },
  data() {
    return {
      dialogtitle: '',
      form: {
        title: '',
        type: 1,
        pages_path: '',
        status: 1,
        path: '',
        icon: ''
      },
      iconDialogStatus: false,
      currentIconModel: '',
      pids: [],
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '节点名称不能为空',
          trigger: 'blur'
        }],
        path: [{
          required: true,
          message: '节点标识不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/Adminmenu/getField').then(res => {
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
          this.$api.post('/Adminmenu/update', this.form).then(res => {
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
    normalizer(adminmenu) {
      if (adminmenu.children && !adminmenu.children.length) {
        delete adminmenu.children
      }
      return {
        id: adminmenu.val,
        label: adminmenu.key,
        children: adminmenu.children
      }
    },
    iconOpen(model) {
      this.iconDialogStatus = true
      this.currentIconModel = model
    },
    selectIcon(icon) {
      this.form[this.currentIconModel] = icon
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
