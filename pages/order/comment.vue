<template>
	<view class="content">
		
		<view>
			<u-upload :action="base+'/api/common/upload'" :file-list="fileList" ref="uUpload"></u-upload>
		</view>
		<view>
			<u-radio-group v-model="score_type" @change="radioGroupChange">
				<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view>请为该店铺打分</view>
		<view>
			<u-rate :count="5" v-model="score" active-color="#ffdb27"></u-rate>
		</view>
		<view>
			<u-field style="border-radius: 2rpx solid #ccc;" v-model="content" label="评价" placeholder="请填写评价" type="textarea"></u-field>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;">
			<view>匿名评价</view>
			<u-switch v-model="anonymity_status"></u-switch>
		</view>
		
		
		
		<view style="display: flex;
		align-items: center;">
			<u-button type="primary" size="default" @click="submit" ripple>确认提交</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:this.$base,
				list: [{
						name: '好评',
						disabled: false
					},
					{
						name: '差评',
						disabled: false
					}
				],
				score:5,
				content:'',
				score_type:'好评',
				id:null,
				anonymity_status:false
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id 
		},
		methods:{
			anonymityChange(e){
				console.log(e)
				if(e=='匿名评价'){
					this.anonymity = ''
				}
			},
					// 选中任一radio时，由radio-group触发
					radioGroupChange(e) {
						this.score_type = e
						console.log(e);
					},
					submit() {
						// if(this.content==''){
						// 	uni.showModal({
						// 		title:'评价不能为空'
						// 	})
						// 	return;
						// }
									let files = [];
									// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
									files = this.$refs.uUpload.lists.filter(val => {
										return val.progress == 100;
									})
									// 如果您不需要进行太多的处理，直接如下即可
									// files = this.$refs.uUpload.lists;
									console.log(files)
									let list = []
									files.forEach((item,index)=>{
										list.push(item.response.data.url)
									})
									list = list.join(',')
									console.log(list)
									this.$u.get('/api/order/goComment',{
										order_id:this.id,
										score:this.score,
										score_type:this.score_type=='好评'?10:20,
										content:this.content,
										images:list,
										anonymity_status:this.anonymity_status?1:2
									}).then(res=>{
										if(res.code==1){
											uni.showToast({
												title:'评论成功',
												icon:'none',
												success: () => {
													setTimeout(()=>{
														uni.switchTab({
															url:'/pages/user/center/center'
														})
													},1500)
												}
											})
											
											
										}
										
										
									})
								}
		}
	}
</script>

<style lang="scss">
	.content{
		margin: 0 auto;
		margin-top: 50rpx;
		width: 690rpx;
		border-radius:25rpx ;
		padding: 30rpx;
		
		background-color: #FFFFFF;
		>view{
			padding: 20rpx 0;
			border-bottom: 2rpx solid #CCCCCC;
		}
	}
	
	
	
</style>
