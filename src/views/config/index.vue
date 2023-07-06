<template>
	<div class="app-container ">
		<el-form ref="form" size="small" :model="form" :rules="rules" label-width="180px">
			<el-tabs v-model="activeName">
				<el-tab-pane style="padding-top:10px" label="基本信息" name="基本信息">
					<el-row>
						<el-col :span="24">
							<el-form-item label="系统名称">
								<el-input v-model="form.sys_title" auto-complete="off" clearable
									placeholder="请输入系统名称" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="logo" prop="logo">
								<ImagesUpload size="small" file-type="image" :image.sync="form.logo" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="提审版本号">
								<el-input v-model="form.program_version" auto-complete="off" clearable
									placeholder="提审版本号" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="标语(口号)">
								<el-input v-model="form.SITE_SLOGAN" auto-complete="off" clearable
									placeholder="标语(口号)" />
							</el-form-item>
						</el-col>
					</el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="保障">
                <el-input v-model="form.securitys" auto-complete="off" clearable
                          placeholder="保障(多条以逗号隔开)" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发布页是否需要图片">
                <el-radio-group v-model="form.public_is_pic">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发布页是否需要视频">
                <el-radio-group v-model="form.public_is_video">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="订单确认页面是否需要图片">
                <el-radio-group v-model="form.order_is_pic">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
		  <el-row>
            <el-col :span="24">
              <el-form-item label="订单确认页面是否需要视频">
                <el-radio-group v-model="form.order_is_video">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="关键词" prop="keyword">
								<Tag :tag-list.sync="form.keyword" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="描述" prop="description">
								<el-input v-model="form.description" type="textarea" auto-complete="off"
									:autosize="{ minRows: 2, maxRows: 4}" clearable placeholder="请输入站点描述" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="邮箱">
								<el-input v-model="form.EMAIL" auto-complete="off" clearable placeholder="邮箱" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="联系电话">
								<el-input v-model="form.TELEPHONE" auto-complete="off" clearable
									placeholder="请输入联系电话" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="首页弹窗客服二维码">
								<ImagesUpload size="small" file-type="image" :image.sync="form.kefuqrcode" />
								<div class="help-block">图片尺寸：600x970像素</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="百度地图key" prop="bdkey">
								<el-input v-model="form.bdkey" auto-complete="off" clearable
									placeholder="请输入百度地图key" />
							</el-form-item>
						</el-col>
					</el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上门费" prop="visit_fee">
                <el-input v-model="form.visit_fee" auto-complete="off" clearable
                          placeholder="请输入上门费" />
              </el-form-item>
            </el-col>
          </el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="版权信息" prop="copyright">
								<el-input v-model="form.copyright" auto-complete="off" clearable
									placeholder="请输入版权信息" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="系统状态">
								<el-radio-group v-model="form.sys_status">
									<el-radio label="0">关闭</el-radio>
									<el-radio label="1">开启</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane style="padding-top:10px" label="系统参数" name="系统参数">

					<el-row>
						<el-col :span="24">
							<el-form-item label="默认订单自动结算时间" prop="automaticsettlement">
								<el-input-number v-model="form.automaticsettlement" controls-position="right"
									style="width:300px;" auto-complete="off" clearable :min="0"
									placeholder="默认订单自动结算时间" />
								<div class="help-block">多少天</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="显示商家的默认距离" prop="storedistance">
								<el-input-number v-model="form.storedistance" controls-position="right"
									style="width:300px;" auto-complete="off" clearable :min="0"
									placeholder="请输入显示商家的默认距离" />
								<div class="help-block">单位：km</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="显示师傅列表的默认距离" prop="technicaldistance">
								<el-input-number v-model="form.technicaldistance" controls-position="right"
									style="width:300px;" auto-complete="off" clearable :min="0"
									placeholder="请输入显示师傅列表的默认距离" />
								<div class="help-block">单位：km</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="首页订单播报">
								<el-radio-group v-model="form.is_broadcast">
									<el-radio label="0">关闭</el-radio>
									<el-radio label="1">开启</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="商品/服务列表图片比例">
								<el-radio-group v-model="form.listimgproportion">
									<el-radio label="11">1：1</el-radio>
									<el-radio label="43">4：3</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="师傅列表图片比例">
								<el-radio-group v-model="form.techlistimgproportion">
									<el-radio label="11">1：1</el-radio>
									<el-radio label="43">4：3</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="默认订单状态">
								<el-select v-model="form.default_order_status_id" style="width:100%" filterable
									clearable placeholder="请选择">
									<el-option v-for="(item,i) in select.order_status" :key="i" :label="item.key"
										:value="item.val" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="订单已付款状态">
								<el-select v-model="form.paid_order_status_id" style="width:100%" filterable clearable
									placeholder="请选择">
									<el-option v-for="(item,i) in select.order_status" :key="i" :label="item.key"
										:value="item.val" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="订单完成状态">
								<el-select v-model="form.complete_order_status_id" style="width:100%" filterable
									clearable placeholder="请选择">
									<el-option v-for="(item,i) in select.order_status" :key="i" :label="item.key"
										:value="item.val" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="订单取消状态">
								<el-select v-model="form.cancel_order_status_id" style="width:100%" filterable clearable
									placeholder="请选择">
									<el-option v-for="(item,i) in select.order_status" :key="i" :label="item.key"
										:value="item.val" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane style="padding-top:10px" label="会员系统设置" name="会员系统设置">
					<el-row v-if="sysversion=='v2'">
						<el-col :span="24">
							<el-form-item label="强制登录">
								<el-radio-group v-model="form.WECHAT_REGISTER_CLOSE">
									<el-radio label="0">否</el-radio>
									<el-radio label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="sysversion=='v2'">
						<el-col :span="24">
							<el-form-item label="注册需要审核">
								<el-radio-group v-model="form.reg_check">
									<el-radio label="0">否</el-radio>
									<el-radio label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="价格替代的文字" prop="shiftprice">
								<el-input v-model="form.shiftprice" auto-complete="off" clearable
									placeholder="请输入价格替代的文字" />
								<div class="help-block">不显示价格替代的文字</div>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane style="padding-top:10px" label="腾讯云" name="腾讯云">
					<el-row>
						<el-col :span="24">
							<el-form-item label="腾讯云appid" prop="tencent_cloud_appid">
								<el-input v-model="form.tencent_cloud_appid" auto-complete="off" clearable
									placeholder="请输入腾讯云appid" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="腾讯云secretId" prop="tencent_cloud_secretId">
								<el-input v-model="form.tencent_cloud_secretId" auto-complete="off" clearable
									placeholder="请输入腾讯云secretId" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="腾讯云secretKey" prop="tencent_cloud_secretKey">
								<el-input v-model="form.tencent_cloud_secretKey" auto-complete="off" clearable
									placeholder="请输入腾讯云secretKey" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="师傅电话通知模版id" prop="phone_notify_template_id">
								<el-input v-model="form.phone_notify_template_id" auto-complete="off" clearable
									placeholder="请输入师傅电话通知模版id" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item>
				<el-button size="small" type="primary" @click="submit">保存设置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
	import ImagesUpload from '@/components/common/ImagesUpload.vue'
	import Tag from '@/components/common/Tag.vue'
	export default {
		name: 'Configindex',
		components: {
			ImagesUpload,
			Tag
		},
		data() {
			return {
				form: {},
				select: {},
				sysversion: '',
				loading: false,
				activeName: '基本信息',
				rules: {}
			}
		},

		mounted() {
			this.$api.post('/config/getField').then(res => {
				this.select = res.data
			})
			this.$api.get('/Sysbase/sysversion', this.form).then(res => {
				this.sysversion = res.data
			})
			this.$api.post('/config/getInfo').then(res => {
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
							this.$message({
								message: '操作成功',
								type: 'success'
							})
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
