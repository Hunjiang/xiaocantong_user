<template>
	<view class="container">
		<view class="header_box">
			<navigator url="/pages/user/integral/record" class="convert">
				<text>兑换记录</text>
				<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
			</navigator>
			
			
			<view class="my_integral">
				<view class="record">
					300
				</view>
				<text>我的积分</text>
				<navigator url="/pages/user/integral/integralShop" class="integral_shop">
					<u-icon class='shop_left' name="arrow-right" color="#FFFFFF" size="24"></u-icon>
					<text class="shop_right">积分商城</text>
				</navigator>
			</view>
		</view>





		<view class="center_box">
			<view class="center_record">
				<view class="record_before">
					<text>最近30天内积分记录</text>
				</view>

			</view>

		<view class="bd">
			
		</view>

		<view class="record_after">
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					+积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					+积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					+积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					+积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					+积分
				</view>
			</view>
			
			
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
	background-color: #FFFFFF;
	}
	.container {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;

		.header_box {
			position: relative;
			width: 750rpx;
			height: 366rpx;
			background: linear-gradient(100deg, #FFEB3B, #FFC208);
			.convert {
				position: absolute;
				top: 42rpx;
				right: 0;
				background-color: #FFDB66;
				padding: 14rpx 8rpx 14rpx 16rpx;
				border-top-left-radius: 56rpx;
				border-bottom-left-radius: 56rpx;
				text {
					margin-right: 14rpx;
					color: #FFFFFF;
				}
			}
			.my_integral {
				// border: 1rpx solid red;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -45%);
				text-align: center;
				color: #FFFFFF;
			.record {
				font-size: 61rpx;
				font-weight: 700;	
				margin-bottom: 23rpx;
			}
			text {
				font-size: 26rpx;	
				// margin-top: 23rpx;
				// margin-bottom: 37rpx;
			}
			.integral_shop {
				margin-top: 37rpx;
				border: 1rpx solid #F5F5F5;
				border-radius: 62rpx;
				padding: 16rpx 55rpx;
				display: flex;
				justify-content: space-between;
				.shop_left {
					margin-right: 17rpx;
				}
				.shop_right {
					font-size: 28rpx;
				}
			}
			}
		}




		.center_box {
			margin: 36rpx 23rpx;

			.record_before {
				// border-left: 9rpx solid #FFC307;
				padding-left: 5rpx;
				margin-bottom: 43rpx;
				
				
				text {
					position: relative;
					font-size: 27rpx;
					font-weight: 700;
					padding-left: 14rpx;
					
				:before {
					content: '';
					display: inline-block;
					width: 9rpx;
					height: 26rpx;
					 position: absolute;
					 top: 0;
					 left: 0;
					background-color: #FFC307;
				}	
				}
				
			}
			.bd {
				border-top: 1rpx solid #F5F5F5;
			}
			.record_after {
				
				.record_contain {
					display: flex;
					justify-content: space-between;
					padding: 34rpx 0;
					border-bottom: 1rpx solid #F5F5F5;
				.record_left {
					font-size: 20rpx;
					color: #888888;
				}
				.record_right {
					font-size: 22rpx;
					color: #FD1200;
				}
				}
				
			}
			
		}	
	}
</style>
