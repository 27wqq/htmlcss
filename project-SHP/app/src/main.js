import Vue from "vue";
import App from "./App.vue";
import router from "@/router";//引入路由相关文件
import store from "./store";//引入仓库进行注册
//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用。第一个参数：全局组件的名字 第二个参数：哪一个组件
//三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import Carsoul from "@/components/Carousel";
import Pagination from '@/components/pagination';
import { Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsoul.name, Carsoul); 
Vue.component(Pagination.name, Pagination); 
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;//element-ui直接在原型上注册（也可以全局注册组件），这样组件都可以访问到
Vue.prototype.$alert = MessageBox.alert;

import "@/mock/mockServe";//引入MockServe.js文件----------mock数据
import "swiper/css/swiper.css";//引入swiper样式

//统一接口：api文件里面的全部请求函数
//统一引入
import * as API from '@/api';

import cat from '@/assets/1.gif';
//引入图片懒加载的插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:cat,//{}内的内容就相当于配置了一个自定义指令，这个是全局注册所以组件身上可用
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:"upper"
});
//引入表单校验插件
import "@/plugins/validate";

//测试
//注意写reqCategoryList()这个函数的地方是分别暴露，所以要加{}
// import { reqCategoryList } from '@/api';
// reqCategoryList();

//测试search模块接口数据
// import { reqGetSearchInfo } from '@/api';
// reqGetSearchInfo({});//注意使用axios({})这种方式传参一定要有个默认对象就是一定要加个{}，否则响应失败

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate(){
    //全局事件总线$bus配置
    Vue.prototype.$bus=this;//这个this为VM
    Vue.prototype.$API=API;
  },
  //注册路由，底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上拥有$route,$router属性
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store,
}).$mount("#app");
