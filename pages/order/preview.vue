<template>
	<view>
		<hx-navbar :border="false" :centerSlidiSwitch="true" :rightSlidiSwitch="false" :fixed="true" :backgroundColor="[255,193,7]"
		 :pageScroll.sync="scrollData">
			<view style="text-align: center;width: 100%;">
				<text>提交订单</text>
			</view>
			<view slot="centerAfter" style="text-align: center;width: 100%;">
				<text>选择收获地址 ></text>
			</view>
		</hx-navbar>
		<view class="head tab-right-active">

			<view class="tab-box" v-if="tabIndex>0">
				<view class="item left" :class="{'active':tabIndex == 1}" @click="tabIndex = 1">
					<view class="tit-box">
						<text>配送</text>
					</view>
				</view>
				<!-- 				<view class="item right" :class="{'active':tabIndex == 2}"  @click="tabIndex=2">
					<view class="tit-box">
						<text>到店自取</text>
					</view>
				</view> -->
			</view>
			<view class="container head-bottom" :class="{'selectOne': tabIndex == 1,'selectTow':tabIndex == 2}">
				<view class="tab" v-if="tabIndex == 2">
					2
				</view>
				<view class="tab" v-else>
					<view class="t-top">
						<view class="t-top-box">
							<navigator url="/pages/user/address/address" style="display: flex;align-items: center;">
								<text class="txt1">{{addressData?addressData.campus_name+' '+addressData.detail:'选择收货地址'}}</text>
								<i class="hxicon-right icon1"></i>
							</navigator>
						</view>
					</view>
					<view class="t-bb"></view>
					<view class="t-bottom">
						<view class="row1">
							<view class="left">
								<text>送达时间</text>
							</view>
							<view class="right" @click="show=true">
								<text>{{time?time:'未选择(必选)'}}</text>
								<i class="hxicon-right"></i>
							</view>
						</view>
						<view class="row2">
							<text>为减少接触，封闭管理时，请在地址中更新具体去餐点</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="b-r m-t container p12">
			<view class="store">
				<view class="name ">
					<text>{{storeData.store_name}}</text>
					<!-- 标志性位置 ，社区  如：白羊区店，玫瑰园小区 -->
					<text v-if="storeData.community">({{storeData.community}})</text>
				</view>





				<view class="p-bb b-b"></view>
				<view class="goods-box">
					<block v-for="(goods,i) in goodsList" :key="i">
						<view class="goods-item">
							<view class="left">
								<image :src="base+goods.goods_image" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="row1">
									<view class="tit">
										<!-- <text class="zk" v-if="goods.oldprice && Number(goods.price) < Number(goods.oldprice)">折</text> -->
										<text>{{goods.goods_name}}</text>

									</view>
									<view class="old-price" v-if="goods.oldprice">
										<text class="fh">￥</text><text class="lt">{{goods.goods_line_price}}</text>
									</view>
									<view class="price">
										<text class="fh">￥</text><text>{{goods.goods_price}}</text>
									</view>
								</view>
								<view class="row2">
									<text>{{goods.depict}}</text>
								</view>
								<view class="row3">
									x<text>{{goods.goods_num}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view class="p-bb b-b"></view>
				<view class="flex-rl peisong">
					<view class="right">
						<text>配送费</text>
					</view>
					<view class="left">
						<text class="fh">￥</text><text>{{shop.shipping_free}}</text>
					</view>
				</view>
				<view class="p-bb b-b" v-if="goFloorShow && isUpstairs==1"></view>
				<view class="flex-rl peisong" v-if="goFloorShow && isUpstairs==1">
					<view class="right">
						<text>送餐上楼</text>
					</view>
					<view class="left">
						<text class="fh">￥</text><text>{{shop.upstairs}}</text>
					</view>
				</view>

				<view class="p-bb b-b"></view>






				<!-- 				<view class="zhekou-box">
					<block v-for="(item,i) in couponData" :key="i">
						<view class="zhekou">
							<view class="flex-rl  row1">
								<view class="left">
									<i class="hxicon" :class="item.icon"></i>
									<text class="tit">{{item.tit}}</text>
								</view>
								<view class="right">
									<view class="tag1">
										<text>{{item.content}}</text>
									</view>
								</view>
							</view> -->
				<!-- 备注 -->
				<!-- 							<view class="row2" v-if="item.remark">
								{{item.remark}}
							</view>
						</view>
					</block>
				</view> -->
				<!-- <view class="p-bb b-b"></view> -->
				<view class="flex-rl totalbox">
					<view class="left">
						<!-- <text>优惠规则</text>
						<i class="hxicon-question"></i> -->
					</view>
					<view class="right">
						<!-- <view class="yh">
							<text class="txt">已优惠</text>
							<text class="fh">￥</text>
							<text class="num">{{totalYhPrice}}</text>
						</view> -->
						<view class="total">
							<text class="txt">小计</text>
							<text class="fh">￥</text>
							<text class="num">{{shop.total_prices}}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 		<view class="b-r m-t container p12">
			<view class="privacy">
				<view class="flex-rl row1 ">
					<view class="left">
						<i class=" hxicon-cardboardfill icon1"></i>
						<text class="txt">号码保护</text>
						<i class=" hxicon-question icon2"></i>
					</view>
					<view class="right">
						<switch :checked="ysStatus" @change="privacyStatusChange" color="#ffc107"/>
					</view>
				</view>
				<view class="row2">
					对商家，骑手隐藏您的真实手机号，保护您的隐私
				</view>
				<view class="row3" v-if="ysStatus">
					为保障服务质量，开启号码保护的订单通话可能会被录音
				</view>
			</view>
		</view> -->
		<view class="b-r m-t container p12 other-box" v-if="goFloorShow">
			<view class="flex-rl row">
				<view class="left">
					<text>是否送餐上楼</text>
				</view>
				<view class="right">
					<!-- <i class="hxicon-right"></i>
					<u-modal show-cancel-button :confirm-text="confirmText"  @confirm="goFloor" :cancel-text='cancelText' v-model="show1" :content="content"></u-modal> -->

					<switch style="transform:scale(0.7)" @change="goFloorStatusChange" color="#ffc107" />
				</view>


			</view>
		</view>




		<view class="b-r m-t container p12 other-box">
			<view class="flex-rl row remarkBox">
				<view class="left">
					<text>备注</text>
				</view>
				<view class="right">
					<input placeholder="点击可填写备注" v-model="remark" />
					<!-- <text v-if="remark">{{remark}}</text>
					<text v-if="!remark">点击可填写备注</text> -->
					<i class="hxicon-right"></i>
				</view>
			</view>
		</view>
		<view class="body-end"></view>

		<view class="foot">
			<view class="left">
				<view class="price">
					<text class="fh">￥</text>
					<text class="txt">{{shop.total_prices}}</text>
				</view>
				<!-- <view class="discount" v-if="totalYhPrice">
					<text>已优惠￥{{totalYhPrice}}</text>
				</view> -->
			</view>
			<!-- <view class="center">
				<text>找人付</text>
			</view> -->
			<view class="right" @click="submit">
				<text>提交订单</text>
			</view>
		</view>
		<!-- <u-select v-model="show" mode="mutil-column-auto" :list="timeList" @confirm="confirm"></u-select> -->
		<view class="mask" v-if="show">
			<view class="selectTimeBox">
				<view class="selectTimeTitle">
					<text class="titleText">选择预计送达时间</text>
					<image src="../../static/img/cancle.png" mode="" @click="show=false"></image>
				</view>
				<view class="selectTimeContent">
					<view class="timeContentLeft">
						<view :class="{selectDate:isSelectIndex==0}" @click="isToday=true,isSelectIndex=0">今天（{{workList[0]}})</view>
						<view :class="{selectDate:isSelectIndex==1}" @click="isToday=false,isSelectIndex=1">明天（{{workList[1]}})</view>
						<view :class="{selectDate:isSelectIndex==2}" @click="isToday=false,isSelectIndex=2">后天（{{workList[2]}})</view>
					</view>
					<view class="timeContentRight">
						<view class="selectTime" v-if="isToday" @click="checkTime(minList[1])">立即送出 <image src="../../static/img/selectTime.png" mode=""></image>
						</view>
						<view v-if="index>1  && isToday" @click="checkTime(val)" v-for="(val , index) in minList" :key='index'>{{val}}</view>
						<view v-if="!isToday"  @click="checkTime(val)" v-for="(val , index) in minListAllDay" :key='index'>{{val}}</view>
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
				isSelectIndex:0,
				show: false,
				isUpstairs: 2, //是否上楼
				goFloorShow: false, //是否显示送餐上楼
				// show1: true,
				// content: '小哥哥，累了嘛',
				// confirmText:'上楼',
				// cancelText:'不上楼',
				base: this.$base,
				scrollData: {},
				//购物车缓存 Storage 名称
				shoppingCartStorageName: 'shopping_cart',
				//门店信息
				storeData: {},
				//购物车
				shoppCart: [],
				//头部选项卡 参数为 0不显示选项卡,1,2
				tabIndex: 1,
				//收获地址
				addressData: null,

				//结算价
				totalPrice: 0,
				//已优惠价
				totalYhPrice: 0,
				//商品数量
				totalNumber: 0,
				shop: [],
				remark: "",
				goodsList: [],
				timeList: [],
				time: null,
				// goFloor: false,
				t1: null,
				workList: [],
				minList:[],
