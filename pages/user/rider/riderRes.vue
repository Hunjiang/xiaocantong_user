<template>
	<view class="register">
		<hx-navbar :status-bar="true" :fixed="true" transparent="hidden" barPlaceholder="hidden">
		</hx-navbar>
		<view class="content" v-if="audit_status==0">

			<view class="title">填写基本信息</view>
			<view class="infoBox">
				<view class="infoList">
					<view>姓名</view>
					<input placeholder-class="placeholderStyle" type="text" v-model="riderName" placeholder="请输入您的姓名" @blur='isCanRes'/>
				</view>
				<view class="infoList">
					<view>性别</view>
					<view class="genderBox">
						<view class="genderList" @click="isSelectGender=1">
							<image v-if="isSelectGender==2" src="../../../static/img/unMen.png" mode=""></image>
							<image v-else src="../../../static/img/men.png" mode=""></image>
							<text :class="[isSelectGender==1?'selectText1':'']">男生</text>

							<image v-if="isSelectGender==1" class="selectGender" src="../../../static/img/menSel.png" mode=""></image>
						</view>
						<view class="genderList" @click="isSelectGender=2">
							<image v-if="isSelectGender==1" src="../../../static/img/unWomen.png" mode=""></image>
							<image v-else src="../../../static/img/women.png" mode=""></image>
							<text :class="[isSelectGender==2?'selectText2':'']">女生</text>

							<image v-if="isSelectGender==2" class="selectGender" src="../../../static/img/womenSel.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="infoList" @click="getLoclist">
					<view>学校</view>
					<view style="margin-top: 38upx;">{{riderSchool}}</view>
					<!-- <input placeholder-class="placeholderStyle" type="text" v-model="riderSchool" placeholder="请输入您的学校" @blur='isCanRes'/> -->
				</view>
				<view class="title2">注册账号</view>
				<view class="infoList">
					<view>手机号</view>
					<view class="phoneBox">
						<view>
							<text>+86</text>
							<image src="../../../static/img/bottom.png" mode=""></image>
						</view>
						<input placeholder-class="placeholderStyle" type="text" v-model="phoneNum" placeholder="请输入您的手机号" @blur='isCanRes'/>
					</view>
				</view>
				<view class="infoList">
					<view>验证码</view>
					<view class="codeBox">
						<input placeholder-class="placeholderStyle" type="text" v-model="riderCode" placeholder="请输入验证码" @blur='isCanRes'/>
						<view @click="getVerCode()" v-if="!sendcode">获取验证码</view>
						<view v-else style="color: #ccc;">已发送</view>
					</view>
				</view>
			</view>
			<view class="btn1" v-if="canRes" @click="riderRes()">注册</view>
			<view class="btn2" v-else>注册</view>
			<!-- <wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton> -->

			<!-- 底部信息 -->
			<view class="footer">
				<!-- <text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>注册即代表你同意</text> -->
				<!-- <text style="font-size: 14px;">注册即代表你同意</text> -->
				<!-- 协议地址 -->
				<!-- <navigator style="color: #005cbf;" url="@/pages/base/protocol/protocol" open-type="navigate">《协议》</navigator> -->
			</view>
		</view>
		
		<view class="content2" v-if="audit_status==1">
			<image src="../../../static/img/isQiShou.png" mode=""></image>
			<view>您已成为骑手</view>
			
		</view>
		<view class="content2" v-if="audit_status==2">
			<image src="../../../static/img/shenhe.png" mode=""></image>
			<view>信息审核中</view>
		</view>
		<u-select v-model="show" :list="schoolList" @confirm="changeLoc"></u-select>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	const CryptoJS = require("crypto-js");
	export default {
		data() {
			return {
				//logo图片 base64
				isSelectGender: 1,//性别 1男 2女
				riderName: '', //姓名
				riderSchool: '请选择学校', //学校
				phoneNum: '', // 用户/电话
				passData: '', //密码
				riderCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
				sendcode:false,//是否发送验证码
				canRes:false,//信息是否填写完成
				schoolList:[],//学校列表
				show:false,
				riderSchoolId:'',
				audit_status:0,//审核状态（1.已审核，2.待审核）
			}
		},
		components: {
			wInput,
			wButton,
		},
		onLoad() {
			this.getUserState();
		},
		mounted() {
			_this = this;
		},
		methods: {
			getUserState(){
				this.$u.post('/api/User/getRiderinfo').then(res=>{
					console.log(res)
					this.audit_status=res.data.audit_status
					
				})
			},
			getLoclist(){
				this.$u.get('/api/address/selectCampus').then(res=>{
					this.schoolList = []
					res.data.forEach((item,index)=>{
						this.schoolList.push({
							value:item.id,
							label:item.name
						})
					})
					this.show = true
				})
			},
			changeLoc(e){
				this.riderSchool = e[0].label;
				this.riderSchoolId = e[0].value;
				this.isCanRes();
			},
			isCanRes(){
				if(this.riderName && this.riderSchool!='请选择学校' && this.phoneNum && this.riderCode){
					this.canRes=true;
				}
			},
			getVerCode() {
				//获取验证码
				console.log(this.phoneNum)
				if (_this.phoneNum.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				console.log("获取验证码")
				this.$u.get('/api/sms/send', {
					type: 'rider',
					mobile: this.phoneNum,
					event: 'register'
				}).then(res => {
					this.sendcode=true;
					// this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
					// uni.showToast({
					// 	icon: 'none',
					// 	position: 'bottom',
					// 	title: res.data.msg
					// });

					setTimeout(function(){
						_this.sendcode=false;
						// _this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
						// uni.showToast({
						//     icon: 'none',
						// 	position: 'bottom',
						//     title: '模拟倒计时终止'
						// });
					},30000)
				})

			},
			riderRes(){
				if(this.riderName.length==0){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请填写姓名'
					});
					return;
				}
				if (this.riderSchool=='请选择学校') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请选择学校'
					});
					return false;
				}
				if (this.phoneNum.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.riderCode.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}
				this.$u.post('/api/rider_login/riderSignUp', {
					username: this.riderName,
					gender: this.isSelectGender,
					phone:this.phoneNum,
					campus_id:this.riderSchoolId,
					code: this.riderCode
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: true
					})
					console.log(res)
					if (res.code == 1) {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/user/center/center'
							})
						},1000)
				
					}
				
				
				
				})
			},
			startReg() {
				var that = this;
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return false;
				}
				if (this.verCode.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}
				this.$u.get('/api/user/register', {
					mobile: this.phoneData,
					password: this.passData,
					code: this.verCode
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: true
					})
					console.log(res)
					if (res.code == 1) {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						})

					}



				})
			},
			//字符串加密
			/* strEncode($data){
				
				var key = CryptoJS.enc.Latin1.parse('BC1F5E3BAEE198AC');
				var iv = CryptoJS.enc.Latin1.parse('1F5E3BAEE198ACE1');
				var encoded = CryptoJS.AES.encrypt($data, key,{
						 iv: iv,
						 mode: CryptoJS.mode.CBC,//模式
						 adding: CryptoJS.pad.ZeroPadding
					}).toString();
				if(!encoded){
					return '';
				}
				return encoded
			}, */
		}
	}
