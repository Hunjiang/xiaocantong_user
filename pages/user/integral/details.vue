<template>
	<view class="container">
		<image :src="base+list.img" mode="aspectFill"></image>
		<u-icon class="contain_icon" @click="backTop" name="arrow-left" color="#FFFFFF" size="44"></u-icon>
		<view class="contain_box">
			<view class="contain_top">
				<text>
					{{list.name}}
				</text>
				<text class="contain_right">{{list.price}}积分</text>
			</view>


			<view class="contain_main">
				<view class="detail">
					<text>描述详情</text>
					<text class="detail_bottom">{{list.desc}}</text>
				</view>
			</view>


			<view class="info">联系信息</view>
			<view class="adress">
				<navigator url="/pages/user/address/address" style="display: flex;align-items: center;">
					<text class="txt1">{{addressData?addressData.campus_name+' '+addressData.detail:'暂无可用地址,请新建地址'}}</text>
					
				</navigator>

			</view>

			<view class="remark">
				<text>备注：</text>
				<u-input v-model="remark"/>
			</view>
			<view class="btn" @click="confirm">
				确 认 兑 换
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				list: [],
				//收获地址
				addressData: null,
				remark: '',
				base: this.$base,
			}
		},
		onLoad(operation) {
			this.id = operation.id
			// console.log(this.id);
			this.getDetail()
		},
		onShow() {
			var that = this
			uni.getStorage({
			    key: 'addressData',
			    success: function (res) {
			      that.addressData=res.data
				  // 移除
				  uni.removeStorageSync({
					   key: 'addressData'
				  })
			    }
			}) 
		
		},


		methods: {
			// 获取详情列表
			
			getDetail() {
				this.$u.post('/api/goods/goodsScoreDetails', {
					goods_id: this.id
				}).then(res => {
					console.log(res);
					let {list} = res.data
					this.list = list
					console.log(this.list);
					if(res.data.address) {
						this.addressData = res.data.address
					}
				})
			},
			// 返回上一级
			backTop() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 兑换提示
			confirm() {
			uni.showModal({
			    title: '提示',
			    content: '确认兑换吗?',
			    success: res => {
					
			        if (res.confirm) {
						// console.log(this.addressData.id)
			   //          console.log('用户点击确定');
						
						
						
						// 一下是请求接口
						this.$u.post('/api/order/scoreSubmit', {
							goods_id:Number(this.id),
							address_id: this.addressData.id,
							remark: this.remark, //备注
							count: 1
						}).then(res => {
							if(res.code==1){
								uni.navigateTo({
								               url: '/pages/user/integral/successful?ss=1',
								});
							}
							
					
						
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			}
		},
	}
</script>

<style scoped lang="scss">
	.container {
		position: relative;

		image {
			width: 100%;
			height: 600rpx;
			background-color: #CCCCCC;
		}

		.contain_icon {
			position: absolute;
			top: 76rpx;
			left: 20rpx;
		}

		.contain_box {
			width: 100%;
			border-radius: 30rpx 30rpx 0 0;
			padding: 70rpx 49rpx 0 49rpx;
			position: absolute;
			top: 573rpx;
			background-color: #FFFFFF;

			.contain_top {
				display: flex;
				justify-content: space-between;
				font-size: 33rpx;
				font-weight: 700;

				.contain_right {
					font-size: 29rpx;
					color: #F94C4E;
				}
			}

			.contain_main {
				margin-top: 33rpx;
				padding: 17rpx 26rpx 22rpx;
				background-color: #F8F8F8;

				.detail {
					display: flex;
					flex-direction: column;
					font-size: 29rpx;
					font-weight: 700;

					.detail_bottom {
						margin-top: 20rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
					}
				}
			}

			.info {
				font-size: 31rpx;
				font-weight: 700;
				padding: 27rpx 0 13rpx 0;
			}

			.adress {
				padding: 42rpx 22rpx;
				font-size: 25rpx;
				background-color: #F8F8F8;
				color: #828282;
			}

			.remark {
				display: flex;
				align-items: center;
				margin-top: 34rpx;
				padding: 42rpx 21rpx;
				font-size: 26rpx;
				font-weight: 700;
				background-color: #F8F8F8;
			}
		}

		.btn {
			width: 565rpx;
			height: 88rpx;
			margin: 40rpx auto;
			margin-bottom: 25rpx;
			text-align: center;
			line-height: 88rpx;
			background: linear-gradient(100deg, #FFEB3B, #FFC208);
			font-size: 34rpx;
			font-weight: 700;
			color: #333333;
		}
	}
</style>
