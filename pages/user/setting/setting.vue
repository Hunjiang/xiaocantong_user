<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @tap="chooseAvatar">
			<view class="u-m-r-10">
				<u-avatar :src="base+userInfo.avatar" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickname}}</view>
				<view class="u-font-14 u-tips-color">手机号:{{userInfo.mobile}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="photo" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="info" title="用户昵称" @click="showForm=true"></u-cell-item>
<!-- 				<u-cell-item icon="man" title="性别"></u-cell-item>
				<u-cell-item icon="phone" title="手机"></u-cell-item> -->
			</u-cell-group>
		</view>
		
		<u-modal show-cancel-button v-model="showForm"  :async-close="true" @confirm="confirm">
			<u-field v-model="nickname" label="昵称" placeholder="请填写用户昵称">
			</u-field>
		</u-modal>
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
</style>
