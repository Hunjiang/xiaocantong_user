<template>
	<view>
		<hx-navbar title="红包卡券" :fixed="true" :backgroundColor="[[255,235,59],[255,193,7]]"></hx-navbar>
		<view class="head">
			<!-- <view class="item" v-for="(item,i) in navData" :key="i" v-if="item">
				<image :src="item.img" mode=""></image>
				<text class="txt">{{item.name}}</text>
			</view> -->
			<view class="item">
				<image src="/static/img/coupon_lq.png" mode=""></image>
				<text class="txt">免费领券</text>
			</view>
			<view class="item">
				<image src="/static/img/coupon_gq.png" mode=""></image>
				<text class="txt">特惠购券</text>
			</view>
			<view class="item" @click="duihuan">
				<image src="/static/img/coupon_dq.png" mode=""></image>
				<text class="txt">快捷兑券</text>
			</view>
		</view>
		
		<view class="main">
			<view class="list-box">
				<view class="left">
					<text>红包/抵用券</text>
				</view>
				<view class="right">
					<text>查看全部</text>
					<i class="hxicon-right"></i>
				</view>
			</view>
			<view class="coupon-box">
				<view class="row" v-for="(item,i) in couponData" :key="i" v-if="item">
					<view class="row-top">
						<view class="left">
							<view class="top" v-if="item.type==2">
								<text class="txt2">{{item.value}}</text>
								<text class="txt1">折</text>
							</view>
							<view class="top" v-else>
								<text class="txt1">￥</text>
								<text class="txt2">{{item.value}}</text>
							</view>
							<view class="bottom">
								<view class="txt1">
									{{item.type_name}}
								</view>
							</view>
						</view>
						<view class="center">
							<view class="center-row">
								<text class="txt4">{{item.type_name}}</text>
							</view>
							<view class="center-row">
								<text class="txt1">{{timeGs(item.end_time)}}</text>
							</view>
							<view class="center-row" @click="item.hide_rule = !item.hide_rule">
								<text class="txt3" >使用规则</text>
								<i class="txt3 hxicon" :class="item.hide_rule ? 'icon-unfold' : 'icon-fold'"></i>
							</view>
							
						</view>
						<view class="right">
							<view class="btn" @click="goStroe(item)">立即使用</view>
						</view>
					</view>
					
					<view class="beyond" v-if="item.hide_rule == false">
						<view class="beyond-q beyond-ql"></view>
						<view class="beyond-q beyond-qr"></view>
						<text class="txt3">满{{item.beyond}}元可使用，{{item.docs}}</text>
					</view>
				</view>
				
			</view>
			<!-- 暂时未规划卡包 -->
			<!-- <view class="list-box mt">
				<view class="left">
					<text>卡包</text>
				</view>
				<view class="right">
					<i class="hxicon-right"></i>
				</view>
			</view> -->
		</view>
		<view class="foot">
			
		</view>
		
		<uni-popup ref="popup" type="center" @change="popupChange">
			<view class="dh-box">
				<view class="title">
					<text>快捷兑券</text>
				</view>
				<view class="row">
					<input type="text" value="" v-model="qCode" placeholder="填入券码"/>
				</view>
				<view class="btn" @click="submitCode">确认兑券</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
	    components: {uniPopup},
		data() {
			return {
				navData:[
					{
						img: '/static/img/coupon_lq.png',
						name: '免费领券'
					},
					{
						img: '/static/img/coupon_gq.png',
						name: '特惠购券'
					},
					{
						img: '/static/img/coupon_dq.png',
						name: '快捷兑券'
					}
				],
				qCode:'',
				isBack: true,
				couponData: [
					{
						id: 'MS68941',
						// 类型 1优惠券，2折扣券，3抵扣券
						type: 1,
						type_name: '优惠券',
						store_id: '123',
						title: '外卖美食红包',
						value: 20,
						// 满足条件，满xx减xx
						beyond: 100,
						create_time: '2020-04-17 20:30:11',
						end_time: '2021-04-17 20:30:11',
						docs: '不可与满减，折扣商品，第二份半价，津贴活动同时享有。在线支付专享。',
						hide_rule: true
					},
					{
						id: 'MS68941',
						// 类型 1优惠券，2折扣券，3抵扣券
						type: 2,
						type_name: '折扣券',
						title: '外卖美食红包',
						store_id: '123',
						value: 7.4,
						// 满足条件，满xx减xx
						beyond: 150,
						create_time: '2020-04-17 20:30:11',
						end_time: '2021-04-17 20:30:11',
						docs: '不可与满减，折扣商品，第二份半价，津贴活动同时享有。在线支付专享。',
						hide_rule: true
					},
					{
						id: 'MS68941',
						// 类型 1优惠券，2折扣券，3抵扣券
						type: 3,
						type_name: '抵扣券',
						title: '外卖美食红包',
						store_id: '123',
						value: 66,
						// 满足条件，满xx减xx
						beyond: 200,
						create_time: '2020-04-17 20:30:11',
						end_time: '2020-04-19 12:55:11',
						docs: '不可与满减，折扣商品，第二份半价，津贴活动同时享有。在线支付专享。',
						hide_rule: true
					},
					{
						id: 'MS68941',
						// 类型 1优惠券，2折扣券，3抵扣券
						type: 1,
						type_name: '优惠券',
						title: '外卖美食红包',
						store_id: '123',
						value: 20,
						// 满足条件，满xx减xx
						beyond: 100,
						create_time: '2020-04-17 20:30:11',
						end_time: '2020-04-18 23:30:11',
						docs: '不可与满减，折扣商品，第二份半价，津贴活动同时享有。在线支付专享。',
						hide_rule: true
					}
				]
			}
		},
		onBackPress() {
			if(!this.isBack){
				this.$refs.popup.close()
				return true
			}
		},
		methods: {
			duihuan(){
				this.$refs.popup.open()
			},
			popupChange(e){
				this.isBack = !e.show
			},
			submitCode(){
				if(this.qCode == ''){
					return
				}
				this.$refs.popup.close()
				uni.showModal({
					showCancel: false,
					content: '提交事件，券码为：'+ this.qCode
				})
			},
			goStroe(row){
				uni.navigateTo({
					url:'/pages/store/index?sid=' + row.store_id
				})
			},
			timeGs(cDate){
				var go_time=new Date(cDate.replace(/-/g, '/'));
				var now_time=new Date();
				if(!go_time.getTime()){
					return '已失效'
				}
				let str = ''
				var alltime =go_time.getTime() -now_time.getTime ();  //剩余的时间（毫秒）
				if(alltime <= 0){
					str = "已过期"
					return str
				}
				
				
				if(go_time.getYear() == now_time.getYear() && go_time.getMonth() == now_time.getMonth() && go_time.getDay() == now_time.getDay()){
					str = "今日" + go_time.getHours() + ':' + go_time.getMinutes() + "到期"
				}else{
					let day = parseInt(alltime/86400000);
					if(day > 1){
						str = "还剩" + day + '天到期'
					}else{
						str = "明日" + go_time.getHours() + ':' + go_time.getMinutes() + "到期"
					}
				}
				return str
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f7f8fc;
}
.mt{
	margin-top: 15px;
}
.head{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	.item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		padding: 12px 30px;
		image{
			width: 40px;
			height: 40px;
		}
		.txt{
			font-size: 12px;
			color: #444;
			margin-top: 6px;
		}
	}
}
.main{
	display: flex;
	flex-direction: column;
	margin: 20px 15px 0;
		
	.list-box{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.left{
			font-size: 16px;
			font-weight: bold;
			color: #333;
			flex: 1;
		}
		.right{
			font-size: 12px;
			color: #555;
		}
		
	}
	.coupon-box{
		
		display: flex;
		flex-direction: column;
		.row{
			display: flex;
			flex-direction: column;
			padding: 15px;
			background: #fff;
			border-radius: 10px;
			margin-top: 15px;
			.row-top{
				display: flex;
				flex-direction: row;
				.txt1{
					font-size: 14px;
					color: #FF9800;
				}
				.txt2{
					font-size: 30px;
					color: #FF5722;
				}
				.txt3{
					font-size: 12px;
					color: #999;
				}
				.txt4{
					font-size: 14px;
					color: #333;
				}
				.left{
					padding: 0 20px;
					margin-left: -15px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
				}
				.center{
					display: flex;
					flex-direction: column;
					flex: 1;
					.center-row{
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 6px;
						align-items: center;
						[class*="hxicon-"]{
							margin-left: 6px;
						}
					}
					
					.center-row:last-child{
						margin-bottom: 0;
					}
				}
				.right{
					display: flex;
					justify-content: center;
					align-items: center;
					.btn{
						padding: 5px 12px;
						border-radius: 40px;
						background: linear-gradient(100deg, #FF9800, #FF5722);
						color: #fff;
						font-size: 12px;
					}
				}
			}
			.beyond{
				position: relative;
				margin: 12px -15px -15px;
				padding: 12px 15px 12px;
				background-color: #f5f5f5;
				border-radius: 10px;
				border-top: 1px dashed #d9d9d9;
				
				.beyond-q{
					position: absolute;
					width: 20px;
					height: 20px;
					border-radius: 100%;
					background-color: #f7f8fc;
					top: -10px;
				}
				.beyond-ql{
					left: -10px;
				}
				.beyond-qr{
					right: -10px;
				}
				.txt3{
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
}
.foot{
	height: 50px;
}
.dh-box{
	
	padding: 15px;
	border-radius: 10px;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: right;
	align-items: center;
	.title{
		font-size: 14px;
		font-weight: bold;
		color: #555;
	}
	.row{
		margin-top: 12px;
		height: 40px;
		border: 1px solid #eee;
		background: #eee;
		border-radius: 6px;
		
		input{
			padding: 0 6px;
			background: #eee;
			height: 100%;
			width: 100%;
		}
	}
	.btn{
		margin-top: 10px;
		padding: 10px 20px;
		border-radius: 6px;
		background: linear-gradient(100deg, #FF9800, #FF5722);
		color: #fff;
		font-size: 12px;
	}
	.btn:active{
		
		background: linear-gradient(100deg, #da8302, #e04d1e);
		color: #f8f8f8;
	}
}
</style>
