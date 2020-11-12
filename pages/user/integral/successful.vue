<template>
	<view class="container">
	<view class="main">
		<view class="main_top">
			<image src="../../../static/img/user/rounded.png"></image>
			<text>工作人员会在48小时</text>
			<image src="../../../static/img/user/rounded.png"></image>
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
  methods: {},
}
</script> 

<style scoped lang="scss">
	.container {
		.main {
			
			
			border: 1rpx solid red;
		
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 10rpx;
			background-color: #FFFFFF;
			
			.main_top {
				border: 1rpx solid green;
				display: flex;
				// justify-content: ;
				align-items: center;
			}
			image {
				width: 33rpx;
				height: 23rpx;
			}
			text{
				font-size: 32rpx;
			}
			
		}
	}
</style>