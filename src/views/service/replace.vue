<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="1200px"
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
            <el-form-item label="商品/服务">
              <div v-if="goodsInfo" class="ordergoodsbox">
                <el-image
                  v-if="goodsInfo.image"
                  class="goods_pic"
                  :src="goodsInfo.image"
                  :preview-src-list="[goodsInfo.image]"
                />
                <div class="ordergoodstext">{{ goodsInfo.name }}<br>￥{{ goodsInfo.price }}</div>
              </div>
              <div>
                <el-select
                v-model="form.sku"
                value-key="id"
                placeholder="请选择规格"
                @change="searchChange">
                <el-option
                  v-for="item in goodsInfo.sku"
                  :key="item.sku"
                  :label="item.sku || goodsInfo.name"
                  :value="item.sku">
                </el-option>
              </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="选择用户" prop="uid">
              <el-select
                v-model="form.uid"
                value-key="id"
                filterable
                remote
                placeholder="请输入手机号或用户名"
                :remote-method="memberSearch"
                :loading="loadingSelect"
                @change="searchChange">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.nickname + (item.telephone ? '(' +  item.telephone + ')' : '')"
                  :value="item.id">
                </el-option>
              </el-select>
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
export default {
  name: 'Servicereplace',
  components: {},
  props: {
    id: {
      type: Number,
      default: 0
    },
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
      dialogtitle: '代客下单',
      loading: false,
      loadingSelect: false,
      rules: {
        title: [{
          required: true,
          message: '显示文字不能为空',
          trigger: 'blur'
        }]
      },
      options: [] ,
      form: {
        uid : 0,
        goods_id : 0,
        sku : ''
      },
      goodsInfo : {}
    }
  },
  methods: {
    open() {
      this.dialogtitle = '代客下单'
      this.goodsInfo = this.info 
      console.log(this.goodsInfo.id)
      this.form.goods_id = this.goodsInfo.id
      this.form.sku = this.goodsInfo.sku[0].sku
      this.memberSearch('')
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.form)
          this.$api.post('/order/replace', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
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
    },
    memberSearch(query) {
      let param = {
        keyword: query
      }
      console.log(query)
      this.loadingSelect = true;
      this.$api.post('/member/search', param).then(res => {
        this.options = res.data
        console.log(this.options)
      }).catch(() => {
        this.options = []
      })
      this.loadingSelect = false 
    },
    searchChange(){
      console.log(this.form.uid)
    }
  }
}
</script>
<style scoped>
  .ordergoodsbox {
    width: 100%;
    padding-bottom: 10px;
    float: left;
  }

  .goods_pic {
    width: 100px;
    vertical-align: middle;
    float: left;
  }

  .ordergoodstext {
    padding: 10px;
    float: left;
  }
</style>

