(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-setting-setting"],{"1e51":function(t,e,n){"use strict";n.r(e);var o=n("9e07"),i=n("40be");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("7a8f");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"323cd408",null,!1,o["a"],r);e["default"]=c.exports},"1ea8":function(t,e,n){var o=n("c3d6");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("0da698f2",o,!0,{sourceMap:!1,shadowMode:!1})},"23c7":function(t,e,n){var o=n("63df");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("5c127ad2",o,!0,{sourceMap:!1,shadowMode:!1})},"40be":function(t,e,n){"use strict";n.r(e);var o=n("f626"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"432c":function(t,e,n){"use strict";n.r(e);var o=n("e2be"),i=n("e5e1");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("7cb0");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"39ab6848",null,!1,o["a"],r);e["default"]=c.exports},"63df":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/.u-model[data-v-39ab6848]{height:auto;overflow:hidden;font-size:%?32?%;background-color:#fff}.u-model__btn--hover[data-v-39ab6848]{background-color:#e6e6e6}.u-model__title[data-v-39ab6848]{padding-top:%?48?%;font-weight:500;text-align:center;color:#303133}.u-model__content__message[data-v-39ab6848]{padding:%?48?%;font-size:%?30?%;text-align:center;color:#606266}.u-model__footer[data-v-39ab6848]{display:-webkit-box;display:-webkit-flex;display:flex}.u-model__footer__button[data-v-39ab6848]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?100?%;line-height:%?100?%;font-size:%?32?%;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;text-align:center;-webkit-border-radius:%?4?%;border-radius:%?4?%}',""]),t.exports=e},6504:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"u-modal",props:{value:{type:Boolean,default:!1},zIndex:{type:[Number,String],default:""},title:{type:[String],default:"提示"},width:{type:[Number,String],default:600},content:{type:String,default:"内容"},showTitle:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0},showCancelButton:{type:Boolean,default:!1},confirmText:{type:String,default:"确认"},cancelText:{type:String,default:"取消"},confirmColor:{type:String,default:"#2979ff"},cancelColor:{type:String,default:"#606266"},borderRadius:{type:[Number,String],default:16},titleStyle:{type:Object,default:function(){return{}}},contentStyle:{type:Object,default:function(){return{}}},cancelStyle:{type:Object,default:function(){return{}}},confirmStyle:{type:Object,default:function(){return{}}},zoom:{type:Boolean,default:!0},asyncClose:{type:Boolean,default:!1},maskCloseAble:{type:Boolean,default:!1},negativeTop:{type:[String,Number],default:0}},data:function(){return{loading:!1}},computed:{cancelBtnStyle:function(){return Object.assign({color:this.cancelColor},this.cancelStyle)},confirmBtnStyle:function(){return Object.assign({color:this.confirmColor},this.confirmStyle)},uZIndex:function(){return this.zIndex?this.zIndex:this.$u.zIndex.popup}},watch:{value:function(t){!0===t&&(this.loading=!1)}},methods:{confirm:function(){this.asyncClose?this.loading=!0:this.$emit("input",!1),this.$emit("confirm")},cancel:function(){var t=this;this.$emit("cancel"),this.$emit("input",!1),setTimeout((function(){t.loading=!1}),300)},popupClose:function(){this.$emit("input",!1)},clearLoading:function(){this.loading=!1}}};e.default=o},"7a8f":function(t,e,n){"use strict";var o=n("1ea8"),i=n.n(o);i.a},"7cb0":function(t,e,n){"use strict";var o=n("23c7"),i=n.n(o);i.a},"9e07":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={uModal:n("432c").default,uField:n("ae25").default},i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",[o("v-uni-view",{staticClass:"userImg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseAvatar.apply(void 0,arguments)}}},[o("v-uni-view",[t._v("头像")]),o("v-uni-view",{staticClass:"imgBox"},[o("v-uni-image",{attrs:{src:t.base+t.userInfo.avatar,mode:""}}),o("v-uni-image",{attrs:{src:n("d647"),mode:""}})],1)],1),o("v-uni-view",{staticClass:"userImg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showForm=!0}}},[o("v-uni-view",[t._v("昵称")]),o("v-uni-view",{staticClass:"imgBox"},[o("v-uni-text",[t._v(t._s(t.userInfo.nickname))]),o("v-uni-image",{attrs:{src:n("d647"),mode:""}})],1)],1),o("u-modal",{attrs:{"show-cancel-button":!0,"async-close":!0},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}},model:{value:t.showForm,callback:function(e){t.showForm=e},expression:"showForm"}},[o("u-field",{attrs:{label:"昵称",placeholder:"请填写用户昵称"},model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}})],1),o("v-uni-view",{staticClass:"loginOut",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.loginOut.apply(void 0,arguments)}}},[t._v("退出登录")])],1)},a=[]},c3d6:function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/uni-page-body[data-v-323cd408]{background-color:#ededed}.camera[data-v-323cd408]{width:54px;height:44px}.camera[data-v-323cd408]:active{background-color:#ededed}.user-box[data-v-323cd408]{background-color:#fff}.loginOut[data-v-323cd408]{text-align:center;background-color:#fff;height:%?100?%;line-height:%?100?%;margin-top:%?12?%;color:#555;font-size:%?30?%}.userImg[data-v-323cd408]{background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?25?% %?45?%;margin-bottom:%?10?%}.userImg .imgBox[data-v-323cd408]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.userImg .imgBox uni-text[data-v-323cd408]{margin-right:%?45?%}.userImg .imgBox uni-image[data-v-323cd408]:first-child{-webkit-border-radius:50%;border-radius:50%;width:%?100?%;height:%?100?%;margin-right:%?45?%}.userImg .imgBox uni-image[data-v-323cd408]:last-child{width:%?16?%;height:%?28?%}body.?%PAGE?%[data-v-323cd408]{background-color:#ededed}',""]),t.exports=e},d647:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA4CAYAAACc//oCAAAB7UlEQVRYR8XXu0oDQRTG8e9MIcELAUEfQOxiISreYiGagK34Sr6MlXgDBTVV0LirkCKvYG8TYVd2JFHWSyZ7m3Nm0y7h/9u5ZUIo+UOmvtaaiEi7sI0AfN+vhiEutabj7e3VG2nEH8B3/BrAJoB3relQGhEDut3uVL8fDuI7v95aHDEE+L4/GYa4ArBrGHJRBLVarUqlMnMOoJkw32IIGrx9EOCCCHspC04EEU9BWYh4EZY1Ev+3ofPpMB1Ek2GozwHad7EmjEfx17Z0gzACfs4GecRYgCtEIsAFIhUgjcgEkERkBkghcgEkELkB3IhCAE5EYQAXwgrAgbAG2CJYADYINkBRBCvgB0FngG6k3CdetQ4W2QFft+zpU4AOkgF0u7W12mQFZI/jLYqiZr2+7rEBisQHI8QCKBpnAdjErQG2cSsAR7wwgCteCMAZzw3gjucCSMQzA6TimQCS8VSAdDwR4CI+FuAqbgS4jI8A8sSVUo2NjRU/5daT+jj+OS4jHo9AWfEhoMz4EOB53sLHBz0AmE+YsDeuOf/fGK6BdttbUoruAcwZEGLxP7ug3X5aVkrdAZj9hRCNj2zDTudlLYqiWwBVAOJx40H0+Pi8qbU+UUodcezztIPAeC3v9XoTtVotSPsyx3OW/wU2kE/dZ+yjgsJB1wAAAABJRU5ErkJggg=="},e2be:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={uPopup:n("0ab9").default,uLoading:n("52e9").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("u-popup",{attrs:{zoom:t.zoom,mode:"center",popup:!1,"z-index":t.uZIndex,length:t.width,"mask-close-able":t.maskCloseAble,"border-radius":t.borderRadius,"negative-top":t.negativeTop},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.popupClose.apply(void 0,arguments)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[n("v-uni-view",{staticClass:"u-model"},[t.showTitle?n("v-uni-view",{staticClass:"u-model__title u-line-1",style:[t.titleStyle]},[t._v(t._s(t.title))]):t._e(),n("v-uni-view",{staticClass:"u-model__content"},[t.$slots.default?n("v-uni-view",{style:[t.contentStyle]},[t._t("default")],2):n("v-uni-view",{staticClass:"u-model__content__message",style:[t.contentStyle]},[t._v(t._s(t.content))])],1),t.showCancelButton||t.showConfirmButton?n("v-uni-view",{staticClass:"u-model__footer u-border-top"},[t.showCancelButton?n("v-uni-view",{staticClass:"u-model__footer__button",style:[t.cancelBtnStyle],attrs:{"hover-stay-time":100,"hover-class":"u-model__btn--hover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.cancelText))]):t._e(),t.showConfirmButton||t.$slots["confirm-button"]?n("v-uni-view",{staticClass:"u-model__footer__button hairline-left",style:[t.confirmBtnStyle],attrs:{"hover-stay-time":100,"hover-class":t.asyncClose?"none":"u-model__btn--hover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t.$slots["confirm-button"]?t._t("confirm-button"):[t.loading?n("u-loading",{attrs:{mode:"circle",color:t.confirmColor}}):[t._v(t._s(t.confirmText))]]],2):t._e()],1):t._e()],1)],1)],1)},a=[]},e5e1:function(t,e,n){"use strict";n.r(e);var o=n("6504"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},f626:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{userInfo:"",showForm:!1,base:this.$base,nickname:""}},onLoad:function(){},methods:{loginOut:function(){var t=this;uni.showModal({title:"提示",content:"退出登陆？",success:function(e){e.confirm&&t.$u.get("/api/user/logout").then((function(t){1==t.code&&uni.showToast({title:t.msg,icon:"none",mask:!0,success:function(){uni.clearStorageSync(),setTimeout((function(){uni.navigateBack()}),1500)}})}))}})},chooseAvatar:function(){this.$u.route({url:"pages/avatar-cropper/u-avatar-cropper",params:{destWidth:300,rectWidth:200,fileType:"jpg"}})},getUserinfo:function(){var t=this;this.$u.get("/api/user/getUserinfo").then((function(e){t.userInfo=e.data}))},confirm:function(){var t=this;if(this.nickname.length<1)return uni.showToast({title:"昵称不能为空",icon:"none"}),void(this.showForm=!1);this.$u.get("/api/user/profile",{avatar:this.userInfo.avatar,nickname:this.nickname}).then((function(e){1==e.code&&(uni.showToast({title:"修改成功",icon:"none"}),t.nickname="",t.showForm=!1,t.getUserinfo())}))}},onShow:function(){this.getUserinfo()},created:function(){var e=this;uni.$on("uAvatarCropper",(function(n){e.avatar=n,uni.uploadFile({url:e.$base+"/api/common/upload",filePath:n,name:"file",complete:function(n){e.$u.get("/api/user/profile",{avatar:JSON.parse(n.data).data.url,nickname:e.userInfo.nickname}).then((function(t){1==t.code&&(uni.showToast({title:"修改成功",icon:"none"}),e.getUserinfo())})),t("log",JSON.parse(n.data).data.url," at pages/user/setting/setting.vue:145")}})}))}};e.default=n}).call(this,n("0de9")["log"])}}]);