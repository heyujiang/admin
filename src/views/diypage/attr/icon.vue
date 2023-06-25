<template>
  <div>
    <div class="item">
      <div class="label">图标样式：</div>
      <div class="input">
        <div class="input-line">
          <span class="sp1"><em class="radio" :class="icon.style==1?'on':''" @click="icon.style=1" /> 默认</span>
          <span class="sp1"><em class="radio" :class="icon.style==2?'on':''" @click="icon.style=2" /> 隐藏</span>
          <span class="sp1"><em class="radio" :class="icon.style==3?'on':''" @click="icon.style=3" /> 自定义</span>
        </div>
        <template v-if="icon.style == 3">
          <div class="input-line">
            <div v-if="icon.custompic" class="module-upload">
              <img :src="icon.custompic + '?x-oss-process=style/h3'" class="avatar">
              <i class="el-icon-close" @click="deleFile" />
            </div>
            <div v-else class="module-upload" @click="selectImage">
              <i class="el-icon-camera-solid" />
              <input id="fileupload" type="file" accept="image/*" name="file" style="display: none;" @change="upload">
            </div>
            <div class="tips">
              点击可添加图标
              <br>
              尺寸建议：100*100
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttrIcon',
  props: ['icon'],
  data() {
    return {}
  },
  methods: {
    selectImage() {
      document.getElementById('fileupload').click()
    },

    async upload(e) {
      var that = this
      const file = e.target.files[0]
      const formdata = new FormData()
      formdata.append('file', file)
      const loading = this.$loading({
        text: '上传中'
      })
      this.$request.post('/Upload/upload', formdata).then(res => {
        that.icon.custompic = res.data
        loading.close()
      })
    },

    // 删除文件
    async deleFile() {
      /*
      const json = await this.$api.deleteFile({
        m: 'get',
        q: {
          fileUrl: this.icon.custompic
        }
      })*/
      this.icon.custompic = ''
    }

  }
}
</script>
