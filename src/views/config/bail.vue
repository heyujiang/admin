<template>
    <div class="app-container ">
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
        <el-tabs v-model="activeName">
          <el-tab-pane style="padding-top:10px" label="商户保证金" name="商户保证金">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否开启" prop="is_store_bail">
                  <el-switch v-model="form.is_store_bail" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.is_store_bail == 1">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="金额" prop="is_store_bail_amount">
                            <el-input-number v-model="form.is_store_bail_amount" controls-position="right"
                                style="width:300px;" auto-complete="off" clearable :min="0"
                                placeholder="请输入金额" />
                            <div class="help-block">单位：元</div>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="最低限额" prop="is_store_bail_min_amount">
                            <el-input-number v-model="form.is_store_bail_min_amount" controls-position="right"
                                style="width:300px;" auto-complete="off" clearable :min="0"
                                placeholder="请输入最低限额" />
                            <div class="help-block">单位：元</div>
						</el-form-item>
                    </el-col>
                </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane style="padding-top:10px" label="师傅保证金" name="师傅保证金">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否开启" prop="is_technical_bail">
                  <el-switch v-model="form.is_technical_bail" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.is_technical_bail == 1">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="金额" prop="is_technical_bail_amount">
                            <el-input-number v-model="form.is_technical_bail_amount" controls-position="right"
                                style="width:300px;" auto-complete="off" clearable :min="0"
                                placeholder="请输入金额" />
                            <div class="help-block">单位：元</div>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="最低限额" prop="is_technical_bail_min_amount">
                            <el-input-number v-model="form.is_technical_bail_min_amount" controls-position="right"
                                style="width:300px;" auto-complete="off" clearable :min="0"
                                placeholder="请输入最低限额" />
                            <div class="help-block">单位：元</div>
						</el-form-item>
                    </el-col>
                </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
          <el-button size="small" type="primary" @click="submit">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  export default {
    name: 'Configbail',
    components: {
    },
    data() {
      return {
        form: {
        },
        loading: false,
        activeName: '商户保证金',
        rules: {
        }
      }
    },
    mounted() {
      this.$api.post('/config/getInfo', { mo: 'bail' }).then(res => {
        this.form = JSON.stringify(res.data) == '[]' ? {} : res.data
        this.setDefaultVal('keyword')
      })
    },
    methods: {
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true
            this.$api.post('/config/update', this.form).then(res => {
              this.$message({ message: '操作成功', type: 'success' })
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