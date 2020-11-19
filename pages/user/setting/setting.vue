<template>
	<view>
		<view class="userImg" @click="chooseAvatar">
			<view>
				头像
			</view>
			<view class="imgBox">
				<image :src="base+userInfo.avatar" mode=""></image>
				<image src="../../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<view class="userImg"  @click="showForm=true">
			<view>
				昵称
			</view>
			<view class="imgBox">
				<text>{{userInfo.nickname}}</text>
				<image src="../../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="info" title="用户昵称" @click="showForm=true"></u-cell-item>
				<u-cell-item icon="man" title="性别"></u-cell-item>
				<u-cell-item icon="phone" title="手机"></u-cell-item>
			</u-cell-group>
		</view> -->
		
		<u-modal show-cancel-button v-model="showForm"  :async-close="true" @confirm="confirm">
			<u-field v-model="nickname" label="昵称" placeholder="请填写用户昵称">
			</u-field>
		</u-modal>
		
		<view class="loginOut" @click="loginOut">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
				showForm:false,
				base:this.$base,
				nickname:''
			}
		},
		onLoad() {
			
		},
		methods: {
			loginOut(){
				uni.showModal({
					title:'提示',
					content:'退出登陆？',
					success: (res) => {
						if(res.confirm){
							this.$u.get('/api/user/logout').then(res=>{
								if(res.code==1){
									uni.showToast({
										title:res.msg,
										icon:'none',
										mask:true,
										success: () => {
											uni.clearStorageSync()
											setTimeout(()=>{
												uni.navigateBack();
											},1500)
										}
									})
									
								}
							})
						}
					}
				})
			},
			chooseAvatar() {
				this.$u.route({
					url: 'pages/avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			getUserinfo(){
				this.$u.get('/api/user/getUserinfo').then(res=>{
					this.userInfo = res.data
				})
			},
			confirm(){
				if(this.nickname.length<1){
					uni.showToast({
						title:'昵称不能为空',
						icon:'none'
					})
					this.showForm = false;
					return;
				}
				this.$u.get('/api/user/profile',{
					avatar:this.userInfo.avatar,
					nickname:this.nickname
				}).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
						this.nickname = ''
						this.showForm = false
						this.getUserinfo()
					}
				})
			}
		},
		onShow() {
			this.getUserinfo()
		},
		created() {
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: this.$base+'/api/common/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						this.$u.get('/api/user/profile',{
							avatar:JSON.parse(res.data).data.url,
							nickname:this.userInfo.nickname
						}).then(res=>{
							if(res.code==1){
								uni.showToast({
									title:'修改成功',
									icon:'none'
								})
								this.getUserinfo()
							}
						})
						console.log(JSON.parse(res.data).data.url)
					}
				});
			})
		},
		
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.loginOut{
	text-align: center;
	background-color: #fff;
	height: 100upx;
	line-height: 100upx;
	margin-top: 12upx;
	color: #555555;
	font-size: 30upx;
}
.userImg{
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 25upx 45upx;
	margin-bottom: 10upx;
	.imgBox{
		display: flex;
		align-items: center;
		text{
			margin-right: 45upx;
		}
		image:first-child{
			border-radius: 50%;
			width: 100upx;
			height: 100upx;
			margin-right: 45upx;
		}
		image:last-child{
			width: 16upx;
			height: 28upx;
		}
	}
}
// <view class="userImg">
// 			<view>
// 				头像
// 			</view>
// 			<view class="imgBox">
// 				<image :src="base+userInfo.avatar" mode=""></image>
// 				<image src="../../../static/img/right.png" mode=""></image>
// 			</view>
// 		</view>
</style>
