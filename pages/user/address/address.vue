<template>
	<view class="content b-t">
		<hx-navbar left-text="收货地址" backTabbarUrl="/pages/user/center/center" :backgroundColor="[241,241,241]"></hx-navbar>
		<view class="bb15">
			
		</view>
		<view class="list-box">
			<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
				<view class="wrapper">
					<view class="address-box">
						<text v-if="item.default_status==2" class="tag">默认</text>
						<text class="address">{{item.campus_name}} {{item.detail}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.phone}}</text>
					</view>
				</view>
				<text class="hxicon-edit" @click.stop="addAddress('edit', item)"></text>
				<u-icon name="trash" @click.stop="delAddress(item.id,index)"></u-icon>
			</view>
		</view>
		
		<view class="add-btn" @click="addAddress('add')">
			<text>新增地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: [
				],
				pageIndex: 0
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		methods: {
			delAddress(id,index){
				uni.showModal({
					title:'提示',
					content:'确认删除？',
					success: (res) => {
						if(res.confirm){
							this.$u.get('/api/address/addressOperation',{
								address_id:id,
								type:2
							}).then(res=>{
								if(res.code==1){
									uni.showToast({
										title:'删除地址成功',
										icon:'none',
										success: () => {
											this.addressList.splice(index,1)
										}
									})
								}
							})
						}
					}
				})
			},
			//选择地址
			checkAddress(item){
				 let pages = getCurrentPages(); //获取页面栈
				 console.log(pages)
				 console.log(pages[0].route);
				                    //获取到返回的页面下标
				     //                let pageIndex = pages.findIndex(findItem=>{
				     //                    // return findItem.route==='pages/order/preview' /* 需返回的页面路由:'pages/handling/handling'  */
									// 	return findItem.route==='pages/user/integral/details' /* 需返回的页面路由:'pages/handling/handling'  */
				     //                })
									// console.log(pageIndex);
									
									
									if(pages[0].route == 'pages/user/integral/details') {
										this.pageIndex = pages.findIndex(findItem=>{										   											return findItem.route==='pages/user/integral/details' /* 需返回的页面路由:'pages/handling/handling'  */
										})
									}else if(pages[0].route == 'pages/order/preview') {
										 this.pageIndex = pages.findIndex(findItem=>{
										    return findItem.route==='pages/order/preview' /* 需返回的页面路由:'pages/handling/handling'  */											
										})
									}else {
										uni.showToast({
											title: '程序出错了，请联系管理人员',
											icon: 'none'
										})
									}									
				                    //获取到返回的页面对象
				                    let prevPage = pages[this.pageIndex];
									console.log('item1',JSON.stringify(item))
				                        prevPage.$vm.item = JSON.stringify(item);
										console.log('item2',prevPage.$vm.item)
				                    uni.navigateBack({delta:(pages.length-(this.pageIndex+1))})//返回到列表页面
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/user/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			}
		},
		onShow() {
			this.$u.get('/api/address/address',{
				page:1,
				limit:100
			}).then(res=>{
				this.addressList = res.data
			})
		}
	}
</script>

<style lang='scss'>
	.bb15{
		padding-bottom: 30upx;
	}
	.content{
		position: relative;
	}
	.list-box{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 15px;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 14px 15px;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffc107;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-edit{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		overflow: hidden;
		bottom: 15px;
		left: 15px;
		right: 15px;
		height: 45px;
		font-size: 16px;
		font-weight: bold;
		color: #333;
		background: linear-gradient(45deg, #ffd900, #ffc107);		
	}
</style>