minListAllDay:[],
				isToday:true,
				submitTime:'',//确认时间
			}
		},
		onLoad(option) {
			let that = this
			let totalPrice = 0
			let totalNumber = 0
			let totalOldPrice = 0


			if (option.sid) {
				this.$u.get('/api/order/close', {
					shop_id: option.sid,
				}).then(res => {
					this.goodsList = res.data.list
					this.shop = res.data
					console.log(this.shop);

					if (res.data.address) {
						this.addressData = res.data.address
					}
				})
			}
			this.getWeeks();
			this.getMinList();
			let addMin=20;
			for(var i=0;i<this.minList.length+1;i++){
				this.$set(this.minList,i,this.getMinutesTest(addMin,i));
				let newStr=this.minList[i]
				// newStr=newStr.Substring(0,2)
				console.log(newStr)
				console.log(newStr>'22:00')
				if(newStr>'22:00'){
					break;
				}
				addMin+=20;
			}
			console.log(this.minList)
			// this.getMinutesTest(40);
			// this.getMinutesTest(60);
			// this.getMinutesTest(80);
			let now = new Date()
			var day = now.getDay();
			
			// console.log(now.getHours())
			for (let i = 0; i < 24 - now.getHours(); i++) {
				this.timeList.push({
					value: now.getHours() + i,
					label: now.getHours() + i + ":00",
					children: []
				})
			}
			this.timeList.forEach((item, index) => {
				for (let x = 1; x < 25 - item.value; x++) {
					this.timeList[index].children.push({
						value: item.value + x,
						label: item.value + x + ":00"
					})
				}
			})
			// 一天中某段时间段内显示
			// this.dayShow()

		},
		onPageScroll(e) {
			this.scrollData = e;
		},
		onShow() {
			let pages = getCurrentPages()
			console.log(this.addressData)
			// if (pages[pages.length - 1].$vm.item) {
			// 	this.addressData = JSON.parse(pages[pages.length - 1].$vm.item)
			// }
		},
		onUnload() {
			if (this.t1) {
				clearInterval(this.t1);
				this.t1 = null;
			}
		},
		methods: {
			// 确定时间
			checkTime(timeVal){
				if(this.isSelectIndex==0){
					this.time='今天（'+this.workList[0]+'）'+timeVal
					this.submitTime=this.getNData(0)+' ' + timeVal
					
				}else if(this.isSelectIndex==1){
					this.time='明天（'+this.workList[1]+'）'+timeVal
					this.submitTime=this.getNData(1)+' ' + timeVal
				}else if(this.isSelectIndex==2){
					this.time='后天（'+this.workList[2]+'）'+timeVal
					this.submitTime=this.getNData(2)+' ' + timeVal
				}
				this.show=false;
				console.log(("11:00"<timeVal &&  timeVal<"14:00") || ("15:15"<timeVal && timeVal<"20:30"))
				if(("11:00"<timeVal &&  timeVal<"14:00") || ("15:15"<timeVal && timeVal<"20:30")){
					this.goFloorShow=true;
				}
				else{
					if(this.goFloorShow){
						this.shop.total_prices=this.shop.total_prices-this.shop.upstairs
					}
					this.goFloorShow = false
				}
				// this.dayShow()
			},
			// 获取9点到22点区间
			getMinList(){
				for(let i=9;i<22;i++){
					for(let j=0;j<4;j++){
						if(j==0){
							this.minListAllDay.push(i+':00')
						}else if(j==1){
							this.minListAllDay.push(i+':20')
						}else if(j==2){
							this.minListAllDay.push(i+':40')
						}else if(j==3 && i==21){
							this.minListAllDay.push('22:00')
						}
		
					}
				}
				console.log(this.minListAllDay)
			},
			// 获取当前时间后n分钟
			getMinutesTest(nMin,i){
				var date=new Date();     //1. js获取当前时间
				var min=date.getMinutes();  //2. 获取当前分钟
				date.setMinutes(min+nMin);  //3. 设置当前时间+10分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
				var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
				var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
				var formatdate =  h + ":" + f ;
				return formatdate
				console.log(formatdate) // 获取10分钟后的时间，格式为yyyy-mm-dd h:f:s
    
},
			// 获取当前周几
			getWeeks(){
				let now = new Date()
				var day = now.getDay();
				var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.workList.push(weeks[day])
				if (day == 5) {
					this.workList.push(weeks[6])
					this.workList.push(weeks[0])
				} else if (day == 6) {
					this.workList.push(weeks[0])
					this.workList.push(weeks[1])
				} else {
					this.workList.push(weeks[day + 1])
					this.workList.push(weeks[day + 2])
				}
				console.log(this.workList);
			},
			// 获取n天后日期
			getNData(AddDayCount) {
				var dd = new Date();
				dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
				console.log(y + "-" + m + "-" + d)
				return y + "-" + m + "-" + d;
			},
			// 一天中某段时间段内显示
			checkAuditTime(beginTime, endTime) {
				// setInterval(() => {
				var nowDate = new Date();
				var beginDate = new Date(nowDate);
				var endDate = new Date(nowDate);

				var beginIndex = beginTime.lastIndexOf("\:");
				var beginHour = beginTime.substring(0, beginIndex);
				var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
				beginDate.setHours(beginHour, beginMinue, 0, 0);

				var endIndex = endTime.lastIndexOf("\:");
				var endHour = endTime.substring(0, endIndex);
				var endMinue = endTime.substring(endIndex + 1, endTime.length);
				endDate.setHours(endHour, endMinue, 0, 0);
				if (nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() - endDate.getTime() <= 0) {
					return true
					// this.goFloorShow = true
				} else {
					return false
					// this.goFloorShow = false
				}
				// }, 1000)
			},
			dayShow() {
				let _this=this;
				setInterval(() => {
					if (_this.checkAuditTime("11:00", "14:00")) {
						_this.goFloorShow = true
					} else if (_this.checkAuditTime("15:15", "20:30")) {
						_this.goFloorShow = true
					} else {
						console.log(_this.goFloorShow)
						// if(_this.goFloorShow){
						// 	_this.shop.total_prices=_this.shop.total_prices-_this.shop.upstairs
						// }
						_this.goFloorShow = false
						
					}
				}, 1000)
				console.log(this.goFloorShow)
			},

			// 是否上楼
			goFloorStatusChange(e) {
				console.log(e);
				console.log(typeof this.shop.total_prices)
				// isUpstairs 1上楼
				if (e.target.value) {
					this.isUpstairs = 1
					this.shop.total_prices=(this.shop.total_prices-0)+(this.shop.upstairs-0)
				} else {
					this.isUpstairs = 2
					this.shop.total_prices=this.shop.total_prices-this.shop.upstairs
				}
			},



			// 是否上楼
			// toFood(e) {
			// this.show1 = true;
			// },
			// goFloor() {
			// 	this.goFloor = true;
			// },

			confirm(e) {
				// console.log(e)
				this.time = e[0].label + "-" + e[1].label
			},
			privacyStatusChange(e) {
				this.ysStatus = e.target.value
			},
			onPageJump() {
				uni.navigateTo({
					url: '/pages/user/address/address'
				})
			},

			//提交订单
			submit() {
				if (!this.addressData) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return
				}
				if (!this.submitTime) {
					uni.showToast({
						title: '请选择时间',
						icon: 'none'
					})
					return
				}
				if (!this.value) {
					this.gouxuan = false
				} else {

				}
				//向后台发送 data 进行真实合计，生成订单，并返回订单信息
				//模拟请求数据
				uni.showLoading({
					title: '正在生成订单'
				});
				this.$u.get('/api/order/submit', {
					is_upstairs: this.isUpstairs,
					shop_id: this.goodsList[0].shop_id,
					address_id: this.addressData.id,
					user_delivery_time: this.submitTime,
					buyer_remark: this.remark
				}).then(res => {

					uni.hideLoading()
					uni.showToast({
						title: '下单成功',
						icon: 'none',
						mask: true
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/order/pay?id=' + res.data.order_id
						});
					}, 1500)
				})
				// setTimeout(()=>{

				// },1000)
				// //假设返回了订单信息，跳转至支付页面
				// let orderId="DGSD2020041035"
				// uni.redirectTo({
				//     url: '/pages/order/pay?id=' + orderId
				// });
			}
		}
	}
