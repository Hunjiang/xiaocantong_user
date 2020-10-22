<template>
	<view class="content">
		<hx-navbar title="收货地址" backTabbarUrl="/pages/user/center/center" :backgroundColor="[241,241,241]"></hx-navbar>
		<view class="bb15">
			
		</view>
		<view class="list-box">
			<view class="row b-b">
				<text class="tit">联系人</text>
				<input class="input" type="text" v-model="name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="number" v-model="phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
			</view>
<!-- 			<view class="row b-b">
				<text class="tit">地址</text>
				<text @click="chooseLocation" class="input">
					{{addressData.addressName}}
				</text>
				<text class="hxicon-locationfill"></text>
			</view> -->
			<view class="row b-b"> 
				<text class="tit">选择校区</text>
				<input class="input" type="text" disabled @click="show=true" v-model="campus_name" placeholder="校区" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">详细地址</text>
				<input class="input" type="text" v-model="detail" placeholder="楼号、门牌" placeholder-class="placeholder" />
			</view>
			
			<view class="row default-row">
				<text class="tit">设为默认</text>
				<switch :checked="isdefault==2" color="#ffc107" @change="switchChange" />
			</view>
			</view>
		<view class="add-btn" @click="confirm">
			<text>提交</text>
		</view>
		<u-select v-model="show" :list="locList" @confirm="changeLoc"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:null,
				phone:null,
				detail:null,
				campus_id:null,
				campus_name:null,
				isdefault:2,
				locList:[],
				show:false,
				address_id:null
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				console.log(option)
				console.log( JSON.parse(option.data))
				let data = JSON.parse(option.data)
				this.name = data.name 
				this.phone = data.phone
				this.detail = data.detail
				this.campus_id = data.campus_id
				this.campus_name = data.campus_name
				this.isdefault = data.default_status
				this.address_id = data.id
			}
			this.manageType = option.type;
			this.$u.get('/api/address/selectCampus').then(res=>{
				res.data.forEach((item,index)=>{
					this.locList.push({value:item.id,label:item.name})
				})
			})
			
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			changeLoc(e){
				this.campus_id = e[0].value
				this.campus_name = e[0].label
			},
			switchChange(e){
				console.log(e)
				this.isdefault = e.detail? 2:1;
			},
			//提交
			confirm(){
				if(!this.name){
					uni.showToast({
						title:'请填写收货人姓名',
						icon:'none'
					})
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.phone)){
					uni.showToast({
						title:'请输入正确的手机号码',
						icon:'none'
					})
					return;
				}
				if(!this.detail){
					uni.showToast({
						title:'请填写详细地址',
						icon:'none'
					})
					return;
				}
				if(!this.campus_id){
					uni.showToast({
						title:'请选择所在校区',
						icon:'none'
					})
					return;
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				if(this.manageType!=='edit'){
					this.$u.get('/api/address/addressAdd',{
						campus_id:this.campus_id,
						name:this.name,
						phone:this.phone,
						detail:this.detail,
						default_status:this.isdefault
					}).then(res=>{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
						
					})
				}else{
					this.$u.get('/api/address/addressEdit',{
						campus_id:this.campus_id,
						name:this.name,
						phone:this.phone,
						detail:this.detail,
						default_status:this.isdefault,
						address_id:this.address_id,
						status:2
					}).then(res=>{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
						
					})
				}
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
			},
		}
	}
</script>

<style lang="scss">
	.bb15{
		background: #f1f1f1;
		padding-top: 40upx;
	}
	.list-box{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 15px;
	}
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-locationfill{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
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
