<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      width="900px"
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
        :label-width="$store.getters.device !== 'mobile'?'18%':'90px'"
      >
        <el-row v-for="(item, index) in form.fields" :key="index">
          <el-col v-if="item.inputtype === 'text'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-input
                v-model="item.fieldsvalue"
                auto-complete="off"
                clearable
                required
                :placeholder="'请输入'+item.viewmingcheng"
                :disabled="(item.fieldsmingcheng=='username' && !!form.id)"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'textarea'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-input
                v-model="item.fieldsvalue"
                type="textarea"
                auto-complete="off"
                :autosize="{ minRows: 2, maxRows: 18}"
                clearable
                :placeholder="'请输入'+item.viewmingcheng"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'pics'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <ImagesUpload size="small" file-type="image" :image.sync="item.fieldsvalue" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'lbs'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-cascader v-model="item.fieldsvalue" expand-trigger="hover" :change-on-select="true" :options="areaoptions" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'coo'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <IMap :coordinate.sync="item.fieldsvalue" :refresh="mapRefresh"></IMap>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'select'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-select v-model="item.fieldsvalue" style="width:100%" filterable clearable placeholder="请选择">
                <el-option v-for="(item,i) in item.selectvaluearray" :key="i" :label="item.key" :value="item.val" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'radio'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-radio-group v-model="item.fieldsvalue">
                <el-radio v-for="(item,i) in item.selectvaluearray" :key="i" :label="item.val">{{ item.key }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'checkbox'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-checkbox-group v-model="item.fieldsvalue">
                <el-checkbox v-for="(item,i) in item.selectvaluearray" :key="i" :label="item.val.toString()">
                  {{ item.key }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'switch'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-switch v-model="item.fieldsvalue" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.inputtype === 'date'" :span="24">
            <el-form-item :label="item.viewmingcheng">
              <el-date-picker v-model="item.fieldsvalue" type="datetime" placeholder="选择时间" />
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
import ImagesUpload from '@/components/common/ImagesUpload.vue'
import IMap from '@/components/common/IMap.vue'

export default {
  name: 'Diyfieldsupdate',
  components: {
    ImagesUpload,
    IMap
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
      form: {
        title: '',
        username: '',
        sex: 1,
        touxiang: '',
        role_id: '',
        remark: '',
        status: 1,
        create_time: ''
      },
      areaoptions: [],
      loading: false,
      rules: {},
      point: {},
      mapRefresh: false
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$api.post('/Area/getpcTree').then(res => {
          this.areaoptions = res.data
        })
      }
    }
  },
  methods: {
    open() {
      if (this.opentype == 'update') {
        this.dialogtitle = '修改'
      } else {
        this.dialogtitle = '添加'
      }
      this.form = this.info
      this.mapRefresh = true   //每次打开刷新地图地图组件
      console.log(this.form)
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.form.path = this.$route.path

          // this.form.fields.forEach(field => {
          //   if(field.)
          // });

          this.$api.post('/diyfields/update', this.form).then(res => {
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
      this.mapRefresh = false
      if (this.$refs['form'] !== undefined) {
        this.$refs['form'].resetFields()
      }
    }
  }
}
</script>