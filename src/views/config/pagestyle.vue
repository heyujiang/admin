<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-tab-pane style="min-height: 600px;padding-top:10px" label="页面样式设置" name="页面样式设置">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分类页样式">
                <el-radio-group v-model="form.categorystyle">
                  <el-radio label="1">一级分类展示</el-radio>
                  <el-radio label="2">二级分类展示</el-radio>
                  <el-radio label="3">一级分类展示2</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="底部菜单文字颜色">
                <colorPicker v-model="form.bottommenucolor" default-color="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="底部菜单选中文字颜色">
                <colorPicker v-model="form.bottommenuselectedColor" default-color="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="底部菜单背景颜色">
                <colorPicker v-model="form.bottommenubackgroundColor" default-color="" />
              </el-form-item>
            </el-col>
          </el-row>

          <!--<el-row>
            <el-col :span="24">
              <el-form-item label="个人中心风格">
                <el-radio-group v-model="form.userstyle">
                  <el-radio label="1">风格1</el-radio>
                  <el-radio label="2">风格2</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="个人中心背景色" prop="userstylebgcolor">
                  <colorPicker v-model="form.userstylebgcolor" default-color="" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="个人中心背景图">
                <ImagesUpload size="small" file-type="image" :image.sync="form.userstylebgimg" />
                <div class="help-block">图片尺寸：800x495像素</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品/服务列表图片比例">
                <el-radio-group v-model="form.listimgproportion">
                  <el-radio label="11">1：1</el-radio>
                  <el-radio label="43">4：3</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="师傅列表图片比例">
                <el-radio-group v-model="form.techlistimgproportion">
                  <el-radio label="11">1：1</el-radio>
                  <el-radio label="43">4：3</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="每页显示的数量" prop="page_num">
                  <el-input-number
                    v-model="form.page_num"
                    controls-position="right"
                    style="width:300px;"
                    auto-complete="off"
                    clearable
                    :min="0"
                    placeholder="请输入每页显示的数量"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Configpagestyle',
  components: {
    ImagesUpload
  },
  data() {
    return {
      form: {
      },
      loading: false,
      activeName: '页面样式设置',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getInfo', { mo: 'pagestyle' }).then(res => {
      this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
    })
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/config/update', this.form).then(res => {
            this.$message({ message: '操作成功', type: 'success' })
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
    }
  }
}
</script>
