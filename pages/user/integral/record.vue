<template>
	<view class="container">
		<hx-navbar title="兑换记录" color="#ffffff" :fixed="true" :backgroundColor="[[255, 235, 59, 1],[255, 193, 7, 1]]"></hx-navbar>

		<view class="container_main">
			<view class="shop_convert">
				<text>商品兑换记录</text>
				<u-icon name="arrow-down-fill" color="#FFC50B" size="16"></u-icon>
			</view>

			<view class="convert_box">
				<view class="convert_date">
					<text class="date_left">兑换日期:</text>
					<text class="date_right">2020-11-04-12:45:20</text>
				</view>
				<view class="convert_contain">
					<view class="contain_left">
						<u-image width="82rpx" height="83rpx" :src="src"></u-image>
						<text>文字数码家电手机</text>
					</view>
					<view class="contain_right">
						1000 积分
					</view>
				</view>
			</view>

			<view class="convert_box">
				<view class="convert_date">
					<text class="date_left">兑换日期:</text>
					<text class="date_right">2020-11-04-12:45:20</text>
				</view>
				<view class="convert_contain">
					<view class="contain_left">
						<!-- <u-image width="82rpx" height="83rpx" :src="src"></u-image> -->
						<text>文字数码家电手机</text>
					</view>
					<view class="contain_right">
						1000 积分
					</view>
				</view>
			</view>
			<view class="convert_box">
				<view class="convert_date">
					<text class="date_left">兑换日期:</text>
					<text class="date_right">2020-11-04-12:45:20</text>
				</view>
				<view class="convert_contain">
					<view class="contain_left">
						<!-- <u-image width="82rpx" height="83rpx" :src="src"></u-image> -->
						<text>文字数码家电手机</text>
					</view>
					<view class="contain_right">
						1000 积分
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>


<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.container {
		.container_main {
			width: 100%;
			height: 100%;
			padding: 39rpx 25rpx;

			.shop_convert {
				font-size: 34rpx;
				margin-bottom: 50rpx;

				text {
					background-image: linear-gradient(90deg, #FFEB3B, #FFC208);
					-webkit-background-clip: text;
					color: transparent;
					margin-right: 5rpx;
				}
			}

			.convert_box {
				margin-bottom: 90rpx;
				border-radius: 25rpx;
				box-shadow: 0 0 50rpx #cfcfcf;

				.convert_date {
					margin: 15rpx 10rpx;
					padding: 15rpx 10rpx 30rpx 10rpx;
					font-size: 26rpx;
					border-bottom: 1rpx solid #F2F2F2;

					.date_left {
						font-weight: 700;
						margin-right: 10rpx;
					}

					.date_right {
						color: #666666;
					}
				}

				.convert_contain {
					padding: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.contain_left {
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							margin-left: 4rpx;
							font-size: 29rpx;
							font-weight: 700;
						}
					}

					.contain_right {
						color: #FCC148;
						font-size: 30rpx;
						font-weight: 700;
					}
				}
			}
		}
	}
</style>
