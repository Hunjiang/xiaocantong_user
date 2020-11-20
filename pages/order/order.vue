<template>
	<view>
<!-- 		<view class="head">
			<view class="status"></view>
			<view class="search" @click="goSearch">
				<i class="hxicon-search"></i>
				<text class="tit">搜索我的订单</text>
			</view>
		</view> -->
		<view class="tabs-box">
			<view class="hx-tabs">
				<view class="hx-tabs-item" v-for="(item,i) in tabs" :key="i" :class="{'hx-tabs-active': swiperCurrent == i}" @click="swiperChange(i)" :style="{transition: transtionTime + 'ms'}">
					<text>{{item.name}}</text>
				</view>
				<view class="hx-tabs-slider-box" :style="{width: (100/tabs.length) + '%',transition: transtionTime + 'ms',left:swiperCurrentSliderLeft + '%'}">
					<view class="hx-tabs-slider"></view>
				</view>
			</view>
		</view>
		
		<view class="main" :style="{height: mainHeight}" >
			<swiper 
			id="mainSwiper"
			style="height: 100%;"
			:current="swiperCurrent" 
			:duration="transtionTime"
			@change="animationfinish">
				
				<swiper-item class="swiper-item"  v-for="data,x in tabs">
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								<view class="nullOrder" v-if="data.data && data.data.length == 0">
									<image src="../../static/img/zwdd.png" mode=""></image>
									<text class="tit">暂无订单呦~</text>
								</view>
								<block v-for="(order,j) in data.data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="base+order.shop[0].logo" mode=""></image>
										<view class="tit">
											<text>{{order.shop[0].name}}</text>
											<text v-if="order.shop[0].campus_name">({{order.shop[0].campus_name}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.order_status == 1 && order.refund_status==1"><text>待付款</text></view>
										<view class="right" v-if="order.order_status == 2  && order.refund_status==1"><text>已付款</text></view>
										<view class="right" v-if="order.order_status == 3  && order.refund_status==1"><text>已完成</text></view>
										<view class="right" v-if="order.refund_status != 1"><text>退款订单</text></view>
									</view>
									<view class="item-center">
										<view v-for="item,index of order.goods" class="item-good">
											<image :src="base+item.goods_image" mode=""  :key="index"></image>
											<view class="right">
												<view class="row">
													<text>商品名称：{{item.goods_name}}</text>
												</view>
												<view class="row">
													<text>商品单价：{{item.goods_price}}</text>
												</view>
												<view class="row">
													<text>商品规格：{{item.goods_spec_name}}</text>
												</view>
												<view class="row">
													<text>商品数量：X{{item.total_num}}</text>
												</view>
											</view>
										</view>
										
										
									</view>
									<view class="item-center">
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time_text}}</text>
											</view>
											<view class="row" v-if="order.pay_time_text.length!=0">
												<text>支付时间：{{order.pay_time_text}}</text>
											</view>
											<view class="row">
												<text>约定派送时间：{{order.user_delivery_time}}</text>
											</view>
											<view class="row"  v-if="order.rider_take_time_text">
												<text>骑手接单时间：{{order.rider_take_time_text}}</text>
											</view>
											<view class="row" v-if="order.delivery_time_text.length!=0">
												<text>实际送达时间：{{order.delivery_time_text}}</text>
											</view>
											
											<view class="row">
												<text>总价：￥{{order.pay_price}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										 <!-- 申请退款：退款未发起、订单已收货 -->
										<view class="btn bg-yellow" v-if="order.refund_status == 1  && order.order_status ==3" @click="refund(order.id)">申请退款</view>
										<!-- 去支付：订单未付款、退款未发起 -->
										<view class="btn bg-yellow" v-if="order.order_status == 1  && order.refund_status==1" @click="goPay(order.id)">去支付</view>
										<!-- 取消订单：骑手送单中、订单待付款-已付款-已取消-->
										<!-- <view class="btn bg-yellow" v-if="order.rider_status == 1  && order.order_status !=3" @click="cancel(order.id,x,j)">取消订单</view> -->
										<!-- 去评价：未评论、订单已收货 -->
										<view class="btn bg-yellow" v-if="order.is_comment == 1 && order.order_status == 3" @click="goComment(order.id)">去评价</view>
										<!-- 退款进度：退款进行中和已完成 -->
										<view class="btn bg-yellow" style="margin-right: 10upx;" v-if="order.refund_status != 1 " @click.stop="goRefund(order.id)">退款进度</view>
										<!-- 再来一单： -->
										<view class="btn bg-yellow" @click="goStore(order.shop_id, order.id)">再来一单</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
				
				
				
			</swiper>
			<u-modal show-cancel-button v-model="showField"  :async-close="true" @confirm="confirmRefund">
				<u-field v-model="excRefund" label="原因" placeholder="请填写退款原因">
				</u-field>
			</u-modal>
			
		</view>
		
	</view>
</template>

<script>
	var sysInfo = uni.getSystemInfoSync();
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	//引入测试数据
	import testData from "@/common/testdata.js";
	export default {
		data() {
			return {
				mainHeight: 0,
				statusBarHeight,
				tabs: [
					{name:'全部', data:[], api:'',load: false},
					{name:'待付款', data:[], api:'', load: false},
					{name:'待使用', data:[], api:'', load: false},
					{name:'待评价', data:[], api:'', load: false},
					{name:'退款', data:[], api:'', load: false},
				],
				swiperCurrent: 0,
				transtionTime:100,
				swiperCurrentSliderLeft: 0,
				orderData: [
					//1,2,3,4,5,6,7,8,9,10
				],
				triggered: true,
				//下拉刷新
				reloadDown: false,
				page:1,
				base:this.$base,
				showField:false,
				refundId:null, //退款ID
				excRefund:''
			}
		},
		onLoad(option) {
			
			this.mainHeight = sysInfo.screenHeight - statusBarHeight - 50 - 60 - 50 + 'px';
			this._freshing = false;
			if(option.state){
				this.swiperChange(option.state) 
				console.log(option.state);
			}else{
				// 全部订单 index为0
				this.getOrderData(0)
				// this.tabs[0].data= testData.ordersData
			}
		},
		mounted() {
			
		},
		onReachBottom() {
			uni.showToast({
				title:'已展示本列最近的最多50条订单！',
				icon:'none'
			})
		},
		methods: {
			// 再来一单
			goStore(storeId,orderId) {
			this.$u.post('/api/order/orderAgain', {
				order_id:orderId
			}).then(res=>{
				const {data} = res
				console.log('333333',data);
				 uni.setStorageSync('orderA', JSON.stringify(data));
				
			
				if(res.code == 1) {
					uni.redirectTo({
					    url: '/pages/store/index?sid=' + storeId+'&isAgain=true'
					});
				}
			})
				
				
								
				// this.$u.post('/api/order/orderAgain',{
				// 	order_id:this.refundId,
				// 	apply_desc:this.excRefund
				// }).then(res=>{
				// 	if(res.code==1){
				// 		this.refundId = null
				// 		this.excRefund = ''
				// 		uni.showToast({
				// 			title:res.msg,
				// 			icon:'none',
				// 			success: () => {
				// 				this.showField = false;
				// 				setTimeout(()=>{
				// 					uni.switchTab({
				// 						url:'/pages/user/center/center'
				// 					})
				// 				},1500)
				// 			}
				// 		})
				// 	}
				// })
				
				
				
			},
			confirmRefund(){
				this.$u.get('/api/order/orderRefund',{
					order_id:this.refundId,
					apply_desc:this.excRefund
				}).then(res=>{
					if(res.code==1){
						this.refundId = null
						this.excRefund = ''
						uni.showToast({
							title:res.msg,
							icon:'none',
							success: () => {
								this.showField = false;
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/user/center/center'
									})
								},1500)
							}
						})
					}
				})
			},
			refund(id){
				this.refundId = id
				this.showField = true
				
			},
			cancel(id,x,j){
				uni.showModal({
					title:'提示',
					content:'取消订单？',
					success: (res) => {
						if(res.confirm){
							this.$u.get('/api/order/orderCancel',{
								order_id:id
							}).then(res=>{
								if(res.code==1){
									uni.showToast({
										title:'取消成功',
										icon:'none',
										success: () => {
											setTimeout(()=>{
												this.tabs[x].data.splice(j,1)
											},1500)
										}
									})
								}
								
								
							})
						}
					}
				})
				
			},
			orderImg(item){
				console.log('goodsImg',item.goods.goods_image.split(','))
				 return item.goods_image.split(',')
			},
			animationfinish({detail: { current }}) {
				console.log('--------------')
				/* this.$refs.tabs.setFinishCurrent(current); */
				this.swiperCurrent = current;
				this.current = current;
				this.swiperChange(current);
			},
			swiperChange(index) {
				this.swiperCurrent = index;
				this.swiperCurrentSliderLeft= (100/this.tabs.length) * index;
				let url = this.tabs[index].api;
				
				// index 0全部，1待支付，2待收货，3待评价，4退款
				// 假如滑动了tab则 去获取对应的数据
				// if(this.tabs[index].data.length == 0){
					// 只获取一次数据
					this.getOrderData(index)
				// }
			},
			getOrderData(index){
				uni.showLoading()
				this.$u.get('/api/order/orderList',{
					type:index,
					page:1,
					limit:50
				}).then(res=>{
					
				// console.log('zhes ' + JSON.stringify(res));
					
					this.tabs[index].data = res.data
					
					this.tabs[index].hide_load = true
					uni.hideLoading()
				})
				
				//--------------------------------------------
				//--------------------------------------------
				
				// 假如 orderData 为返回的数据，我们吧数据赋给对应的index 即可
				// setTimeout(()=>{
				// 	this.tabs[index].data= orderData
					
					
				// },1000)
			},
			// 下拉刷新
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("重置刷新");
			},
			//去支付
			goPay(orderId){
				uni.redirectTo({
				    url: '/pages/order/pay?id=' + orderId
				});
			},
			//去门店
			// goStore(orderId){
			// 	uni.redirectTo({
			// 	    url: '/pages/store/index?sid=' + 6
			// 	});
			// },
			//去订单详情
			goOrderInfo(orderId){
				uni.redirectTo({
				    url: '/pages/map/location?id=' + orderId
				});
			},
			//去评论
			goComment(orderId){
				uni.redirectTo({
				    url: '/pages/order/comment?id=' + orderId
				});
			},
			//查看退款详情
			goRefund(orderId){
				
			
				this.$u.get('/api/order/refundPlan',{
					order_id:orderId,
					
				}).then(res=>{
					if(res.data.is_agree==1){
						uni.showToast({
							title:'退款申请待处理',
							icon :'none',
							success() {
								console.log('sucess')
							}
						})
					}else if(res.data.is_agree==2){
						uni.showToast({
							title:'退款申请已通过',
							icon :'none',
						})
					}else if(res.data.is_agree==3){
						uni.showToast({
							title:'退款申请已驳回',
							icon :'none',
						})
					}
				})
			},
			//搜索
			goSearch(){
				uni.navigateTo({
					url: '/pages/search/search?type=order'
				})
			}
		}
	}
