<template>
	<view>
		<hx-navbar title="搜索页面"></hx-navbar>
		<view class="ctn">
			<view class="hx-search-box" >
			    <uni-icons type="search" size="22" color="#666666" />
				<input placeholder="输入搜索关键词" v-model="name" autofocus="autofocus" @change="goSearch"/>
			</view>
		</view>
		<view class=" store-box" v-if="storeList">
			<view class=" item-box" v-for="(store,i) in storeList" :key="i">
				<view class="container top-box">
					<view class="left" @click="toStore(store.id,store.status)">
						<image :src="base+store.logo" mode="aspectFill"></image>
						<view class="tit" >{{store.status==1?'营业中':'已打烊'}}</view>
					</view>
					<view class="right" @click="toStore(store.id,store.status)">
						
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
						<view class="goods-box" v-for="(goods,j) in store.goods" :key="j" @click="toStore(store.id,store.status)">
							<view class="img-box">
								<image :src="base+goods.images.split(',')[0]" mode="aspectFit"></image>
							</view>
							<view class="tit">
								{{goods.name}}
							</view>
							<view class="price-box">
								<text class="txt1">￥</text>
								<text class="txt2">{{goods.price}}</text>
								<text class="txt3" v-if="goods.line_price!=0">￥{{goods.line_price}}</text>
							</view>
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				base:this.$base,
				dataType: null,
				storeList:[]
			}
		},
		onLoad(option){
			if(option.type){
				switch(option.type){
					case 'home':
						this.dataType = "来自首页的搜索";
						break
					case 'store':
						this.dataType = "来自商户页的搜索"
						break
					case 'order':
						this.dataType = "来自订单页的搜索"
						break
				}
			}
		},
		methods: {
			goSearch(){
				this.$u.get('/api/index/search',{
					name:this.name
				}).then(res=>{
					this.storeList = res.data
				})
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
		}
	}
</script>

<style lang="scss">
.contianer{
	margin: 15px;
}
.txt{
	font-size: 16px;
	color: #888888;
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
</style>
