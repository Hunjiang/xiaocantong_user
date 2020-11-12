<template>
	<view class="container">
		<hx-navbar title="订单状态" color="#ffffff" :fixed="true" :backgroundColor="[[255, 235, 59, 1],[255, 193, 7, 1]]"></hx-navbar>

		<view class="contain_top">
			<view v-for="(item, index) in sortList" :key="index" @click="changeSort(index)">
				<text :class="{'active': sortIndex == index}">{{item.tit}}</text>
			</view>
		</view>


		<view class="main" v-if="sortIndex == 0">
			<u-time-line>
					<u-time-line-item >
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="content_main">
									<view class="content_left">
										<text class="main_top">
											订单提交成功
										</text>
										<text class="main_bottom">
											请耐心等待，商家确认
										</text>
										
									</view>
									<view class="">
										2222
									</view>
								</view>
								<!-- <view  class="u-order-title">商家等待接单</view>
								<view class="u-order-desc">正在等待商家接单</view>
								<view class="u-order-time">2019-12-06 22:30</view> -->
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item >
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view  class="u-order-title">商家等待接单</view>
								<view class="u-order-desc">正在等待商家接单</view>
								<view class="u-order-time">2019-12-06 22:30</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
		</view>





		<view class="" v-else>
			22222
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
					tit: '订单状态'
				}, {
					tit: '订单详情'
				}],
				sortIndex: 0, //判断是状态还是详情的下标
			}
		},

		// 组件方法
		methods: {
			changeSort(i) {
				this.sortIndex = i
				this.storeList = []
				// this.getShop()
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.container {
		.contain_top {
			// border: 1rpx solid green;
			display: flex;
			justify-content: space-between;
			padding: 27rpx 126rpx 26rpx;
			border-bottom: 2rpx solid #F0F0F0;
			font-size: 31rpx;
			font-weight: 700;
			color: #999999;

			.active {
				padding-bottom: 21rpx;
				border-bottom: 3rpx solid #FFD019;
				color: #4B4B4D;
			}
		}
		
		.main {
			margin: 47rpx 40rpx;
			
			.content_main {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.content_left {
					display: flex;
					flex-direction: column;
					.main_bottom {
						margin-top: ;
					}
					}
			}
			
			
		
				
				.u-order-title {
					color: #333333;
					font-weight: bold;
					font-size: 32rpx;
				}
				
				.u-order-desc {
					color: rgb(150, 150, 150);
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}
				
				.u-order-time {
					color: rgb(200, 200, 200);
					font-size: 26rpx;
				}
			}
			
			
			
			
			
			
		
		
	}
</style>
