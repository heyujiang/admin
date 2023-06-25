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
            <el-form-item label="显示文字" prop="viewmingcheng">
              <el-input v-model="form.viewmingcheng" auto-complete="off" clearable placeholder="请输入显示文字" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否可输入">
              <el-switch v-model="form.is_input" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="列表显示">
              <el-switch v-model="form.is_listView" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="可搜索">
              <el-switch v-model="form.is_search" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="导入导出">
              <el-switch v-model="form.is_import" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否前端显示">
              <el-switch v-model="form.is_front" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="输入方式">
              <el-radio-group v-model="form.inputtype">
                <el-radio label="text">单行文本</el-radio>
                <el-radio label="textarea">多行文本</el-radio>
                <el-radio label="checkbox">多选</el-radio>
                <el-radio label="select">下拉选择</el-radio>
                <el-radio label="switch">开关</el-radio>
                <el-radio label="pics">图片</el-radio>
                <el-radio label="lbs">位置</el-radio>
                <el-radio label="date">日期</el-radio>
                <el-radio label="coo">坐标</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.inputtype == 'select' || form.inputtype == 'checkbox'">
          <el-col :span="24">
            <el-form-item label="选项">
              <Tag :tag-list.sync="form.selectvalue" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="默认值">
              <el-input v-model="form.defaultvalue" auto-complete="off" clearable placeholder="请输入默认值" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明">
              <el-input v-model="form.shuoming" auto-complete="off" clearable placeholder="请输入说明" />
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
    </el-dialog>
  </div>
</template>
<script>
import Tag from '@/components/common/Tag.vue'
export default {
  name: 'Registerfieldupdate',
  components: {
    Tag
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
        viewmingcheng: '',
        status: 1
      },
      loading: false,
      rules: {
        viewmingcheng: [{
          required: true,
          message: '显示文字不能为空',
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
          this.$api.post('/registerfield/update', this.form).then(res => {
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
