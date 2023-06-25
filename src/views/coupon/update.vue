<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="1000px"
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
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠券颜色">
              <el-radio-group v-model="form.color">
                <el-radio v-for="(item,i) in colorarray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发放方式">
              <el-radio-group v-model="form.ptype">
                <el-radio v-for="(item,i) in ptypearray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.ptype==2">
          <el-col :span="24">
            <el-form-item label="购买价格">
              <el-input v-model="form.buy_price" auto-complete="off" clearable placeholder="请输入购买价格" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠券类型">
              <el-radio-group v-model="form.coupon_type">
                <el-radio v-for="(item,i) in coupon_typearray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="消费满金额">
              <el-input v-model="form.min_price" auto-complete="off" clearable placeholder="请输入消费满金额" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.coupon_type==10">
          <el-col :span="24">
            <el-form-item label="减免金额">
              <el-input v-model="form.reduce_price" auto-complete="off" clearable placeholder="请输入减免金额" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.coupon_type==20">
          <el-col :span="24">
            <el-form-item label="折扣">
              <el-input v-model="form.discount" auto-complete="off" clearable placeholder="请输入折扣" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="有效类型">
              <el-radio-group v-model="form.expire_type">
                <el-radio v-for="(item,i) in expire_typearray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.expire_type==10">
          <el-col :span="24">
            <el-form-item label="有效天数">
              <el-input v-model="form.expire_day" auto-complete="off" clearable placeholder="请输入有效天数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.expire_type==20">
          <el-col :span="24">
            <el-form-item label="开始时间">
              <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.expire_type==20">
          <el-col :span="24">
            <el-form-item label="结束时间">
              <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发放数量">
              <el-input v-model="form.total_num" auto-complete="off" clearable placeholder="请输入发放数量" />
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
            <el-form-item label="排序">
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
export default {
  name: 'Couponupdate',
  components: {},
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
        title: '',
        status: 1
      },
      colorarray: [],
      ptypearray: [],
      coupon_typearray: [],
      expire_typearray: [],
      loading: false,
      rules: {
        name: [{
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/coupon/getField').then(res => {
          this.colorarray = res.data.colorarray
          this.ptypearray = res.data.ptypearray
          this.coupon_typearray = res.data.coupon_typearray
          this.expire_typearray = res.data.expire_typearray
        })
      }
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
          color: 'blue',
          ptype: 1,
          coupon_type: 10,
          expire_type: 10,
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
          this.$api.post('/coupon/update', this.form).then(res => {
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
