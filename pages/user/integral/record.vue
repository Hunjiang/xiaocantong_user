<template>
	<view class="container">
		<hx-navbar title="兑换记录" color="#ffffff" :fixed="true" :backgroundColor="[[255, 235, 59, 1],[255, 193, 7, 1]]"></hx-navbar>

		<view class="container_main">
			<view class="shop_convert">
				<text>商品兑换记录</text>
				<!-- 去掉的小箭头 -->
				<!-- <u-icon class="u-icon" @click="transformationIcon" name="arrow-down-fill" color="#FFC50B" size="16"></u-icon> -->
			</view>
			<view class="emptyBox" v-if="storeList.length==0">
				<image src="../../../static/img/duihuan.png" mode=""></image>
				<view>
					暂无兑换记录呦~
				</view>
			</view>
        <mescroll-body ref="mescrollRef" :down="downOption" @down="downCallback" @up="upCallback" class="list_box">
			
			<view v-for="(item,i) in storeList" :key="i" class="convert_box">
				<view class="convert_date">
					<text class="date_left">兑换日期:</text>
					<text class="date_right">{{item.createtime | timeStamp}}</text>
				</view>
				<view class="convert_contain">
					<view class="contain_left">
						<u-image width="82rpx" height="83rpx" :src="item.goods_image"></u-image>
						<text>{{item.goods_name}}</text>
					</view>
					<view class="contain_right">
						{{item.total_price}} 积分
					</view>
				</view>
			</view>
			
	<!-- 		<view class="convert_box">
				<view class="convert_date">
					<text class="date_left">兑换日期:</text>
					<text class="date_right">少时诵诗书所</text>
				</view>
				<view class="convert_contain">
					<view class="contain_left">
						<u-image width="82rpx" height="83rpx" ></u-image>
						<text>呃呃呃额额</text>
					</view>
					<view class="contain_right">
						10 积分
					</view>
				</view>
			</view> -->
			
			
     </mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
	mixins: [MescrollMixin],
	components:{
		MescrollBody
	},
	onPageScroll(e){
		let that= this;
		if(e.scrollTop>10){
			console.log(555)
			let view = uni.createSelectorQuery().select(".list_box");
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
			page:1,  //页码数
			storeList:[],//兑换记录
			downOption: {
				auto: false //是否在初始化后,自动执行downCallback; 默认true
			},
		};
	},
	filters: {
				timeStamp: function(value) {    //具体到时分秒
					var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
	onLoad() {
	this.getUrlList()
	},
	methods:{
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
			that.getUrlList()
		},
	
        getUrlList(){
		this.$u.post('/api/user/myScoreOrder',{
			page:this.page,
			limit:10
		}).then(res=>{
			if(res.code==1){
				this.page ++
				if(res.data.list.length==0){
					uni.showToast({
						title:'没有更多商品兑换记录了',
						icon:'none'
					})
				}else{
					if(this.storeList.length == 0){
						this.storeList = res.data.list
					}else{
						this.storeList = this.storeList.concat(res.data)
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


<style lang="scss" scoped>
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
				.u-icon{
				 margin-left:4rpx;  
				 }
				text {
					background-image: linear-gradient(90deg, #FFEB3B, #FFC208);
					-webkit-background-clip: text;
					color: transparent;
					margin-right: 5rpx;
					
				}
			}

			.convert_box {
				margin-bottom: 50rpx;
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
						font-size:28rpx;
					}
				}

				.convert_contain {
					padding: 24rpx 24rpx 36rpx 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.contain_left {
						display: flex;
						justify-content: space-between;
						align-items: center;
						text {
							margin-left: 4rpx;
							font-size: 30rpx;
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
	
	.emptyBox{
		margin-top: 300upx;
		text-align: center;
		color: #888888;
		font-size: 30upx;
		view{
			text-align: center;
		}
		image{
			width: 221upx;
			height: 199upx;
			margin-bottom: 41upx;
		}
	}
</style>
