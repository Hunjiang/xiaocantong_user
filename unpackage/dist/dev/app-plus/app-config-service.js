
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/store/index","pages/order/comment","pages/product/product","pages/user/login/login","pages/user/register/register","pages/user/forget/forget","pages/user/center/center","pages/avatar-cropper/u-avatar-cropper","pages/store/starList","pages/user/setting/setting","pages/user/bash/bash","pages/user/account_security/security","pages/user/account_security/phone","pages/user/account_security/update_password","pages/user/account_security/address_book","pages/user/account_security/update_phone","pages/user/account_security/bind_phone","pages/base/protocol/protocol","pages/base/about","pages/base/features","pages/base/release_notes","pages/base/help_feedback","pages/base/help_problem","pages/user/account_security/forget_password","pages/user/account_security/verification_phone","pages/user/address/address","pages/user/address/addressManage","pages/order/order","pages/order/status","pages/order/preview","pages/order/pay","pages/search/search","pages/user/coupon/coupon","pages/map/location","pages/user/integral/myIntegral","pages/user/integral/record","pages/user/integral/integralShop","pages/user/integral/details","pages/user/integral/successful","pages/user/rider/riderRes"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"校餐通","navigationBarBackgroundColor":"#F8F8F8","navigationStyle":"custom","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#ffc107","borderStyle":"black","backgroundColor":"#ffffff","fontSize":"11px","spacing":"5px","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/tab-home.png","selectedIconPath":"static/tabbar/tab-home-current.png","text":"首页"},{"pagePath":"pages/order/order","iconPath":"static/tabbar/order.png","selectedIconPath":"static/tabbar/order-current.png","text":"订单"},{"pagePath":"pages/user/center/center","iconPath":"static/tabbar/tab-my.png","selectedIconPath":"static/tabbar/tab-my-current.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"校餐通外卖","compilerVersion":"2.9.8","entryPagePath":"pages/store/index","entryPageQuery":"?sid=6","realEntryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"校餐通","scrollIndicator":"none","enablePullDownRefresh":true}},{"path":"/pages/store/index","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/order/comment","meta":{},"window":{"navigationBarTitleText":"发表评价","navigationStyle":"default"}},{"path":"/pages/product/product","meta":{},"window":{"animationType":"zoom-out","animationDuration":300}},{"path":"/pages/user/login/login","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/user/register/register","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/user/forget/forget","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"找回密码","scrollIndicator":"none"}},{"path":"/pages/user/center/center","meta":{"isQuit":true,"isTabBar":true},"window":{"scrollIndicator":"none"}},{"path":"/pages/avatar-cropper/u-avatar-cropper","meta":{},"window":{"navigationBarTitleText":"头像裁剪","navigationBarBackgroundColor":"#000000","navigationStyle":"default"}},{"path":"/pages/store/starList","meta":{},"window":{"navigationBarTitleText":"店铺收藏","navigationStyle":"default"}},{"path":"/pages/user/setting/setting","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"个人中心","scrollIndicator":"none"}},{"path":"/pages/user/bash/bash","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/user/account_security/security","meta":{},"window":{}},{"path":"/pages/user/account_security/phone","meta":{},"window":{}},{"path":"/pages/user/account_security/update_password","meta":{},"window":{}},{"path":"/pages/user/account_security/address_book","meta":{},"window":{}},{"path":"/pages/user/account_security/update_phone","meta":{},"window":{}},{"path":"/pages/user/account_security/bind_phone","meta":{},"window":{}},{"path":"/pages/base/protocol/protocol","meta":{},"window":{}},{"path":"/pages/base/about","meta":{},"window":{}},{"path":"/pages/base/features","meta":{},"window":{}},{"path":"/pages/base/release_notes","meta":{},"window":{}},{"path":"/pages/base/help_feedback","meta":{},"window":{}},{"path":"/pages/base/help_problem","meta":{},"window":{}},{"path":"/pages/user/account_security/forget_password","meta":{},"window":{}},{"path":"/pages/user/account_security/verification_phone","meta":{},"window":{}},{"path":"/pages/user/address/address","meta":{},"window":{}},{"path":"/pages/user/address/addressManage","meta":{},"window":{}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/order/status","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/order/preview","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/order/pay","meta":{},"window":{"scrollIndicator":"none"}},{"path":"/pages/search/search","meta":{},"window":{}},{"path":"/pages/user/coupon/coupon","meta":{},"window":{}},{"path":"/pages/map/location","meta":{"isNVue":true},"window":{}},{"path":"/pages/user/integral/myIntegral","meta":{},"window":{"navigationBarTitleText":"我的积分","navigationStyle":"default","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/integral/record","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/integral/integralShop","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/integral/details","meta":{},"window":{"navigationBarTextStyle":"white","navigationStyle":"custom"}},{"path":"/pages/user/integral/successful","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/rider/riderRes","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
