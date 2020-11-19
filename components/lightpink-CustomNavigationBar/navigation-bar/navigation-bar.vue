<template>
	<div class="relative_nav" :style='{height: customBar}' v-if="!transparent">
		<!-- 非沉浸 -->
		<div class="fixed_nav"
		  :style="{height: customBar, backgroundColor:isBgcolor ? bgcolor : '',
		  backgroundImage: isBgimage ? 'url('+ bgimage +')' : 'linear-gradient('+ gradient +')', backgroundRepeat: 'norepeat', backgroundSize: '100% 100%', backgroundPosition: 'center'}" >
			<!-- 状态栏 -->
			<div class="status_bar" :style='{height: statusBar}'></div>
			<!-- 导航栏 -->
			<div class="nav_bar" :style='{height: navBar}'>
				<!-- 返回按钮区域 -->
				<div class="nav_bar_back iconfont icon-jiantou" 
				  :style='{height: navBar, color: backColor, lineHeight: navBar}'
				  @click="handleBack"     v-if="isback"></div>
			    <div class="nav_bar_back" v-else="!isback"></div>

			    <!-- 导航栏内容区域 -->
				<div class="nav_bar_con" 
				  :style='{height: navBar, lineHeight: navBar, color: titleColor, textAlign: textAlign}'>{{title}}</div>

				<!-- 自定义区域 -->
				<div :class="!isText ? 'nav_bar_btn_icon iconfont ' + btnIcon : 'nav_bar_btn_text'"
				  :style='{height: navBar, lineHeight: navBar, color: btnColor}'
				  @click="handleOther" v-show="isRight">{{isText ? btnText : ''}}</div>
				<div class="nav_bar_btn_icon":style='{height: navBar}' 
				   v-show="!isRight"></div>
				<!-- <div class="nav_bar_html" v-html='html'></div> -->
			</div>
		</div>
	</div>
	<!-- #ifdef H5 -->
	<div v-else="transparent" style="position: relative">
		<div class="fixed_nav"  
		  :style="{height: customBar, backgroundColor:isBgcolor ? bgcolor : '#ffffff', opacity: percentage,
		  backgroundImage: isBgimage ? 'url('+ bgimage +')' : 'linear-gradient('+ gradient +')', backgroundRepeat: 'norepeat', backgroundSize: '100% 100%', backgroundPosition: 'center'}">
			<!-- 状态栏 -->
			<div class="status_bar" :style='{height: statusBar}'></div>
			<!-- 导航栏 -->
			<div class="nav_bar" :style='{height: navBar}'>
				<!-- 返回按钮 -->
				<div class="nav_bar_back_transparent iconfont icon-jiantou" 
				  :style='{height: "35px", color: backColor, width: "35px", lineHeight: "35px", marginTop: transparentBackHeight, opacity: 1}'
				  @click="handleBack" v-if="isback"></div>
			    <div class="nav_bar_back" v-if="!isback"></div>
			    <!-- 标题 -->
				<div class="nav_bar_con" 
				  :style='{height: navBar, lineHeight: navBar, color: titleColor, textAlign: textAlign}'>我是一</div>
			    <!-- btn -->
				<div class="nav_bar_btn_icon iconfont" :class="btnIcon"
				  :style='{height: navBar, lineHeight: navBar, color: btnColor}'
				  @click="handleOther" v-show="isRight"></div>
				<div class="nav_bar_btn_icon":style='{height: navBar}' 
				   v-show="!isRight"></div>
			</div>
		</div>
		<div class="transparent_btn iconfont icon-jiantou" :style='{height: "35px", color: backColor, width: "35px", lineHeight: "35px", top: transparentBackHeight, backgroundColor: percentage < 0.5 ? bgcolor : ""}'></div>
	</div>
	<!-- #endif -->
</template>