</script>

<style lang="scss">
.head{
	
	background: linear-gradient(100deg, #FFEB3B, #FFC107);
	padding-bottom: 10px;
	padding-top: 10px;
	.status{
		height: var(--status-bar-height);
	}
	.search{
		height: 40px;
		background-color: #fff;
		border-radius: 10px;
		margin: 0 15px;
		display: flex;
		align-items: center;
		padding: 0 15px;
		font-size: 14px;
		color: #888;
		i{
			font-weight: bold;
			font-size: 16px;
		}
		.tit{
			margin-left: 6px;
		}
	}
}
.tabs-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: sticky;
	top: calc(var(--status-bar-height));
	z-index: 10;
	background-color: white;
	height: 50px;
	padding-bottom: 10px;
	
	.hx-tabs{
		position: relative;
		display: flex;
		height:100%;
		width: 100%;
		justify-content: space-evenly;
		&-item{
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 70px;
			color:#666666;
			text{
				font-size: 16px;
			}
			
		}
		&-active{
			color:#333333;
			font-weight: bold;
		}
		&-slider-box{
			position: absolute;
			display: flex;
			justify-content: center;
			bottom: 0;
			width: 20%;
		}
		&-slider{
			display: flex;
			background: #f6d200;
			width: 30px;
			height: 3px;
		}
	}
}
.main{
	position: relative;
	background-color: #ffffff;
	#mainSwiper{
		background-color: #eeeeee;
		height: 100%;
		width: 100%;
		.bannerimg-box{
			border-bottom-left-radius:10upx;
			border-bottom-right-radius:10upx;
			padding: 15px 24rpx 7px;
			swiper{
				height: 233rpx;
				width: 699rpx;
			}
			.swiper-item {
				
				display: flex;
				justify-content: center;
				align-content: center;
				overflow: hidden;
				
				width: 100%;
				height: 100%;
				image {
					border-radius: 8px;
					width: 100%;
				}
			}
		}
		.nullOrder{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 40px auto;
			image{
				margin-top: 200upx;
				width: 226upx;
				height: 265upx;
			}
			.tit{
				display: flex;
				flex-direction: column;
				font-size: 16px;
				// font-weight: bold;
				color: #555;
				margin-top: 6px;
				
			}
		}
		.scroll-items{
			height: 100%;
			.order-item{
				display: flex;
				flex-direction: column;
				background-color: #fff;
				margin: 8px 15px;
				border-radius: 10px;
				padding: 0 15px;
				.item-top{
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 12px 0;
					border-bottom: 1px solid #f5f5f5;
					image{
						border-radius: 50%;
						width: 24px;
						height: 24px;
					}
					.tit{
						flex: 1;
						margin-left: 6px;
						font-size: 16px;
						font-weight: bold;
						color: #333;
						padding-right: 40px;
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						flex-direction: row;

					}
					.right{
						font-size: 14px;
						color: #666;
					}
				}
				.item-center{
					// display: flex;
					// flex-direction: row;
					margin-top: 12px;
					color: #666;
					font-size: 14px;
					.item-good{
						display: flex;
						align-items: center;
					}
					image{
						border-radius: 6px;
						height: 60px;
						width: 60px;
					}
					.right{
						flex: 1;
						margin-left: 10px;
					}
				}
				.item-bottom{
					display: flex;
					flex-direction: row;
					margin-top: 12px;
					margin-bottom: 15px;
					.left{
						flex: 1;
					}
					.btn{
						padding: 7px 14px;
						border: 1px solid #cdcdcd;
						font-size: 14px;
						color: #555;
						border-radius: 10px;
						transition: all 0.2s;
						background: #fff;
					}
					.btn:active{
						color: #888;
						background: #f1f1f1;
					}
					.bg-yellow{
						background: linear-gradient(100deg, #FFEB3B, #FFC107);
						border-color: #ffe635;
						font-weight: bold;
					}
					.bg-yellow:active{
						background: linear-gradient(100deg, #e8d536, #dda809);
					}
				}
			}
		}
		// position: sticky;
		//top: calc(50px + 44px + var(--status-bar-height));
		
	}
	
}
</style>
