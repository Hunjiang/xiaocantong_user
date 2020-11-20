<template>
	
	<view class="container">
		<view class="header_box">
			<navigator url="/pages/user/integral/record" class="convert">
				<text>兑换记录</text>
				<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
			</navigator>


			<view class="my_integral">
				<view class="record">
					{{record}}
				</view>
				<text>我的积分</text>
				<navigator url="/pages/user/integral/integralShop" class="integral_shop">
					<!-- <u-icon class='shop_left' name="arrow-right" color="#FFFFFF" size="24"></u-icon> -->
					<view class="outside">
						<image class='shop_left' src="../../../static/img/user/shoping.png"></image>
						<text class="shop_right">积分商城</text>
					</view>
					
					
				</navigator>

				
			</view>
		</view>




<mescroll-body ref="mescrollRef" :down="downOption" @down="downCallback" @up="upCallback">
		<view class="center_box">
			<view class="center_record">
				<view class="record_before">
					<text>最近积分记录</text>
				</view>

			</view>

			<view class="bd">

			</view>
			<view class="emptyBox" v-if="integralList.length==0">
				<image src="../../../static/img/jf.png" mode=""></image>
				<view>
					暂无兑换记录呦~
				</view>
			</view>
			<view class="record_after">
				
				
				<view v-for="(item,i) in integralList" :key="i"  class="record_contain">
					<view class="record_left">
						{{item.createtime | timeStamp}}
						
					</view>
					<view class="record_right">
						{{item.price}}积分
					</view>
				</view>
				
				
			</view>
			
		</view>
		</mescroll-body>
	</view>
	
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], 
		components:{
			MescrollBody
		},
		onPageScroll(e){
			let that= this;
			if(e.scrollTop>10){
				console.log(555)
				let view = uni.createSelectorQuery().select(".center_box");
				view.fields({
					rect: true
				}, res => {
					console.log(res)
					if(res.top == 0){
						that.GDHEAD = 1;
					}else{
						that.GDHEAD = 0;
					}
					
				}).exec();
			}
			
		},
		data() {
			return {
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				page:1,  //页码数
				record:0, // 积分分数
				integralList:[],//兑换记录
			};
		},
		filters: {
					timeStamp: function(value) {    //具体到时分秒
						var date = new Date(value*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
						console.log(date)
						var year = date.getFullYear();
						var month = ("0" + (date.getMonth() + 1)).slice(-2);
						var sdate = ("0" + date.getDate()).slice(-2);
						var hour = ("0" + date.getHours()).slice(-2);
						var minute = ("0" + date.getMinutes()).slice(-2);
						var second = ("0" + date.getSeconds()).slice(-2);
						// 拼接
						var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
						// 返回
						return result;
					}
				},
		mounted() {
			let that = this;
			// that.getUrlData()
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				let that = this;
				//联网成功的回调,隐藏下拉刷新的状态
				that.mescroll.endSuccess();
				// setTimeout(()=>{
				// 	that.mescroll.endSuccess();
				// },1500)
				//联网失败的回调,隐藏下拉刷新的状态
				this.mescroll.endErr();
			},
			upCallback(page) {
				let that = this;
				//加载门店数据
				// that.integralList = testData.integralList;
				//无更多商家
				that.showFoot = true;
				//隐藏加载
				that.mescroll.endSuccess(10);
				// setTimeout(()=>{
					//加载门店数据
					// that.integralList = testData.integralList;
					//无更多商家
					that.showFoot = true;
					//隐藏加载
					// that.mescroll.endSuccess(10);
				// },1500)
				that.getUrlData()
			},
			getUrlData(){
				var that = this
				this.$u.post('/api/user/myScore',{
					page:this.page,
					limit:10
				}).then(res=>{
					if(res.code==1){
						this.record=res.data.score
						that.page++
						if(res.data.list.length==0){
							uni.showToast({
								title:'没有更多记录了',
								icon:'none'
							})
						}else{
							if(this.integralList.length == 0){
								this.integralList = res.data.list
							}else{
								this.integralList = this.integralList.concat(res.data.list)
							}
						}
						
					}else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})	
					}
			
					
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
				padding: 12rpx 8rpx 14rpx 16rpx;
				border-top-left-radius: 56rpx;
				border-bottom-left-radius: 56rpx;
				text {
					font-size: 24rpx;
					margin-right: 14rpx;
					color: #FFFFFF;
				}
			}

			.my_integral {
				// border: 1rpx solid red;
				position: absolute;
				top: 55%;
				left: 50%;
				width: 100%;
				transform: translate(-50%, -45%);
				text-align: center;
				color: #FFFFFF;

				.record {
					font-size: 70rpx;
					font-weight: 700;
					margin-bottom: 23rpx;
				}

				text {
					font-size: 26rpx;
					// margin-top: 23rpx;
					// margin-bottom: 37rpx;
				}

				.integral_shop {
					// margin-top: 37rpx;
					// border: 1rpx solid #F5F5F5;
					// border-radius: 62rpx;
					// align-items: center;
					.outside{
						overflow:hidden;
						width: 256rpx;
						padding:16rpx 39rpx 18rpx 55rpx;
						border: 1rpx solid #F5F5F5;
						border-radius: 62rpx;
						margin: 37rpx auto;
					.shop_left {
						margin-right: 17rpx;
						width: 31rpx;
						height: 29rpx;
					}
					.shop_right {
						font-size: 28rpx;
					}	
						
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
				border-top: 5rpx dashed #F5F5F5;
			}

			.record_after {

				.record_contain {
					display: flex;
					justify-content: space-between;
					padding: 34rpx 0;
					border-bottom: 5rpx dashed #F5F5F5;

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
	.emptyBox{
			margin-top: 150upx;
			text-align: center;
			color: #888888;
			font-size: 30upx;
			view{
				text-align: center;
			}
			image{
				width: 260upx;
				height: 170upx;
				margin-bottom: 41upx;
			}
		}
</style>
