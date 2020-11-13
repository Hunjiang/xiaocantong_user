<template>
	<view class="container">
		<hx-navbar title="订单状态" color="#ffffff" :fixed="true" :backgroundColor="[[255, 235, 59, 1],[255, 193, 7, 1]]"></hx-navbar>

		<view class="contain_top">
			<view v-for="(item, index) in sortList" :key="index" @click="changeSort(index)">
				<text :class="{'active': sortIndex == index}">{{item.tit}}</text>
			</view>
		</view>


		<view class="main" v-if="sortIndex == 0">
			<view class="content_main">
				<view class="content_left">

					<view class="main_top">
						订单提交成功
					</view>
					<view class="contain_right">
						2222-10-10 12:21:35
					</view>
					<view class="main_bottom">
						请耐心等待，商家确定
					</view>
				</view>
			</view>
			<view class="content_main">
				<view class="content_left">

					<view class="main_top">
						商家待接单
					</view>
					<view class="contain_right">
						2222-10-10 12:21:35
					</view>
					<view class="main_bottom">
						正在等待商家接单
					</view>
				</view>
			</view>

			<view class="content_main">
				<view class="content_left">

					<view class="main_top">
						商家已接单
					</view>
					<view class="contain_right">
						2222-10-10 12:21:35
					</view>
					<view class="main_bottom">
						正在为您准备商品, 如有疑问, 可致电商家
					</view>
				</view>
			</view>

			<view class="content_main">
				<view class="content_left">

					<view class="main_top">
						<text class="mtaop_left">骑手已取货</text>
						<image src="../../static/img/user/phone3.png" mode=""></image>
					</view>
					<view class="contain_right">
						2222-10-10 12:21:35
					</view>
					<view class="main_bottom">
						正在配送中， 请等待配送
					</view>
				</view>
			</view>

			<view class="content_main">
				<view class="content_left">

					<view class="main_top">
						订单已完成
					</view>
					<view class="contain_right">
						2222-10-10 12:21:35
					</view>
					<view class="main_bottom">
						已完成， 记得五星好评哦~
					</view>
				</view>
			</view>




			<view class="line_left">
				<view class="circle circle1">
				</view>
				<view class="circle circle2">
				</view>
				<view class="circle circle3">
				</view>
				<view class="circle circle4">
				</view>
				<view class="circle circle5">
				</view>
			</view>

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
			margin: 47rpx 42rpx;
			padding-left: 32rpx;
			position: relative;

			.line_left {
				width: 2rpx;
				height: 751rpx;
				position: absolute;
				top: 20rpx;
				left: 8rpx;
				background-color: #FFD621;
				

				.circle {
					width: 17rpx;
					height: 17rpx;
					border-radius: 17rpx;
					background:-webkit-linear-gradient(top, #FFC309, #FFE735);
					background:-moz-linear-gradient(top, #FFC309, #FFE735);
					background:-o-linear-gradient(top, #FFC309,#FFE735);
					
				}

				.circle1 {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translate(-50%, 0);
				}
				.circle2 {
					position: absolute;
					top: 210rpx;
					left: 50%;
					transform: translate(-50%, 0);
				}
				.circle3 {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				.circle4 {
					position: absolute;
					bottom: 185rpx;
					left: 50%;
					transform: translate(-50%, 0);
				}
				.circle5 {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}

			.content_main {
				// border: 1rpx solid red;
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				// align-items: center;
				margin-bottom: 93rpx;

				.main_top {
					line-height: 1;
					font-size: 28rpx;
					font-weight: 700;
					color: #4B4B4D;
					display: flex;
					align-items: center;
					// border: 1rpx solid green;				
					image {
						width: 47rpx;
						height: 47rpx;
						margin-left: 18rpx;
					}
				}

				.contain_right {

					text-align: right;
					font-size: 18rpx;
					color: #666666;
					padding-bottom: 9rpx;
					// padding-right: 42rpx;

					// border: 1rpx solid #0081FF;
				}

				.main_bottom {
					line-height: 1;
					// border: 1rpx solid #1CBBB4;
					font-size: 24rpx;
					color: #999999;
				}

			}
		}








	}
</style>
