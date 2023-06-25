<template>
  <div class="app-container ">
    <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">系统升级</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import ImagesUpload from '@/components/common/ImagesUpload.vue'
import Tag from '@/components/common/Tag.vue'
export default {
  name: 'sitesetupupgrade',
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
         this.$api.post('/Upgrade/index').then(res => {
           this.$message({
             message: '升级成功',
             type: 'success'
           })
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
    }
  }
}
</script>
