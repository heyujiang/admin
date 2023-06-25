<template>
	<div>
		<el-dialog :title="dialogtitle" width="800px" class="icon-dialog" :visible.sync="show" @open="open"
			:before-close="closeForm" append-to-body>
			<el-form :size="size" ref="form" :model="form" :rules="rules"
				:label-width="$store.getters.device !== 'mobile'?'16%':'90px'">
				<el-row>
					<el-col :span="24">
						<el-form-item label="内容" prop="content">
							<el-input v-model="form.content" type="textarea" autoComplete="off" clearable placeholder="请输入内容">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="状态" prop="status">
							<el-switch :active-value="1" :inactive-value="0" v-model="form.status"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="排序" prop="px">
							<el-input-number controls-position="right" style="width:200px;" autoComplete="off"
								v-model="form.px" clearable :min="0" placeholder="排序" />
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
	export default {
		name: 'update',
		components: {
			ImagesUpload
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
      opentype:{
        type: String,
        default: 'add'
      },
			size: {
				type: String,
				default: 'small'
			},
			info: {
				type: Object,
			},
		},
		data() {
			return {
        dialogtitle:'',
				form: {
					content: '',
					status: 1,
				},
				loading: false,
				rules: {
					content: [{
						required: true,
						message: '内容不能为空',
						trigger: 'blur'
					}, ],
				}
			}
		},
		watch: {
			show(val) {
			}
		},
		methods: {
			open() {
        if(this.opentype=='update'){
          this.dialogtitle = "修改";
          this.form = this.info
          if (this.info.pid == '0') {
          	this.$delete(this.info, 'pid')
          }
        }else{
          this.dialogtitle = "添加";
          this.form = {
            type: 1,
            status: 1,
          };
          //console.log(this.form);
        }
			},
			submit() {
				this.$refs['form'].validate(valid => {
					if (valid) {
						this.loading = true
						this.$api.post('/kefu.commonly/update', this.form).then(res => {
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
			},
		}
	}
</script>