</script>

<style lang='scss'>
	page {
		background: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 100upx;
	}

	.title {
		color: #333333;
		font-size: 34upx;
		text-align: center;
	}

	.infoBox {
		margin: 46upx 0;
		padding: 0 75upx;
		width: 100%;

		.placeholderStyle {
			color: #999999;
			font-size: 28upx;
		}

		input {
			color: #333;
			font-size: 28upx;
		}

		.infoList {
			padding: 20upx 0;
			border-bottom: 2upx #000000 dashed;

			view {
				color: #333;
				font-size: 30upx;
			}

			input {
				margin-top: 38upx;
			}

			.genderBox {
				display: flex;
				align-items: center;

				.genderList {
					display: flex;
					align-items: center;
					width: 50%;
					margin-top: 38upx;

					image {
						width: 40upx;
						height: 40upx;
					}

					.selectText1 {
						color: #3587FF;
					}

					.selectText2 {
						color: #FFA5CE;
					}

					text {
						margin: 0 11upx;
						font-size: 24upx;
					}

					.selectGender {
						width: 36upx;
						height: 26upx;
					}
				}

			}

			.phoneBox {
				display: flex;
				margin-top: 38upx;
				align-items: center;

				input {
					margin: 0;
				}

				view {
					display: flex;
					align-items: center;
					font-size: 24upx;
					color: #333;

					image {
						margin: 0 34upx 0 11upx;
						width: 19upx;
						height: 12upx;
					}
				}
			}

			.codeBox {
				display: flex;
				justify-content: space-between;
				margin-top: 38upx;
				align-items: center;

				input {
					margin: 0;
				}

				view {
					color: #F6CB4B;
					font-size: 26upx;
				}
			}
		}

		.title2 {
			margin: 46upx 0 37upx;
			text-align: center;
			color: #333;
			font-size: 32upx;
		}
	}
	.btn1,.btn2{
		margin: 65upx auto 20upx;
		width: 605upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 38upx;
		text-align: center;
		background: #F6CB4B;
		color: #fff;
		font-size: 36upx;
	}
	.btn2 {
		/* margin: 65upx auto 20upx;
		width: 605upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 38upx;
		text-align: center; */
		background: #CCCCCC;
		color: #fff;
		/* font-size: 36upx; */
	}
	.content2{
		margin-top: 251upx;
		text-align: center;
		color: #4D4D4D;
		font-size: 30upx;
		image{
			width: 183upx;
			height: 242upx;
		}
		view{
			margin-top: 18upx;
		}
	}
	/* <view class="content2" v-if="audit_status==2">
		<image src="../../../static/img/shenhe.png" mode=""></image>
		<view>信息审核中</view>
	</view> */
</style>
