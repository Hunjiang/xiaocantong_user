<template>
	<view class="container">
		<image class="coinlogo" src="../../../static/img/user/success.png" mode=""></image>
	<view class="main">
		<view class="main_top">
			<image src="../../../static/img/user/rounded.png"></image>
			<text>工作人员会在48小时内联系您</text>
			<image src="../../../static/img/user/rounded.png"></image>
		</view>
		<view @click="backLast" class="main_bottom">
			知道了
		</view>
		
	</view>
	</view>
</template>

<script>
export default {
  data () {
   return {}
  },
  // 组件方法
  methods: {
	backLast(){
		uni.redirectTo({
			url:'/pages/user/integral/myIntegral'
		})
	},
	  
	  
	  
  },
}
</script> 

<style scoped lang="scss">
	.container {
		position: relative;
		.main {
			width:568rpx;
			height: 450rpx;
			margin: 465rpx auto;
			border: 1rpx solid red;
			padding: 10rpx;
			background-color: #FFFFFF;
			.main_top {
				width:455rpx;
				margin: 139rpx auto;
				overflow: hidden;
				margin-bottom:53rpx;
			}
			image {
				width: 33rpx;
				height: 23rpx;
				display: inline-block;
				float:left;
				margin-top: 10rpx;
			}
			text{
				width: 379rpx;
				text-align: center;
				font-size: 32rpx;
				display: inline-block;
				float: left;
			}
			.main_bottom{
				width:271rpx;
				height: 68rpx;
				font-size:36.25rpx;
				color:#000;
				text-align: center;
				background-color:#F6CB4B;
				line-height:68rpx;
				border-radius:68rpx;
				margin: 0 auto;
			}
			
		}
		.coinlogo{
			width:397rpx;
			height:219rpx;
			position: absolute;
			top:-170rpx;
			left: 175rpx;
			
		}
		
	}
</style>