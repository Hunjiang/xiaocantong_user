<template>
	<view class="container">
		<hx-navbar color="#ffffff" title="积分商城" :fixed="true" :backgroundColor="[[255, 235, 59, 1],[255, 193, 7, 1]]"></hx-navbar>
		<view class="container_main">
			<view class="contain_box">
				<view v-for="(item, id) in list" :key="id" class="contain">
					<navigator :url="'/pages/user/integral/details?id='+item.id">
						<image mode="aspectFill" :src="base+item.img"></image>
						<view class="contain_bottom">
							<text>{{item.name}}</text>
							<text class="integral">{{item.price}}积分</text>
						</view>
					</navigator>
				</view>
				<!-- <view class="contain">
					<image></image>
					<view class="contain_bottom">
						<text>文字 数码家电手机</text>
						<text class="integral">8990积分</text>
					</view>
				</view>
				
				<view class="contain">
					<image></image>
					<view class="contain_bottom">
						<text>文字 数码家电手机</text>
						<text class="integral">8990积分</text>
					</view>
				</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				base: this.$base,
			};
		},
		onLoad() {
			this.getGoodsScore()
		},
		methods: {
			// 获取商品列表
			getGoodsScore() {
				this.$u.post('/api/goods/goodsScore').then(res => {
					console.log(res);
					let {
						list
					} = res.data
					this.list = list
					console.log(this.list);
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.container {


		.container_main {
			padding: 38rpx 30rpx;

			.contain_box {
				display: flex;
				justify-content: space-between;

				flex-wrap: wrap;

				.contain {
					margin-bottom: 18rpx;

					image {
						width: 338rpx;
						height: 266rpx;
						background-color: #eeeeee;
					}

					.contain_bottom {
						margin: 20rpx 18rpx 45rpx;
						display: flex;
						flex-direction: column;
						font-size: 27rpx;
						font-weight: 700;
						color: #5E5E5E;

						.integral {
							margin-top: 28rpx;
							color: #FDCA46;
						}
					}
				}
			}
		}
	}
</style>
