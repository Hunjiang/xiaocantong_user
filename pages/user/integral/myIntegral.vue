<template>
	<view class="container">
		<view class="header_box">
			1111
		</view>





		<view class="center_box">
			111
			<view class="center_record">
				<view class="record_before">
					<text>最近30天内积分记录</text>
				</view>

			</view>




			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					积分
				</view>
			</view>
			<view class="record_contain">
				<view class="record_left">
					时间
				</view>
				<view class="record_right">
					积分
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
	.container {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;

		.header_box {
			width: 750rpx;
			height: 366rpx;
			background: linear-gradient(100deg, #FFEB3B, #FFC107);
		}




		.center_box {
			margin: 36rpx 23rpx;

			.record_before {
				border-left: 9rpx solid #FFC307;
				padding-left: 5rpx;

				text {
					font-size: 27rpx;
					font-weight: 700;
				}
			}
			
			.record_contain {
				display: flex;
				justify-content: space-between;
				padding: 34rpx 0;
				
			}
		}
	}
</style>
