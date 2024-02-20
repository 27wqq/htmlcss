2023.8.20星期日-------------------------------------------------------------------------------
复习：
1)商品分类的三级列表由静态变为动态形式【获取服务器数据:解决跨域问题】
2)函数的防抖与节流【面试频率很高】
3)路由跳转：声明式导航(router-link)、编程式导航
编程式导航解决这个问题：自定义属性



2023.8.21星期一-------------------------------------------------------------------------------
P30——Search模块中商品分类与过渡动画
1)开发Search模块中的TypeNav商品分类菜单（过渡动画效果）
过渡动画：前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画

2)现在咱们的商品分类三级列表可以进行优化
    在APP根组件当中发请求，因为根组件mounted只执行一次。ps:不能放在main.js中，因为main.js不是组件，它身上没有this.$store
mounted() {
    //派发actions,放在APP下只需要请求一次，如果放在TypeNav中则需要请求多次
    this.$store.dispatch('categoryList');
  },

3)合并params与query参数
//代表如果有query参数也要带过去
  if(this.$route.query){
      let location={name:"search",params:{keyword:this.keyword||undefined}};//undefined解决params传递空串的问题
      location.query=this.$route.query;
      this.$router.push(location)//编程式路由导航的两个方法push和replace，是否可以退回上一步
  }

4)开发Home首页当中的ListContainer组件与Floor组件
https://docschia.org/
首先这里需要知道的是：服务器返回的数据（接口）只有商品分类菜单的分类数据，对于ListContainer组件与Floor组件数据服务器是没有提供的。
mock:随机生成数据，拦截AJAX发送请求。
mock数据(模拟)：如果你想mock数据，需要用到一个插件mockjs.
# npm install --save mockjs
使用步骤：
1)在项目当中src文件夹下创建mock文件夹
2)第二步准备JSON数据(mock文件夹中创建相应的Json文件)----一定要格式化一下，别留有空格，否则项目跑不起来
3)把mock数据需要的图片放置到public文件夹中【public文件夹再打包的时候，会把相应的资源原封不动的打包到dist文件夹中】
4)第4步开始mock(虚拟的数据了)，通过mockjs模块实现。创建mockServer.js文件，通过mockjs插件实现模拟数据
5)mockServe.js文件在入口文件中引入(至少需要执行一次，才能模拟数据)



2023.8.22星期二-------------------------------------------------------------------------------
5)ListContainer组件开发重点
P34——获取Banner轮播图的数据：这节内容主要讲了 向mockjs要数据,捞到数据放store仓库，以及在组件当中可以获取到仓库中的数据

P35——swiper的基本使用：swiper是专门搞轮播图的https://www.swiper.com.cn/
下载5.4.5的版本
参照官网文档
1.第一步：引包
2.第二步：页面中的结构务必要有
3.第三步：（页面中务必要有结构）：new Swiper实例【轮播图添加动态效果】

# npm install --save swiper@5
P36-Banner实现轮播图的第一种解决方案：这节内容主要讲了swiper这个插件的使用 # npm install --save swiper@5，(这里我们安装5版本是因为5版本稳定)然后项目中引入swiper这个插件，注意样式可以在main.js文件中引入，这样其它组件也可以使用。另一个点是在组件挂载完毕的时候，我们使用延时器让DOM结构加载完整后再实例化swiper。
这节代码的学习点：遍历循环banner的图片我们使用v-for实现
<div
  class="swiper-slide"
  v-for="(carousel,index) in bannerList"
  :key="carousel.id"
>
<!--carousel就是轮播图的意思-->
<img :src="carousel.imgUrl" />src前的冒号一定要加！
