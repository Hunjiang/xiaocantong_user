<template>
	<view>
		<hx-navbar left-text="帮助与反馈" defaultBackUrl="/pages/user/setting/setting" :background-color="[245,245,245]"></hx-navbar>
		
		<view class="flex-sub ">
			<view class="solid-bottom text-df padding">
				<text class="text-gray">热点问题</text>
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<navigator class="cu-item arrow " url="help_problem?v=202" open-type="navigate">
				<view class="content">
					<text class="text-black">如何使用用户帮助功能？</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow " url="help_problem?v=201" open-type="navigate">
				<view class="content">
					<text class="text-black">该app能不能推荐给我的朋友，或者网友呢？</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow " url="help_problem?v=201" open-type="navigate">
				<view class="content">
					<text class="text-black">该app能不能推荐给我的朋友，或者网友呢？</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow " url="help_problem?v=201" open-type="navigate">
				<view class="content">
					<text class="text-black">该app能不能推荐给我的朋友，或者网友呢？</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow " url="help_problem?v=201" open-type="navigate">
				<view class="content">
					<text class="text-black">该app能不能推荐给我的朋友，或者网友呢？</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow " url="help_problem?v=201" open-type="navigate">
				<view class="content">
					<text class="text-black">该app能不能推荐给我的朋友，或者网友呢？</text>
				</view>
			</navigator>
		</view> 
		
		<view class="cu-bar flex foot">
			<button class="cu-btn lg text-grey" style="width: 100%;"><uni-icons style="chat" size="30"></uni-icons>意见反馈</button>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