<script>
	/**
	 * noTransparent          transparent === false (默认)
	 * Transparent
	 *    transparent导航栏    transparent === true
	 */
	export default {
		name: 'navigationBar',
		data() {
			return {
				statusBar: '24px',
				customBar: '70px',
				navBar: '45px',
				transparentBackHeight: '',
				percentage: 0,
			}
		},
		props: {
			// 沉浸式导航栏
			transparent: {
				type: Boolean,
				default: false,
			},
			// 是否有返回按钮
			isback: {
				type: Boolean,
				default: true,
			},
			backColor: {
				type: String,
				default: '#333333'
			},
			// 导航栏文字
			title: {
				type: String,
				default: ''
			},
			titleColor: {
				type: String,
				default: '#333333',
			},
			// 是否背景色 (默认白色)
			isBgcolor: {
				type: Boolean,
				default: false
			},
			// 背景色  Attribute
			bgcolor: {
				type: String,
				default: '#ffffff'
			},
			// 是否渐变  (默认白 -> 热粉)
			isGradient: {
				type: Boolean,
				default: false
			},
			// 渐变色  Attribute
			gradient: {
				type: String,
				default: ''
			},
			// 是否背景图
			isBgimage: {
				type: Boolean,
				default: false
			},
			// 背景图  Attribute url
			bgimage: {
				type: String,
				default: ''
			},
			// 是否有右边自定义部分
			isRight: {
				type: Boolean,
				default: false,
			},
			// btn => text or icon
			isText: {
				type: Boolean,
				default: false
			},
			btnText: {
				type: String,
				default: '分享'
			}, 
			// 字体图标
			btnIcon: {
				type: String,
				default: 'icon-jiahao'
			},
			btnColor: {
				type: String,
				default: '#333'
			},
			// 是否有红点标记
			isRedPoint: {
				type: Boolean,
				default: false,
			},
			// 沉浸目标ID
			id: {
				type: String,
				default: ''
			},
			// 居中
			textAlign: {
				type: String,
				default: "center"
			},
		},
		created() {
			// Status bar
			this.statusBar = this.StatusBar + 'px'
			// Navigation Bar
			this.navBar = this.CustomBar - this.StatusBar + 'px'			
			// Custom bar
			this.customBar = this.CustomBar + 'px'
			// Transparent back button
			this.transparentBackHeight = (this.CustomBar - this.StatusBar - 35) / 2 + this.StatusBar + 'px'
		},
		methods: {
			// 返回时事件
			handleBack() {
				uni.navigateBack()
				console.log("点击了back!")
			},
			// 自定义区域按钮文字点击事件
			handleOther() {
				console.log("点击了other!")
				// this.$emit("")
			},
			scrollEvent(e) {
				console.log("e" + e)
			}
		},
		mounted() {
			console.log(this.id)
			// #ifdef H5
			let image = document.getElementById(this.id).style.height
			let arr = image.split('px')
			let top = parseInt(arr)
			window.addEventListener('scroll', () => {
				if (top >= window.pageYOffset){
					this.percentage = Math.floor((window.pageYOffset / top) * 10) / 10
					console.log(this.percentage)
				} else {
					this.percentage = 1
				}
			})
			// #endif
			
			// #ifdef APP-PLUS || MP-WEIXIN
			
			// #endif
		}
	}
</script>

<style>
	/***/
	.relative_nav {
		width: 750rpx;
		position: relative;
		font-size: 40rpx;
		}
		.fixed_nav {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10001;
			}
			.status_bar {
				width: 100%;
				}
			.nav_bar {
				width: 100%;
				position: relative;
				display: flex;
				justify-content: space-between;
				}
				/* 非沉浸式返回按钮 */
				.nav_bar_back {
					width: 60rpx;
					text-align: right;
					font-size: 40rpx;
				}
				/* 沉浸式返回按钮 */
				.nav_bar_back_transparent {
					border-radius: 50%;
					text-align: center;
					font-size: 40rpx;
				}
				.transparent_btn {
					border-radius: 50%;
					text-align: center;
					font-size: 40rpx;
					position: fixed;
					z-index: 10003;
				}
				.nav_bar_con {
					font-weight: 700;
					width: 456rpx;
					text-align: center;
				}
				.nav_bar_btn_icon {
					width: 60rpx;
					text-align: left;
					font-size: 40rpx;}
				.nav_bar_btn_text {
					width: 120rpx;
					font-size: 30rpx;
					text-align: center;
				}
				.nav_bar_html {}

    
</style>