<template>
	<view>
		<view v-for="(item,index) of list" class="card" :key='index'>
			<u-image  @click="toStore(item.id)" :src="base+item.logo" width="190rpx" height="120rpx" mode="aspectFill" border-radius="10rpx"></u-image>
			<view>
				<view  @click="toStore(item.id)">{{item.name}}</view>
				<view class="center">
					<u-rate  @click="toStore(item.id)" :count="5" v-model="item.total_grade" active-color="#f4bd00"  size="26"  :disabled="true"></u-rate>
					<view @click="Star(item.id,index)">删除</view>
				</view>
				<view @click="toStore(item.id)">
					<view>起送 ￥{{item.min_price}}</view>
					<view>配送 ￥{{item.shipping_free}}</view>
				</view>
				
			</view>
			<u-gap height="80" bg-color="#bbb"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[],
				base:this.$base
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			delItem(){
				
			},
			Star(id,index){
				uni.showModal({
					title:'提示',
					content:'取消收藏？',
					success: (res) => {
						if(res.confirm){
							this.$u.get('/api/shop/collect',{
								shop_id:id
							}).then(res=>{
								if(res.code==1){
									uni.showToast({
										title:res.msg,
										icon:'none',
										success: () => {
											this.list.splice(index,1)
										}
									})
								}
							})
						}
					}
				})
			},
			toStore(id){
				uni.navigateTo({
					url: '/pages/store/index?sid='+id
				})
			},
			getList(){
				this.$u.get('/api/user/myCollect',{
					page:1,
					limit:100
				}).then(res=>{
					if(res.code==1){
						this.list = res.data
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.card{
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 25rpx 0;
		u-image{
			margin-left: 25rpx;
		}
		>view{
			margin-left: 25rpx;
			>view:first-child{
				font-weight:bold;
				font-size: 32rpx;
				
			}
			>view:last-child{
				display: flex;
				align-items: center;
				>view:last-child{
					margin-left: 20rpx;
				}
			}
		}
	}
	.center{
		width: 480upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view{
			color: red;
		}
	}
</style>
