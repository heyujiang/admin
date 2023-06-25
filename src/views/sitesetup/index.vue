<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-tabs v-model="activeName">
        <el-row>
          <el-col :span="24">
            <el-form-item label="系统名称">
              <el-input v-model="form.sys_title" auto-complete="off" clearable placeholder="请输入系统名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="logo" prop="logo">
              <ImagesUpload size="small" file-type="image" :image.sync="form.logo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标语(口号)">
              <el-input v-model="form.SITE_SLOGAN" auto-complete="off" clearable placeholder="标语(口号)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="关键词" prop="keyword">
              <Tag :tag-list.sync="form.keyword" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" type="textarea" auto-complete="off" :autosize="{ minRows: 2, maxRows: 4}" clearable placeholder="请输入站点描述" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱">
              <el-input v-model="form.EMAIL" auto-complete="off" clearable placeholder="邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系电话">
              <el-input v-model="form.TELEPHONE" auto-complete="off" clearable placeholder="标语(口号)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="版权信息" prop="copyright">
              <el-input v-model="form.copyright" auto-complete="off" clearable placeholder="请输入版权信息" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="ICP备案号" prop="icp">
              <el-input v-model="form.icp" auto-complete="off" clearable placeholder="请输入ICP备案号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="系统状态">
              <el-radio-group v-model="form.sys_status">
                <el-radio label="0">关闭</el-radio>
                <el-radio label="1">开启</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tabs>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">保存设置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import ImagesUpload from '@/components/common/ImagesUpload.vue'
import Tag from '@/components/common/Tag.vue'
export default {
  name: 'Sitesetupindex',
  components: {
    ImagesUpload,
    Tag
  },
  data() {
    return {
      form: {
      },
      select: {},
      loading: false,
      activeName: '基本信息',
      rules: {
      }
    }
  },
  mounted() {
    this.$api.post('/config/getField').then(res => {
      this.select = res.data
    })
    this.$api.post('/config/getInfo', {
      mo: 'sitesetup'
    }).then(res => {
      this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
      this.setDefaultVal('keyword')
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
