2023.10.19星期二-------------------------------------------------------------------------------
复习：
完成了支付（elementUI+qrcode）+个人中心（二级路由）

P104——我的订单
1)个人中心完成
1：这边注意一个遍历循环tr的时候 合并td的问题
:rowspan="order.orderDetailList.length" v-if="index==0" //遍历的时候只要数组内的第一个元素合并在一起，后面的不要 
2：分页器【面试的时候：是否封装过组件 分页器|日历】 所以一定要记住

2)全局守卫
P105——未登录的导航守卫判断
未登入访问，交易相关（trade）、支付相关（pay\paysuccess）、用户中心（center）相关跳转到 登录页面
反编译的：decodeURIComponent('%2Fcenter%2Fmyorder')



2023.10.25星期三-------------------------------------------------------------------------------
P106——用户登录(路由独享与组件内守卫)
3)路由独享守卫
组件内守卫的三种方式：
beforeRouteEnter(to,from,next){
      //在渲染该组件的对应路由被confirm前调用
      //不！能！获取组件实例的this
      //因为当守卫执行前，组件实例还没被创建
      if(from.path=='/pay'){
        next();
      }else{
        next(false);
      }
    }
组件内守卫---->一般很少用【全局 + 路由独享守卫】
组件内守卫：也是专门负责某一个路由【并非负责全部路由】，写法和路由独享守卫有区别？
组件内守卫需要书写在组件内部

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave



2023.10.26星期五-------------------------------------------------------------------------------
P107——图片懒加载：比如用户网络不好，服务器的数据没有回来，总不可能让用户看白色，至少有一个默认图片在展示。
https://www.npmjs.com/package/vue-lazyload  vue-lazyload （这个插件是）:图片懒加载

4)图片懒加载:npm i vue-lazyload@1.3.3 -s //先安装！！！！！再到main.js入口文件配置引入插件，注册插件（注册插件可以直接传{}对象注意一下）→接着上网找张图存到桌面1.gif，然后保存在assets中→注册对象里面直接import这张图来源，直接使用。【这边注意：有两个文件：图片和json这两个文件没有对外暴露，外部可以直接import进去用】→找到search模块的图片位置替换成自定义指令。| 后半节课讲了自定义插件的原理：首先在src下创建了一个Plugins的文件夹，创建myPlugins.js文件，然后我们知道vue插件一定暴露一个的是一个对象。所以先定义一个对象(见代码1-1)，插件暴露对象的实质是调用install方法，这个install方法里面依据自己需求写逻辑后会被调用。接着去入口文件main.js中去引入注册这个插件(见代码1-2),这里需要注意的是自定义插件可以传入参数。在APP.vue中我们测试一下自定义插件的使用

代码1-1
let myPlugins = {};//这边定义了一个对象
myPlugins.install = function (Vue, options) {
  // 第一个参数是vue对象
  // console.log(options);//这个option调用的是main.js中配置的那个对象
  // Vue.prototype.$bus
  // Vue.directive
  // Vue.component
  // Vue.filter
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase();//
  });
};

代码1-2
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:"upper"
});
export default myPlugins;


2023.12.1星期五-------------------------------------------------------------------------------
5)vee-validate 基本使用
P108——vee-validate表单验证使用
使用步骤：
1：安装vee-validate，别安装最新版本,安装@2 npm i vee-validate@2 --save 
2：在plugins文件夹中创建一个validate.js[专门注册vee-valadite]
3:注册插件
4：注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】
5：在入口文件需要引入执行一次
6:使用vee-valadiate插件


第一步:插件安装与引入

cnpm i  vee-validate@2  --save 安装的插件安装 2 版本的

import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

第二步:提示信息
//表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    isCheck: "协议",
  },
});

第三步:基本使用
<input placeholder="请输入你的手机号" 
v-model="phone" 
name="phone" 
v-validate="{required: true,regex: /^1\d{10}$/ }" 
:class="{ invalid:errors.has('phone')}"/>
<span class="error-msg">{{errors.first("phone")}}</span>

const success = await this.$validator.validateAll(); //全部表单验证

//自定义校验规则
VeeValidate.Validator.extend("agree",{
  validate:(value)=>{
    return value;
  },
  getMessage:(field)=>field+"必须同意",
});


2023.12.17星期日-------------------------------------------------------------------------------
6)路由懒加载
P109——路由懒加载
ps：复盘 路由进阶部分学习了1、路由守卫 2、滚动行为 3、路由元信息 4、路由懒加载
路由懒加载 就是路由那边引入组件直接用()=>import("@/pages/Home"),参考Home组件的引入

6)打包上线
P110——处理Map文件
6.1打包 npm run build
项目打包后，代码都是经过压缩加密的，输出的错误信息无法准确得知是哪里代码报错。
有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
所以该文件如果项目不需要是可以去掉
vue.config.js配置
productionSourceMap:false

6.2购买云服务器
P111——购买服务器
1：阿里云 2：腾讯云