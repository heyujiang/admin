<template>
  <div>
    <div class="item c">
      <div class="label">{{ title }}</div>
      <div class="input flex">
        <div v-if="item.img" class="module-upload c">
          <img :src="item.img" class="avatar">
          <i class="el-icon-close" @click="deleFile" />
        </div>
        <div v-else class="module-upload c" @click="selectImage">
          <i class="el-icon-camera-solid" />
          <input id="fileupload" type="file" accept="image/*" name="file" style="display: none;" @change="upload">
        </div>
        <div class="tips">上传图片<br>大小一致</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttrImg',
  props: ['item', 'title'],
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
      const loading = this.$loading({ text: '上传中' })
      this.$request.post('/Upload/upload', formdata).then(res => {
        that.item.img = res.data
        loading.close()
      })
    },

    // 删除文件
    async deleFile() {
      this.item.img = ''
    }
  }
}
</script>
