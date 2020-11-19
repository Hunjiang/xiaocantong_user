# 自定义导航栏



## 是否沉浸式导航栏 Attribute transparent => true || false

### 沉浸式

#### 沉浸式 目前只设置支持H5 app看下方方法

##### APP
    // => app 可做沉浸式 但考虑到代码简洁清晰, 直接用官方的方法三行完事
    <https://uniapp.dcloud.io/collocation/pages?id=app-titlenview>

    pages.json 目标页面加入 app-plus 对应代码即可
    {
        "path": "pages/search/search", //搜索页面
        "style": {
            "app-plus": {
                "titleNView": {
                    "type": "transparent",//透明渐变导航栏
                    "backgroundColor": "#00ffff"
                }
            }
        }

##### H5 使用沉浸式注意事项
    
     /**
      * 0 => 沉浸式传入目标盒子 id
      *   => 否则无效
      * 
      * 1 => H5使用沉浸式 想给沉浸式按钮设置颜色是
      *   => isBgcolor  bgcolor 即按钮色
      *   => isGradient 设置 bgcolor 即按钮色   有审美要求就不要设置bgcolor 只设置backColor按钮字体色即可, 详情看演示效果
      *   => isBgimage  设置 bgcolor 即按钮色   有审美要求就不要设置bgcolor 只设置backColor按钮字体色即可, 详情看演示效果
      *   => bgcolor
      */


### 属性(Attributes) (沉浸式 非沉浸式都支持)

| Attributes | title     | titleColor | isback     | backColor | isBgcolor  | isGradient | isBgimage  | textAlign | isRight   | isText           |
| :--------- | --------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ------ | --------- | ---------------  | 
| 含义       | 设置标题   | 字体色      | 设置返回按钮| 返回按钮颜色 | 设置背景色  | 设置渐变    | 设置背景图  |  标题居中  | 设置按钮   | 文本 or 图标     |
| 默认       | 空         |   true     | false      | false      |  false     | false     | false           | center/left/right |
| 值         | 输入性     | #333333     | false/true | #333333   | false/true | false/true | false/true | false/true | false/true      |
| Attributes | titleColor |            |  bgcolor   |  gradient   | bgimage    |  btnColor | btnIcon/btnText |
|            |   #333333  |            |   #123456  |  deg,#~,#~  | /static/~  | #333333   | icon-... / 文字 |



#### 按钮类型 (/static/icon/icon-font.css  => 字体图标, 引用方式 => class="icon-jiahao")
| class name | icon-pingjiapaizhao | icon-qianbao | icon-sousuo | icon-zhuye | icon-baocun | icon-gengduo |
| -----------| ------------------- | ------------ | ----------- | ---------- | ----------- | ------------ |
|   含义     |    拍照              | 钱包         |    搜索      |   主页     |   保存/下载 |   更多       |

| class name | icon-lianjie-tianchong | icon-shezhi | icon-tianjiahaoyou | icon-caidan | icon-gengduo1 |
| ---------- |----------------------- | ----------- | ------------------ | ----------- | --------------|
| 含义       | 链接                    | 设置        | 添加好友            | 菜单 1      | 菜单2          |

| class name | icon-baocun1 | icon-baocun2 | icon-jiahao | icon-gengduo2 | icon-huaban |
| ---------- | ----------- | ------------- | ----------- | ------------- | ----------- |  
| 含义       | 保存         | 上传/保存      | 加号        | 更多 1        | 设置         |


##### 觉得图标不可以, 可以去阿里矢量图标库选择下载, 需要处引过来, 将 font-class 填进去即可 
  (新手 www.lightpink.co 有教程)




### 方法(Methods)

| Methods | handleBack | handleOther |
| --------| -----------| ------------|
| 含义    |  返回事件   | 点击按钮     |



### 使用 (将icon文件放入static目录下)
    
    <template>
        <div>
            <!-- 背景色   | 渐变色   | 背景图 三者只存在一true 全部设置true可能太优秀-->
            <!-- bgcolor | gradient | bgimage 三者只可存一 否则 背景图(优先) > 渐变色 > 背景色 -->
           <navigation-bar title="我是背景色导航栏" :isBgcolor="true" bgcolor="#ffffff">
           </navigation-bar>
           <navigation-bar title="我是渐变导航栏" :isGradient="true" gradient="45deg, #ffffff, rgb(252, 88, 134)">
           </navigation-bar>
           <navigation-bar title="我是背景图导航栏" :isBgimage="true" bgimage="/static/img/user.png">
           </navigation-bar>
           <!-- 无返回但杭兰 -->
           <navigation-bar isback="false" title="我是渐变导航栏">
           </navigation-bar>
           <!-- 沉浸式 -->
           <navigation-bar :transparent="true" title="哈喽" titleColor="#ffffff" :isRight="true" :isGradient="true" gradient="90deg, #fff, red" 
              id="image"></navigation-bar>

           <div id="image" style="width: 750rpx; height: 500rpx">
               <img src=""/>
           </div>
        </div>
    </template>
    <script>
    import '@/static/icon/iconfont.css'
    import navigationBar from '@/components/navigation-bar/navigation-bar.vue'
    export default {
        components:{navigationBar},
        onLoad() {
        }
    }
    </script>
     