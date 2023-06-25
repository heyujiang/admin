<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="800px"
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
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title" auto-complete="off" clearable placeholder="请输入节点名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="一口价" prop="price">
              <el-input v-model="form.price" auto-complete="off" clearable placeholder="请输入一口价" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级分类" prop="pid">
              <Treeselect
                v-model="form.pid"
                :default-expand-level="1"
                :options="pids"
                :normalizer="normalizer"
                :show-count="true"
                z-index="999999"
                placeholder="请选择所属父类"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="image">
              <ImagesUpload size="small" file-type="image" :image.sync="form.image" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="交付方式">
              <el-checkbox-group v-model="form.deliverymode">
                <el-checkbox v-for="(item,i) in servicedeliverymodearray" :key="i" :label="item.val.toString()">
                  {{ item.key }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序" prop="sort">
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ImagesUpload from '@/components/common/ImagesUpload.vue'
export default {
  name: 'Servicecategoryupdate',
  components: {
    Treeselect,
    ImagesUpload
  },
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
      servicedeliverymodearray:[],
      form: {
        title: '',
        ptype: 2,
        status: 1
      },
      pids: [],
      ptypearray: [],
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入一口价金额',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/Category/getField', {
          ptype: this.form.ptype
        }).then(res => {
          this.pids = res.data.pids
          this.ptypearray = res.data.ptypearray
          this.servicedeliverymodearray = res.data.servicedeliverymodearray
        })
      }
    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
        this.form = this.info
        if (this.info.pid == '0') {
          this.$delete(this.info, 'pid')
        }
      } else {
        this.dialogtitle = '添加'
        this.form = {
          ptype: 2,
          deliverymode: 1,
          status: 1
        }
        // console.log(this.form);
      }
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.post('/Category/update', this.form).then(res => {
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
    normalizer(data) {
      if (data.children && !data.children.length) {
        delete data.children
      }
      return {
        id: data.val,
        label: data.key,
        children: data.children
      }
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
