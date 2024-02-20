2023.8.9星期三--------------------------------------------------------------------------------
P10——重写push与replace方法


1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误?
--声明式路由导航没有这类问题的，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就会有这样的警告?
    "vue-router": "^3.6.5"：最新的vue-router引入了promise
1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前的错误，问题可以得到解决。

1.3通过底部的代码，可以实现解决错误
this.$router.push({ name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})
这种写法治标不治本，将来在别的组件当中push|replace,编程式导航还是有类似的错误



2023.8.10星期四--------------------------------------------------------------------------------
1.4
this：当前组件实例（search）
this.$router属性：当前实例，这个实例的属性值是VueRouter类的一个实例，（它是怎么来的？）→在入口文件注册的时候，给组件实例添加$router|$route的属性
push:是这个$router构造函数原型上的一个方法
若要治本，则要重写push方法
→
在路由配置文件中重写push方法：
//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;

//重写Push|replace
//第一个参数：告诉原来的push方法，你往哪里跳转(传递哪些参数)
//第二个参数：成功的回调
//第三个参数：失败的回调
//call与apply的区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行的话传递的是数组
VueRouter.prototype.push = function(location, resolve, reject) {
        if (resolve && reject) {
            originPush.call(this, location, resolve, reject);
        } else {
            originPush.call(this, location, () => {}, () => {});
        }
    }


2023.8.11星期五--------------------------------------------------------------------------------
P11——Home模块组建的拆分

2：Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

3：三级联动组件完成
---由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目任何地方使用

这节视频总结：
--先把静态页面完成（项目是直接获取的尚硅谷静态页面）
--拆分出静态组件（pages下的Home组件下新建TypeNav文件夹再建index.vue,把静态页面给复制过来对应的样式也拷贝过来→然后再在main.js中把它定义为一个全局组件→然后再在页面上呈现出来就是使用这个组件在Home的index页面<TypeNav/>使用即可）这边测试的时候有个报错是因为Type这个文件夹名字没有改成TypeNav而是Typenav所以import的时候找不到就报错了
--获取服务器的数据进行展示
--动态业务

4：完成其余静态组件
主要看HTML(结构)+css(样式)+图片资源(细心)



2023.8.11星期五--------------------------------------------------------------------------------
5：POSTMAN测试接口
--刚刚经过postman工具测试，接口（http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList）是ok的
--如果服务器返回的数据code字段是200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样



2023.8.12星期6-------------------------------------------------------------------------------
6：axios二次封装
XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios?
请求拦截、响应拦截器：请求拦截器，可以在发送请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情

6.2在项目当中经常有API文件夹【axios】
接口当中：路径都带有/api
baseURL:"/api"

6.3有的同学axios基础不好，可以参考git|NPM|axios官方文档



2023.8.15星期2-------------------------------------------------------------------------------
P17-API接口统一管理
7：接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求

项目大：axios.get('xxx'),所以要接口统一管理

7.1跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域
http://localhost:8080/#/home -----前端项目本地服务器
http://39.98.123.211         -----后台服务器

JSONP、CROS、代理



2023.8.16星期3-------------------------------------------------------------------------------
早上测试接口的时候，接口没有调用成功
原因：封装axios的时候；请求拦截器和响应拦截器注意区分
requests.interceptors.request.use()//request
requests.interceptors.response.use()//response

8：nprogress进度条的使用
8.1 npm install --save nprogress,先安装，再在/api/request.js中引入
8.2 修改进度条的颜色
在nprogress包中.css文件进行修改
#nprogress .bar {
    background: pink;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
}
8.3 start:进度条开始 done：进度条结束

9：vuex状态管理库

9.1vuex是什么?
    是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
切记，并不是全部项目都需要vuex，如果项目小，完全不需要Vuex，如果项目很大，组件很多、数据很多，数据维护很费劲才用vuex
 vue2项目安装：npm i --save vuex@3
 state
 mutations
 actions
 getters
 modules

9.2vuex基本使用
1)文件下创建store文件夹，新建index.js文件(引入vue、vuex，vuex是插件使用，对外暴露这个插件也就是Store类的一个实例)
2)再在入口文件main.js中去注册
3)使用：在pages|Home|index.vue中新增<button>按钮
4)回到store中，往state里添加一个count数据
此时抛出一个q:组件如何获取到这个store里的这个数据?
5)pages|Home|index.vue中使用mapState(也是先import,然后写个计算属性去承接使用),配置完...map的时候页面要使用记得span标签内写上{count}
6)因为页面上写了按钮button，我们绑定了点击事件，所以在pages|Home|index.vue需要配method方法去调add(),此时运行的话点击button还是没法实现+1的效果，所以要去store里配置。先在action里配上add,这个add要和pages|Home|index.vue中的method方法中的add()方法同名。然后再去mutations里写上，修改state里的数据信息。



2023.8.17星期4-------------------------------------------------------------------------------
9.3vuex实现模块式开发
    如果项目过大，组件过多，接口也很多，数据也很多，可以让Vuex实现模块式开发
就是大仓库拆分成小仓库

模拟state存储数据
{
    home:{},
    search:{}
}
这边测试又出Bug注意是modules!不是modeles!我真的暴风哭泣

10：完成TypeNav三级联动展示数据业务

    配置完home小仓库里面的数据后，测试运行看vuex开发者工具里面的vuex是否有拿到数据，有则证明仓库已经拿到了服务器的数据
。仓库拿到数据后，则我们需要在组件中拿到数据进行展示。找到TypeNav的index，使用mapState映射，获取仓库数据进行展示。
这里注意要学会拿到数据大概要知道数据长什么样子

[
    {
        id:1,name:'电子书',child:[{id:2,name:"喜羊羊",child:[{id:3,name:"喜羊羊"}],
    }
]