</script>

<style lang="scss">
	.b-r {
		border-radius: 6px;
	}

	.m-t {
		margin-top: 6px;
	}

	.p-bb {
		margin: 16px 0;
		height: 1px;
		//background:  #E4E7ED;
	}

	.flex-rl {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.container {
		margin-left: 12px;
		margin-right: 12px;
		background-color: #ffffff;
	}

	.p12 {
		padding: 12px;
	}

	.head {
		background: linear-gradient(to bottom, #ffc107, #f1f1f1);

		padding-top: 20px;

		.tab-box {
			position: relative;
			height: 40px;
			margin: 0 12px;

			.item {
				position: absolute;
				top: 0;
				bottom: 0;
				height: 40px;
				text-align: center;
				font-size: 14px;

				width: 50%;

				.tit-box {
					position: relative;
					height: 36px;
					line-height: 36px;
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					background-color: rgba(#ffffff, .6);
					width: 100%;
				}
			}

			.item:first-child {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: flex-end;
				left: 0;
			}

			.item:last-child {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: flex-end;
				right: 0;
			}

			.active {
				height: 40px;
				width: 51%;
				font-weight: bold;

				.tit-box {
					height: 40px;
					line-height: 40px;
					background-color: rgba(#ffffff, 1);
				}

			}

			.left .tit-box {
				margin-left: 12px;
				margin-right: -12px;
				padding-right: 12px;
			}

			.right .tit-box {
				margin-right: 12px;
				margin-left: -12px;
				padding-left: 12px;
			}

			.left.active .tit-box {
				margin: 0;
			}

			.right.active .tit-box {
				margin: 0;
			}

			.left.active .tit-box:after {
				content: '';
				position: absolute;
				right: -12px;
				bottom: 0;
				border-top: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 36px solid #ffffff;
			}

			.right.active .tit-box:after {
				content: '';
				position: absolute;
				left: -12px;
				bottom: 0;
				border-top: 12px solid transparent;
				border-left: 12px solid transparent;
				border-bottom: 36px solid #ffffff;
			}
		}

		.head-bottom {
			overflow: hidden;
			background: #ffffff;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;

			.tab {

				.t-top {

					&-box {
						display: flex;
						align-items: center;
						margin: 0;
						padding: 12px;

						.txt1 {
							font-size: 18px;
							color: #888;
						}

						.icon1 {
							margin-left: 8px;
							color: #bbb;
						}
					}

					&-box:active {
						background-color: #f5f5f5;
					}
				}

				.t-bb {
					margin: 0 12px;
					height: 0.5px;
					background-color: #E4E7ED;
				}

				.t-bottom {
					padding: 12px;

					.row1 {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						//padding: 12px 0 0;
						.left {
							font-size: 14px;
							font-weight: bold;
						}

						.right {
							display: flex;
							align-items: center;
							font-size: 14px;
							color: #ff9800;

							i {
								margin-left: 8px;
								color: #bbb;
							}
						}
					}

					.row2 {
						margin-top: 6px;
						font-size: 12px;
						color: #ff9800;
					}
				}
			}
		}

		.head-bottom.selectOne {
			border-top-left-radius: 0;
			border-top-right-radius: px;
		}

		.head-bottom.selectTow {
			border-top-left-radius: 6px;
			border-top-right-radius: 0;
		}
	}

	.store {
		display: flex;
		flex-direction: column;

		.name {
			padding: 4px 0 0px;
			font-size: 14px;
		}

		.goods-box {
			.goods-item {
				margin-top: 20px;
				display: flex;
				flex-direction: row;

				.left {
					width: 60px;
					height: 60px;

					image {
						border-radius: 4px;
						overflow: hidden;
						width: 100%;
						height: 100%;
						background-color: #f1f1f1;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					padding-left: 14px;

					.row1 {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.tit {
							font-size: 14px;
							color: #333333;
							font-weight: bold;
							flex: 1;
							flex-wrap: wrap;

							.zk {
								padding: 1px 3px;
								font-size: 10px;
								margin-right: 8px;
								border-radius: 4px;
								background-color: #F9221D;
								color: #ffffff;
							}
						}

						.old-price {
							padding-left: 12px;
							font-size: 14px;
							color: #888888;
							font-weight: bold;

							.lt {
								text-decoration: line-through;
							}

							.fh {
								font-size: 10px;
							}
						}

						.price {
							font-size: 16px;
							padding-left: 12px;
							color: #333333;
							font-weight: bold;

							.fh {
								font-size: 10px;
							}
						}
					}

					.row2 {}

					.row3 {
						font-size: 10px;
						color: #888888;
					}
				}
			}

			.goods-item:first-child {
				margin: 0;
			}
		}

		.peisong {
			.right {
				font-size: 14px;
				font-weight: bold;
			}

			.left {
				font-size: 16px;
				font-weight: bold;

				.fh {
					font-size: 10px;
				}
			}
		}

		.zhekou-box {
			.zhekou {
				display: flex;
				flex-direction: column;
				margin-top: 12px;

				.row1 {
					align-items: center;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 20px;
						line-height: 20px;

						i {
							font-size: 16px;
							color: #ff5722;
						}

						.tit {
							font-weight: bold;
							margin-left: 6px;
							font-size: 14px;
							color: #333;
						}
					}

					.right {
						.tag1 {
							font-weight: bold;
							font-size: 14px;
							color: #ff5722;
						}
					}
				}

				.row2 {

					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #888;
				}

			}

			.zhekou:first-child {
				margin: 0;
			}
		}

		.totalbox {
			align-items: flex-end;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 14px;
				color: #888;

				[class*="hxicon-"] {
					color: #aaa;
					margin-left: 4px;
					font-size: 16px;
				}
			}

			.right {
				display: flex;
				flex-direction: row;
				align-items: flex-end;

				.yh {
					color: #ff5722;

					.txt {

						color: #000;
						font-size: 15px;
					}

					.fh {
						font-weight: bold;
						margin-left: 3px;
						font-size: 13px;
					}

					.num {
						font-weight: bold;
						font-size: 18px;
					}
				}

				.total {
					margin-left: 16px;
					color: #333;

					.txt {
						font-size: 15px;
					}

					.fh {
						margin-left: 3px;
						font-size: 12px;
						font-weight: bold;
					}

					.num {
						font-weight: 900;
						font-size: 22px;
					}
				}
			}
		}
	}

	.privacy {
		display: flex;
		flex-direction: column;

		.row1 {
			align-items: flex-end;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.icon1 {
					color: #444;
					font-size: 24px;
				}

				.icon2 {
					color: #aaa;
					margin-left: 6px;
					font-size: 16px;
				}

				.txt {
					color: #333;
					margin-left: 6px;
					font-weight: bold;
					font-size: 14px;
				}
			}

			.right {}
		}

		.row2 {
			margin-top: 4px;
			color: #888;
			font-size: 12px;
		}

		.row3 {
			margin-top: 8px;
			font-size: 12px;
			color: #ff9800;
		}
	}

	.other-box {
		display: flex;
		flex-direction: column;

		.row {
			align-items: center;

			.left {
				font-size: 14px;
				color: #333;
				font-weight: bold;
				flex: 1;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				flex-wrap: wrap;
				width: 60%;
				font-size: 14px;
				display: flex;
				flex-direction: row;
				color: #aaa;

				[class*="hxicon-"] {
					position: relative;
					top: 2px;
					font-size: 14px;
				}
			}
		}
	}

	.body-end {
		height: 100px;
	}

	.foot {
		z-index: 11;
		position: fixed;
		display: flex;
		flex-direction: row;
		border-radius: 50px;
		overflow: hidden;
		bottom: 12px;
		left: 12px;
		right: 12px;
		height: 50px;

		.left {
			padding: 0 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #222222;
			flex: 1;

			.price {
				display: flex;
				flex-direction: row;
				align-items: baseline;
				color: #fff;
				height: 25px;
				line-height: 25px;

				.fh {
					font-weight: bold;
					font-size: 12px;
				}

				.txt {

					font-size: 22px;
					font-weight: bold;
				}
			}

			.discount {
				margin-left: 2px;
				font-size: 10px;
				color: #bbb;
			}
		}

		.center {
			display: flex;
			align-items: center;
			background-color: #444;
			color: #FFC107;
			font-weight: bold;
			font-size: 16px;
			padding-left: 15px;
			padding-right: 15px;
			transition: all 0.3s;
		}

		.center:active {
			background-color: #666;
		}

		.right {
			display: flex;
			align-items: center;
			color: #222;
			font-weight: bold;
			font-size: 16px;
			padding-left: 15px;
			padding-right: 15px;
			transition: all 0.3s;
			background: linear-gradient(45deg, #FFEB3B, #FFC107);
		}

		.right:active {
			background: linear-gradient(45deg, #e0ce31, #e4ad06);
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 22;
		background: rgba($color: #000000, $alpha: 0.8);
	}

	.selectTimeBox {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		// height: 600upx;
		background: #fff;
		padding: 20upx;
		padding-left: 0;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;

		.selectTimeTitle {
			text-align: center;
			padding-bottom: 20upx;
			position: relative;
			font-size: 26upx;

			image {
				position: absolute;
				right: 20upx;
				top: 0upx;
				width: 22upx;
				height: 22upx;
			}
		}

		.selectTimeContent {
			display: flex;
			justify-content: space-between;

			.timeContentLeft {
				width: 250upx;
				height: 500upx;
				background: #F5F5F5;

				view {
					height: 80upx;
					line-height: 80upx;
					text-align: center;
				}

				.selectDate {
					background: #fff;
				}
			}

			.timeContentRight {
				width: 500upx;
				height: 500upx;
				padding: 0 31upx;
				overflow-y: scroll;

				view {
					box-sizing: border-box;
					height: 80upx;
					line-height: 80upx;
					border-bottom: 2upx dashed #333;
					color: #333333;
					font-size: 24upx;
				}

				.selectTime {
					color: #FFDF68;
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 28upx;
						height: 18upx;
					}
				}
			}
		}
	}
	.remarkBox{
		display: flex;
		align-items: center;
		
		.right{
			input{
				width: 330upx;
			}
		}
	}
</style>
