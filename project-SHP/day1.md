----------------------------------------  2023.7.31-------------------------------------------
p2_vue-cli脚手架初始化项目：

1.看notion笔记
node_modules:放置项目依赖的地方
public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
src：程序员源代码文件夹
  -----assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
  -----components文件夹:一般放置非路由组件（或者项目共用的组件）
        App.vue 唯一的根组件(管理众多的组件)
        main.js 入口文件【程序最先执行的文件】
        babel.config.js:babel配置文件
        package.json：看到项目描述、项目依赖、项目运行指令
        README.md:项目说明文件
  

脚手架下载下来的项目稍微配置一下
浏览器自动打开
        在package.json文件中
        "scripts": {
         "serve": "vue-cli-service serve --open",
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },

2.项目的其他配置

2.1项目运行起来的时候，让浏览器自动打开
---package.json
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  注意运行的时候这边有个报错，要在app文件夹下运行才行！

2.2eslint校验功能关闭。
---在根目录下创建vue.config.js文件（常见的配置代理都在这里头）
比如：声明变量但是没有使用eslint校验工具报错。

2.3src文件夹简写方法，配置别名。@
jsconfig.json配置别名@表示【@代表的是src文件夹，这样将来文件过多，找的时候方便很多】但是注意@不能在node_mudeles与dist文件中使用。
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "exclude": [
      "node_mudeles",
      "dist",
    ]
  }
}

3.项目路由的分析
vue-router
前端所谓的路由：KV键值对
key:URL(地址栏中的路径)
value：相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search路由组件、login登录路由、Refister注册路由
非路由组件：
Header【首页、搜索页】
Footer【首页、搜索页】，但是在登录|注册页面是没有

--------------------------------------------------2023年8月1日--------------------------------------
4.完成非路由组件Header与Footer业务
在咱们项目当中，不再以HTML、CSS为主,主要搞业务、逻辑
在项目开发的时候：
1：书写静态页面（HTML、CSS）
2：拆分组件
3：获取服务器的数据动态展示
4：完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构+组件的样式+图片资源(都要找准了)
注意2：咱们项目采用的是less样式，浏览器不知别less样式，需要通过less、less-loader进行处理less，把less样式变为css样式，浏览器才能识别。这边就要我们安装一下less的依赖包
不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义
# cnpm install --save less less-loader@5(采用的是淘宝镜像)→这个安装不成功改成以下
# npm install --save less  less-loader@7.3.0 
注意3：如果想让组件里的less样式不报错的的话，加个lang="less"

4.1使用组件的步骤(非路由组件)
-创建或者定义
-引入(要清下默认样式)注意项目中的css使用的是less文件
-注册
-使用


5.路由组件的搭建
vue-router
在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register
  第一步的话还是先安装依赖包 # npm install --save vue-router@3(注意vue2版本只能安装vue-router3)
-components文件夹：经常放置非路由组件(共用全局组件)
-pages|views文件夹：经常放置路由文件
--------------------------------------------------2023年8月8日（周二）--------------------------------------
5.1配置路由
项目当中配置的路由一般放置在router文件夹中

5.2总结
路由组件与非路由组件的区别？
1：路由组件一般放置在pages|views文件夹，非路由组件放置在components文件夹中
2：路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用
3：注册完路由，不管路由组件、还是非路由组件身上都有$route、$router属性

$route：一般获取路由信息【路径、query、params等等】
$router：一般进行编程式导航进行路由跳转【push|replace】

另：路由配置的时候加个 重定向！在项目跑起来的时候，访问/，立马让它定向到首页

5.3路由的跳转？
路由的跳转有两种形式：
声明式导航：router-link,可以进行路由的跳转
编程式导航：push|replace,可以进行路由的跳转

编程式路由导航：声明式导航能做的，编程式导航都就可以做，
但是编程式路由导航除了可以进行路由的跳转，还可以做一些其他的业务逻辑

6.Footer组件的显示与隐藏
显示或者隐藏组件：v-if|v-show（从性能的角度触发我们选择v-show，因为v-if会频繁的操作DOM）
Footer组件：在Home、Search显示Footer组件\在登录、注册的时候是隐藏的

法1：<Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>这样可以实现但是万一组件多这样就不方便
法2（推荐）：利用路由元信息 meta实现 meta:{show:false} （写成true\false的形式是为了v-show读的是布尔值）
            路由需要配置对象，它的key不能瞎写、乱写、胡写


--------------------------------------------------2023年8月9日（周三）--------------------------------------
无7
P8_路由传递参数
8.路由传参

8.1：路由跳转有几种方式？
比如：A=>B
声明式导航：router-link（务必要有to属性），可以实现路由的跳转
编程式导航：利用的是组件实例的$route.push|replace方法，可以实现路由的跳转。（可以书写一些自己的业务）

8.2：路由传参，参数有几种写法？
params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数：不属于路径当中的一部分，类似于Ajax中的queryString/home?k=v&kv=,不需要占位

注意：search页面的传参写的是
<h1>params参数----{{$route.params.keyword}}</h1>
        <h1>query参数----{{$route.query.k}}</h1> 
不是$router是$route 报错找的好辛苦啊！！！


P9_路由传递参数相关面试题
9.面试题

9.1路由传递参数（对象写法）path是否可以结合params参数一起使用？
this.$router.push({path：'/search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}
答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

9.2如何指定params参数可传可不传？
如果路由要求传递params参数，但是你就不传递params参数，发现一件事，url会有问题的
如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号【params可以传递或者不传递】这边可以利用正则来记忆（正则里也有个差不多意思的）

9.3params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
使用undefined解决：params参数可以传递、不传递（空的字符串）
this.$router.push({ name:"search",params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}

9.4路由组件能不能传递props数据?
可以传递props数据且有3种方式：
1）布尔值写法：只能传递params参数
测试验证：
先在路由的index文件下，search路由配置的中写上props: true；然后在非路由组件的Header文件下的index中通过push去获取

2）对象的写法(多这样写 因为可以在组件中直接获取方便)
 props: { a: 1, b: 2 }
测试验证：
先在路由的index文件下，search路由配置的中写上props: { a: 1, b: 2 }；然后在Pages中的Search组件的行为层写props:['keyword','a','b']去接收，模板层去使用

3）函数的写法:可以params参数、query参数，通过props传递给路由组件(比较少用)
props: ($route) => {
                return { keyword: $route.params.keyword, k: $route.query.k }
            }
测试验证：
先在路由的index文件下，search路由配置的中写上props: ($route) => {
                return { keyword: $route.params.keyword, k: $route.query.k }
            }
；然后在Pages中的Search组件的行为层写props:['keyword','k']去接收，模板层去使用，启动项目验证即可           





