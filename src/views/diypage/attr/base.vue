<template>
  <div>
    <div class="item">
      <div v-if="name==''" class="label">背景：</div>
      <div v-else class="label">{{ name }}：</div>
      <div class="input">
        <div class="input-line">
          <label class="sp1">
            <input class="radio" :checked="base.bg==1" type="radio" @click="base.bg = 1">默认
          </label>
          <label class="sp1">
            <input class="radio" :checked="base.bg==2" type="radio" @click="base.bg = 2">隐藏
          </label>
          <label class="sp1">
            <input class="radio" :checked="base.bg==3" type="radio" @click="base.bg = 3">自定义
          </label>
        </div>
        <template v-if="base.bg == 3">
          <div class="input-line">
            <div class="label">颜色类型：</div>
            <div class="input">
              <el-select v-model="base.bt" placeholder="请选择颜色类型">
                <el-option label="颜色填充" :value="1" />
                <el-option label="图片填充" :value="2" />
              </el-select>
            </div>
          </div>
          <div v-if="base.bt==1" class="input-line">
            <div class="label">背景颜色：</div>
            <div class="input f">
              <el-tooltip effect="dark" content="颜色" placement="top">
                <colorPicker v-model="base.bc" default-color="#333" />
              </el-tooltip>
            </div>
          </div>
          <div v-if="base.bt==2" class="input-line">
            <div class="label">背景图片：</div>
            <div class="input f">
              <div v-if="base.bi" class="module-upload">
                <img :src="base.bi + '?x-oss-process=style/h3'" class="avatar">
                <i class="el-icon-close" @click="deleFile" />
              </div>
              <div v-else class="module-upload" @click="selectImage">
                <i class="el-icon-camera-solid" />
                <input id="fileupload" type="file" accept="image/*" name="file" style="display: none;" @change="upload">
              </div>
              <div class="tips">点击上传背景图</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="base.sc && base.sc.length>1" class="item">
      <div class="label">样式选择：</div>
      <div class="input attr-style">
        <dl v-for="(item, index) in base.sc" :key="index" class="style" @click="base.style = item.keys">
          <dd><img :src="$util.icon(item.pic)" alt=""></dd>
          <dd>
            <el-radio v-model="base.style" :label="item.keys">{{ item.title }}</el-radio>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttrBase',
  props: {
    'base': {
      type: Object
    },
    'type': {
      default: 0
    },
    'name': {
      default: ''
    }
  },
  data() {
    return {}
  },

  mounted() {},

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
        that.base.bi = res.data
        loading.close()
      })
    },

    // 删除文件
    async deleFile() {
      // const json = await this.$api.deleteFile({ m: 'get', q: { fileUrl: this.base.bi }})
      this.base.bi = ''
    }
  }
}
</script>

<style></style>
