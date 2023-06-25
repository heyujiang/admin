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
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="页面" prop="groupid">
              <el-select v-model="form.url" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in urlarray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参数">
              <el-input v-model="form.params" auto-complete="off" clearable placeholder="请输入参数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图标">
              <ImagesUpload size="small" file-type="image" :image.sync="form.icon" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="选中的图标">
              <ImagesUpload size="small" file-type="image" :image.sync="form.iconactive" />
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
            <el-form-item label="凸起">
              <el-switch v-model="form.hump" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核隐藏">
              <el-switch v-model="form.is_submitaudit" :active-value="1" :inactive-value="0" />
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
            <el-form-item label="排序">
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
    </el-dialog>
  </div>
</template>
<script>
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Bottommenuupdate',
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
      urlarray: [],
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '显示文字不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/bottommenu/getField').then(res => {
          this.urlarray = res.data.urlarray
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
          mo: 'bottom',
          sort: 100,
          status: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.form.path = this.$route.path
          this.$api.post('/bottommenu/update', this.form).then(res => {
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
