<template>
	<view>
		<!-- 首页头部 开始 -->
		<view class="head-box">
			<view class="navbar"></view>
			<view class="container">
				<view class="left">
					<view class="logo">
						<image src="../../static/img/logo96x96.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="right" :style="'padding-right: ' + MPPR + 'px'">
					<view class="address-box" @click="getLoclist">
						<i class="hxicon-locationfill"></i>
						<text>{{loc}}</text>
						<i class="hxicon-right"></i>
					</view>
					<!-- <view class="notice">
						<i class="hxicon-notice"></i>
					</view> -->
				</view>				
			</view>
		</view>
		<!-- 首页头部 结束 -->
		
		<!-- 搜索 开始 -->
		<view class="search-box" :class="{'QZBG':GDHEAD}" :style="GDHEAD ? 'padding-right: ' + MPPR + 'px' : ''">
			<!-- <view class="navbar" ></view> -->			
			<view class="ctn">
				<view class="hx-search-box" @click="goSearch">
				    <uni-icons type="search" size="22" color="#666666" />
				    <text>输入搜索关键词</text>
				</view>
			</view>
		</view>
		<!-- <view class="container">
			<view class="hot-box">
				<text class="item" v-for="(item,i) in hos_list" :key="i">{{item}}</text>
			</view>
		</view> -->
		<!-- 搜索 结束 -->
		

		<mescroll-body ref="mescrollRef" :down="downOption" @down="downCallback" @up="upCallback">
			<!-- 轮播图 开始 -->
		<view class=" bannerimg-box">
			<swiper  circular duration="400" interval="10000" autoplay >
				<swiper-item class="swiper-item bannerImg" v-for="(item,index) in bannerData" :key="index">
					<!-- 图片尺寸为 750*250 -->
					<image :src="base+item.image" class="loaded" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 结束 -->
		
		<view class="container margin-top sort-box">
			<view class="item-box" v-for="(item,i) in sortList" :key="i" @click="changeSort(i)">
				<view class="tit" :class="{'active': sortIndex == i}">
					<text>{{item.tit}}</text>
				</view>
			</view>
		</view>
		<view class="emptyBox" v-if="storeList.length==0">
						<image src="../../static/img/jqqd.png" mode=""></image>
						<view>
							敬请期待~
						</view>
					</view>
		<!-- 商家信息 开始 -->
		<view class=" store-box" v-if="storeList">
			<view class=" item-box" v-for="(store,i) in storeList" :key="i">
				<view class="container top-box">
					<view class="left" @click="toStore(store.id,store.status)">
						<image :src="base+store.logo" mode="aspectFill"></image>
						<view class="tit" style="text-align: center;" >{{store.operating_status==1?'营业中':'已打烊'}}</view>
					</view>
					<view class="right" @click="toStore(store.id,store.operating_status)">		
						<text class="tit" >{{store.name}}</text><br/>
						<text class="tit" >({{store.campus_name}})</text>
						<view class="row justify-content">
							<view class="row-left">
								<i class="hxicon-favorfill "></i>
								<text class="t1">{{store.total_grade}}</text>
								<text class="t2">月售{{store.total_sales}}</text>
							</view>
							<!-- <view class="row-right">
								<i class="hxicon-locationfill"></i>
								<text>{{store.distance}}</text>
							</view> -->
						</view>
						<view class="row">
							<text >起送￥{{store.min_price}}</text>
							<text class="t2" v-if="store.shipping_free > 0">配送￥{{store.shipping_free}} </text>
							<text class="t2" v-else>免费配送</text>
						</view>
						<!-- <view class="row">
							
						</view> -->
					</view>
				</view>
				<scroll-view scroll-x  class="bottom-box">
					<view class="bottom-box-container">
						<view class="goods-box" v-for="(goods,j) in store.goods" :key="j" @click="toStore(store.id,store.operating_status)">
							<view class="img-box">
								<image :src="base+goods.images.split(',')[0]" mode="aspectFit"></image>
							</view>
							<view class="tit">
								{{goods.name}}
							</view>
							<view class="price-box">
								<text class="txt1">￥</text>
								<text class="txt2">{{goods.price}}</text>
								<text class="txt3" v-if="goods.line_price">￥{{goods.line_price}}</text>
							</view>
						</view>
					</view> 
					
				</scroll-view>
			</view>
		</view>
		</mescroll-body>
		<!-- 商家信息 结束 -->
		
		<view class="foot" v-if="showFoot">
			<text>更多商家加入中，敬请期待</text>
		</view>
		<view class="footzw"></view>
		<u-select v-model="show" :list="locList" @confirm="changeLoc"></u-select>
	</view>
	
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	const screenHeight = uni.getSystemInfoSync().screenHeight;
	export default {
		mixins: [MescrollMixin], 
		components:{
			MescrollBody
		},
		onPageScroll(e){
			let that= this;
			if(e.scrollTop>10){
				let view = uni.createSelectorQuery().select(".search-box");
				view.fields({
					rect: true
				}, res => {
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
				MPPR: 0,
				GDHEAD: 0,
				//显示没有更多商户
				showFoot: 0, 
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				sortIndex: 0,
				sortList: [{tit:'默认'}, {tit:'销量'}, {tit:'评分'}, {tit:'配送费'}],
				sortType:['default','month_sales',"total_grade","shipping_free"],
				storeList: [],
				bannerData:[
					],
				loc:'尚未定位',
				campus_id:null,
				page:1,
				base:this.$base,
				locList:[],
				show:false,
				hos_list:[
					'红烧排骨',
					'飞过肉',
					'野生大菠萝',
					'红烧排骨',
					'西红柿蛋汤'
				]
				
			}
		},
		onLoad() {
			
			let that = this;
			// uni.setStorageSync('token','6cc0cddb-8871-4071-94f4-59bd42f83cf2')
			
			// #ifdef MP
			//小程序下空出胶囊距离
			let m = uni.getMenuButtonBoundingClientRect();
			that.MPPR = m.width + 8
			
			// #endif
			uni.getLocation({
			    type: 'wgs84',
			    success:(res)=>{
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					this.$u.get('/api/index/index',{
						lng:res.longitude,
						lat:res.latitude
					}).then(res=>{
						this.loc =  res.data.campus[0].name
						this.campus_id = res.data.campus[0].id
						this.bannerData = res.data.banner
						this.getShop()
					})
			    }
			});
		},
		mounted() {
			let that = this;
			
		},
		methods: {
			changeSort(i){
				this.sortIndex = i
				this.page = 1 
				this.storeList = []
				this.getShop()
			},
			changeLoc(e){
				this.loc = e[0].label;
				this.campus_id = e[0].value;
				this.page = 1
				this.storeList = []
				this.getShop()
			},
			getShop(){
				this.$u.get('/api/index/getGoods',{
					campus_id:this.campus_id,
					sort:this.sortType[this.sortIndex],
					page:this.page,
					limit:10
				}).then(res=>{
					this.page ++
					if(res.data.length==0){
						uni.showToast({
							title:'没有更多商家了',
							icon:'none'
						})
					}else{
						if(this.storeList.length == 0){
							this.storeList = res.data
						}else{
							this.storeList = this.storeList.concat(res.data)
						}
						
					}
					
				})
			},
			getLoclist(){
				this.$u.get('/api/address/selectCampus').then(res=>{
					this.locList = []
					res.data.forEach((item,index)=>{
						this.locList.push({
							value:item.id,
							label:item.name
						})
					})
					this.show = true
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				let that = this;
				//联网成功的回调,隐藏下拉刷新的状态
				that.mescroll.endSuccess();
				// setTimeout(()=>{
				// 	that.mescroll.endSuccess();
				// },1500)
				//联网失败的回调,隐藏下拉刷新的状态
				//this.mescroll.endErr();
				
			},
			upCallback(page) {
				let that = this;
				//加载门店数据
				// that.storeList = testData.storeList;
				//无更多商家
				that.showFoot = true;
				//隐藏加载
				that.mescroll.endSuccess(10);
				// setTimeout(()=>{
				// 	//加载门店数据
				// 	that.storeList = testData.storeList;
				// 	//无更多商家
				// 	that.showFoot = true;
				// 	//隐藏加载
				// 	that.mescroll.endSuccess(10);
				// },1500)
			},
			toStore(id,status){
				if(status==1){
					uni.navigateTo({
						url: '/pages/store/index?sid='+id
					})
				}else{
					uni.showToast({
						title:'该商家已经打烊啦',
						icon:'none'
					})
				}
			},
			//搜索
			goSearch(){
				
				uni.navigateTo({
					url: '/pages/search/search?type=home'
				})
			}
		},
		onPullDownRefresh(){
			this.page = 1
			this.storeList = []
			this.getShop()
		},
		onReachBottom() {
			this.getShop()
		}
	}
</script>

<style lang="scss">
	
page{
	background-color: #f8f8f8;
}
.b-b{
	position: relative;
}
 .b-b:after,
 .b-t:after {
 	position: absolute;
 	z-index: 3;
 	left: 0;
 	right: 0;
 	height: 0;
 	content: '';
 	transform: scaleY(.5);
 	border-bottom: 1px solid #E4E7ED;
 }
 
 .b-b:after {
 	bottom: 0;
 }
 .b-t:after {
 	top: 0;
 }
.container{
	margin: 0 15px;
}
.margin-top{
	margin-top: 12px;
}
.head-box{
	padding: 14px 0;
	/* #ifdef MP */
	padding-top:2px;
	/* #endif */
	background: linear-gradient(100deg, #FFEB3B, #FFC107);
	position: relative;
	z-index: 3;
	.navbar{
		position: sticky;
		top: 0;
		height: var(--status-bar-height);
	}
	
	.container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 32px;
		align-items: center;
		.left{
			.logo{
				width: 32px;
				height: 32px;
				
				image{
					width: 32px;
					height: 32px;
					border-radius: 50%;
				}
			}
		}
		.right{
			display: flex;
			flex-direction: row;
			color: #333333;
			align-items: center;
			
			.address-box{
				font-size: 14px;
				margin-right: 16px;
				display: flex;
				flex-direction: row;
				align-items: center;
				text{
					margin-left: 2px;
					margin-right: 4px;
				}
				.icon-right{
					position: relative;
					top: 2px;
				}
			}
			
			.notice{
				font-weight: bold;
				font-size: 18px;
			}
		}
		
	}
	
}
.search-box{
	position: sticky;
	top: 0;
	z-index: 2;
	background: linear-gradient(100deg, #FFEB3B, #FFC107);
	padding-top: var(--status-bar-height);
	margin-top: calc(var(--status-bar-height) * -1);
	.ctn{
		border-top-left-radius:50upx;
		border-top-right-radius:50upx;
		background: #f8f8f8;
		padding: 15px 15px 12px;
		
		.hx-search-box{
			border-radius: 40px;
			padding: 0 15px;
			height: 34px;
			display: flex;
			align-items: center;
			line-height: 44rpx;
			background-color: #eeeeee;
			flex:1;
			color: #888888;
			font-size: 14px;
		}
	}	
}
.QZBG{
	background:#ffffff;
	box-shadow: 0 1px 6px #ccc;
	.navbar{
		height: var(--status-bar-height);
	}
	.ctn{
		background:#ffffff;
		/* #ifdef MP */
		padding-top:0px;
		/* #endif */
	}
}
.hot-box{
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	.item{
		margin-right: 12px;
		background-color: #EEEEEE;
		color: #666666;
		font-size: 12px;
		border-radius: 20px;
		padding: 2px 6px;
		margin-bottom: 8px;
	}
	.item:last-child{
		margin-right: 0;
	}
}
.bannerimg-box{
	border-bottom-left-radius:10upx;
	border-bottom-right-radius:10upx;
	padding: 24rpx;
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

.menu-box{
	
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 12px;
	border-radius: 8px;
	background: #ffffff;
	padding: 12px 8px;
	.item-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 40px;
			height: 40px;
		}
		.tit{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			margin-top: 6px;
			color: #333333;
			padding: 2px 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.active{
			color: #ffffff;
			background-color: #999999;
			border-radius: 60px;
		}
	}
}
.sort-box{
	display: flex;
	flex-direction: row;
	margin-top: 12px;
	.item-box{
		
		margin-right: 16px;
		.tit{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			color: #333333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.active{
			//color: #111111;
			font-weight: bold;
		}
	}
}
.store-box{
	margin-top: 20px;
	
	.item-box{
		display: flex;
		flex-direction: column;
		margin-bottom: 14px;
		padding-bottom: 18px;
		padding-top: 18px;
		background-color: #ffffff;
		.top-box{
			display: flex;
			flex-direction: row;
			.left{
				margin-right: 10px;
				
				
				image{
					width: 72px;
					height: 54px;
					border-radius: 6px;
				}
			}
			.right{
				flex: 1;
				.tit{
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.justify-content{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
				.row{
					font-size: 12px;
					color: #999999;
					margin-top: 4px;
					.row-left{
						display: flex;
						flex-direction: row;
						.t1,i{
							color: #ffca3e;
						}
						
					}
					.t2{
						margin-left: 12px;
					}
					.row-right{
						display: flex;
						flex-direction: row;
						i{
							margin-right: 4px;
						}
					}
					
				}
			}
		}
		.bottom-box{
			height: 240rpx;
			&-container{
				margin: 12px 0 0;
				padding-left: 82px;
				
				white-space: nowrap;
				.goods-box{
					width: 80px;
					margin-left: 12px;
					display: inline-block;
					.img-box{
						position: relative;
						width: 80px;
						height: 60px;
						background-color: #f1f1f1;
						border-radius: 4px;
						image{
							width: 100%;
							height: 60px;
						}
						.tag{
							position: absolute;
							bottom: 0;
							left: 0;
							background-color: #FF5722;
							color: #ffffff;
							padding: 2px 4px;
							font-size: 12px;
							border-radius: 4px;
						}
					}
					.tit{
						font-size: 14px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.price-box{
						margin-top: 4px;
						.txt1{
							font-size: 10px;
							color: #FF5722;
						}
						.txt2{
							font-size: 16px;
							color: #FF5722;
						}
						.txt3{
							margin-left: 6px;
							font-size: 10px;
							color: #bbbbbb;
							text-decoration: line-through;
						}
					}
				}
				.goods-box:last-child{
					margin-right: 12px;
				}
				
			}
			
		}
	}
	.item-box:last-child{
		border-bottom: 0;
	}
}
.foot{
	position: relative;
	display: flex;
	justify-content: center;
	margin-top: 36px;
	margin-bottom: 50px;
	text{
		font-size: 14px;
		position: relative;
		z-index: 2;
		height: 20px;
		line-height: 20px;
		background-color: #f8f8f8;
		color: #cccccc;
		padding: 0 12px;
	}
}
.foot::before{
	content: "";
	z-index: 1;
	display: block;
	position: absolute;
	top: 50%;
	height: 0;
	width: 100%;
	transform: scaleY(0.5);
	border-bottom: 1px solid #E4E7ED;
}
.footzw{
	/* #ifdef H5*/
	height: 50px;
	/* #endif */
}
.emptyBox{
		margin-top: 80upx;
		text-align: center;
		color: #888888;
		font-size: 30upx;
		view{
			text-align: center;
		}
		image{
			width: 376upx;
			height: 290upx;
			margin-bottom: 41upx;
		}
	}
</style>
