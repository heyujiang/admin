<template>
  <div>
    <el-dialog
      title="图片管理"
      width="640px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      <div style="padding-left:10px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-upload
              ref="upload"
              class="upload-demo"
              multiple
              action="#"
              :before-upload="beforeUpload"
              :http-request="upload"
            >
              <el-button class="el-icon-upload" size="small" type="primary"> 上传图片</el-button>
            </el-upload>
          </el-col>
          <el-col :span="8">
            <el-button class="el-icon-delete" size="small" type="primary" @click="deletePic">批量删除</el-button>
          </el-col>
        </el-row>
        <el-progress v-if="progress" :stroke-width="5" :percentage="progressPercent" />
        <el-row style="margin-top:15px;">
          <el-col :span="24">
            <el-row>
              <div
                v-for="(item,index) in list"
                :key="index"
                class="image-wrap"
                @click="selection(item.filepath)"
              >
                <label v-for="(v, k) in files" v-show="item.filepath === v" :key="k">
                  <input type="checkbox" :checked="item.filepath === v">
                  <i>✓</i>
                </label>
                <div class="imgStyle">
                  <img :src="item.filepath"><br>
                </div>
              </div>
            </el-row>
            <pagination
              v-show="page_data.total>0"
              :total="page_data.total"
              :page.sync="page_data.page"
              :limit.sync="page_data.limit"
              @pagination="index"
            />
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" :loading="loading" type="primary" @click="submit">
          <span>确 定</span>
        </el-button>
        <el-button size="small" @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
  confirm
} from '@/utils/common'
export default {
  components: {
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [],
      list: [],
      loading: false,
      progressPercent: 0,
      progress: false,
      page_data: {
        limit: 20,
        page: 1,
        total: 20
      }
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.index()
      }
    }
  },
  methods: {
    open() {
      this.files = []
    },
    index() {
      const param = {
        limit: this.page_data.limit,
        page: this.page_data.page
      }
      this.loading = true
      this.$api.post('/Sysbase/fileList', param).then(res => {
        this.list = res.data
        this.page_data.total = res.total
        this.loading = false
      })
    },
    selection(filepath) {
      const index = this.files.indexOf(filepath)
      if (index === -1) {
        this.files.push(filepath)
      } else {
        this.files.splice(index, 1)
      }
    },
    deletePic() {
      confirm({
        content: '确定要操作吗'
      }).then(() => {
        this.$api.post('/Sysbase/deleteFile', {
          filepath: this.files
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.index()
        })
      })
    },
    beforeUpload(item) {
      if (item.type.split('/')[0] === 'image') {
        const tempSize = item.size / 5242880
        if (tempSize > 1) {
          this.$message.error('图片尺寸不得大于5M！')
          return false
        }
      }
    },
    upload(item) {
      const formdata = new FormData()
      const ali = new FormData() // 此处非常坑 阿里上传file属性必须要放到最后  所以只能赋值对象
      formdata.append('file', item.file)
      const config = {
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            this.progress = true
            this.progressPercent = Number((progressEvent.loaded / progressEvent.total * 100)
              .toFixed(2))
          }
        }
      }
      try {
        this.$request.post('/Upload/upload', formdata, config).then(res => {
          if (res.code == 2000) {
            if (!res.filestatus) {
              if (res.data.type == 'qiniuyun') {
                formdata.append('token', res.data.token)
                formdata.append('key', res.data.key)
                this.$request.post(res.data.serverurl, formdata, config).then(ret => {
                  if (ret.data.key) {
                    this.$api.post('/Upload/createFile', {
                      filepath: res.data.domain + '/' + ret.data.key
                    }).then(res => {
                      this.progressPercent = 0
                      this.progress = false
                      this.index()
                    })
                  }
                })
              } else if (res.data.data.type == 'ali') {
                ali.append('Signature', res.data.sign)
                ali.append('callback', res.data.callback)
                ali.append('OSSAccessKeyId', res.data.OSSAccessKeyId)
                ali.append('policy', res.data.policy)
                ali.append('key', res.data.key)
                ali.append('file', item.file)
                this.$request.post(res.data.serverurl, ali, config).then(ret => {
                  if (ret.data.code == 1) {
                    this.$api.post('/Upload/createFile', {
                      filepath: ret.data
                    }).then(res => {
                      this.progressPercent = 0
                      this.progress = false
                      this.index()
                    })
                  }
                })
              } else {
                this.progressPercent = 0
                this.progress = false
                this.index()
              }
            } else {
              this.$message.error('文件已经存在')
            }
          }
        })
      } catch (error) {
        this.$message.error('上传失败')
      } finally {
        this.$refs.upload && this.$refs.upload.clearFiles()
      }
    },
    submit() {
      this.$emit('update:siglepic', this.files[0])
      this.closeForm()
    },
    closeForm() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
	.image-wrap {
		position: relative;
		display: inline-block;
		box-sizing: content-box;
		margin: 10px 15px 0 0;
		vertical-align: top;

		&:hover {
			.icon-wrap {
				opacity: 1;
			}
		}

		.imgStyle img {
			width: 100px;
			height: 100px;
			border: 1px solid #d9d9d9;
			border-radius: 6px;
		}

		.icon-wrap {
			position: absolute;
			left: 0;
			border-radius: 6px;
			width: 102px;
			height: 102px;
			cursor: default;
			text-align: center;
			line-height: 100px;
			color: #fff;
			opacity: 0;
			font-size: 20px;
			background-color: rgba(0, 0, 0, .7);
			transition: opacity .3s;

			.el-icon-zoom-in {
				cursor: pointer;
				margin-right: 8px;
			}

			.el-icon-delete {
				cursor: pointer;
			}
		}
	}

	label {
		font-size: 25px;
		cursor: pointer;
		position: absolute;
		top: -2px;
		right: 0px;
		z-index: 150;
	}

	label i {
		font-size: 15px;
		font-style: normal;
		display: inline-block;
		width: 18px;
		height: 18px;
		text-align: center;
		line-height: 18px;
		color: #fff;
		vertical-align: middle;
		margin: -3px 0px 1px 0px;
	}

	input[type="checkbox"],
	input[type="radio"] {
		display: none;
		outline: none;
	}

	input[type="radio"]+i {
		border-radius: 7px;
	}

	input[type="checkbox"]:checked+i,
	input[type="radio"]:checked+i {
		background: #67c23a;
		color: #FFF;
	}
</style>
