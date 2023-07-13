<template>
  <div>
    <el-dialog
      title="查看详情"
      width="800px"
      class="icon-dialog"
      :visible.sync="show"
      :before-close="closeForm"
      append-to-body
      @open="open"
    >
      
        <table
          class="table table-bordered"
          align="center"
          width="100%"
          style="word-break:break-all; margin-bottom:50px;  font-size:13px;"
        >
          <tbody>
            <tr>
              <td class="title" width="100">用户：</td>
              <td>
                {{ applyInfo.nickname }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">姓名：</td>
              <td>
                {{ applyInfo.xingming }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">手机号：</td>
              <td>
                {{ applyInfo.telephone }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">身份证号：</td>
              <td>
                {{ applyInfo.id_cart }}
              </td>
            </tr>
            <tr>
              <td class="title" width="100">身份证号正面：</td>
              <td>
                  <div class="image__preview">
                    <el-image
                      class="table_list_pic"
                      :src="applyInfo.id_cart_img_1"
                      :preview-src-list="[applyInfo.id_cart_img_1]"
                    />
                  </div>
              </td>
            </tr>
            <tr>
              <td class="title" width="100">身份证号反面：</td>
              <td>
                <div class="image__preview">
                    <el-image
                      class="table_list_pic"
                      :src="applyInfo.id_cart_img_2"
                      :preview-src-list="[applyInfo.id_cart_img_2]"
                    />
                </div>
              </td>
            </tr>
            <tr>
              <td class="title" width="100">残疾证：</td>
              <td>
                <div class="image__preview">
                    <el-image
                      v-if="applyInfo.image"
                      class="table_list_pic"
                      :src="applyInfo.disability_cert"
                      :preview-src-list="[applyInfo.disability_cert]"
                    />
                  </div>
              </td>
            </tr>
            <tr>
              <td class="title" width="100">其它资料：</td>
              <td>
                <div v-for="(item, index) in form.goods" :key="index">
                  <div class="image__preview">
                    <el-image
                      v-if="item.image"
                      class="table_list_pic"
                      :src="item.image"
                      :preview-src-list="[item.image]"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      <el-form
        ref="form"
        :size="size"
        :model="form"
        :label-width="$store.getters.device !== 'mobile'?'18%':'90px'"
      >
     
        <el-form-item label="原因" v-if="form.vip_apply_status == 0">
          <el-input v-model="form.vip_apply_denial_reason"></el-input>
        </el-form-item>

        <el-form-item label="审核">
          <el-switch v-model="form.vip_apply_status" active-value="1" inactive-value="0" @change="c"></el-switch>
        </el-form-item>
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
  name: 'Orderdetail',
  components: {
    ImagesUpload
  },
  props: {
    show: {
      type: Boolean,
      default: false
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
      applyInfo:{},
      form: {
        id:0,
        vip_apply_status:0,
        vip_apply_denial_reason:''
      },
      loading: false
    }
  },
  watch: {
    show(val) {
    }
  },
  methods: {
    c(){
      console.log(this.form.vip_apply_status)
    },
    open() {
      this.applyInfo = this.info
      this.form.id = this.info.id
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/member/audit', this.form).then(res => {
            if(res.errno != 0){
              this.$message({
                message: res.message,
                type: 'error'
              })
              this.loading = false
            }else{
              this.$message({
                message: 'SUCCESS',
                type: 'success'
              })
              this.$emit('refesh_list')
              this.closeForm()
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    closeForm() {
      this.$emit('update:show', false)
      this.loading = false
    }
  }
}
</script>
<style>
  .image__preview {
    float: left;
    padding-right: 5px;
  }

  .goodstext {
    float: left;
    padding-left: 5px;
    width: 200px;
  }

  .table_list_pic {
    width: 60px;
  }
</style>
