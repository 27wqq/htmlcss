//引入路由组件
// import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
//引入二级路由
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

/*路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

// const foo=() =>{
//   // 箭头函数返回的是一个promise
//   // 这种写法就是用户调用的时候
//   console.log(111);
//   return import("@/pages/Home");
// }
// 箭头函数可以直接简化成以下

// const foo=()=>import("@/pages/Home");

//配置路由信息
export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },//判断是否显示footer
    //二级路由组件
    children:[
      {
        path:"myorder",//二级路由path可以不用写/,要写/的话 路径要写齐。
        component:MyOrder,
      },
      {
        path:"groupOrder",
        component:GroupOrder,
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },//判断是否显示footer
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },//判断是否显示footer
    beforeEnter:(to,from,next)=>{//路由独享守卫 
      if(from.path=="/trade"){
        next();
      }else{
        next(false)
      }
    }
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },//判断是否显示footer
    //路由独享守卫 
    beforeEnter: (to, from, next) => {
      //去交易页面，必须是从购物车而来
      if(from.path=="/shopCart"){
        next();
      }else{
        //其他的路由组件而来，停留在当前
        next(false);
      }
    },
  },
  {
    path: "/shopCart",
    component: ShopCart,
    meta: { show: true },//判断是否显示footer
  },
  {
    path: "/addCartSuccess",//因为AddCartSuccess也是一级路由，直接添加，注意这边的path: "/addCartSuccess"都是小写
    name:"addCartSuccess",
    component: AddCartSuccess,
    meta: { show: true },//判断是否显示footer
  },
  {
    path: "/home",
    // component: foo,这边的foo直接用一整个箭头函数代替
    component: ()=>import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  {
    name: "search",
    path: "/search/:keyword?", //里头加个问号就是可传可不传参数的意思
    component: Search,
    meta: { show: true },
    //路由组件能不能传递props数据？
    //布尔值的写法
    // props: true,//只能接收params参数
    //对象的写法（这种比较多用）
    // props: { a: 1, b: 2 }
    // 函数的写法:可以params参数、query参数，通过props传递给路由组件（函数写法比较少用）
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    // params传参要占位/:skuId
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true },
  },
  // 这边注意一个小点，就是重定向！在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: "*",
    redirect: "/home",
  },

  {
    path:'/communication',
    component:()=>import('@/pages/Communication/Communication'),
    children:[
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path:'model',
        component:()=>import('@/pages/Communication/ModelTest/ModelTest'),
        meta:{
          isHideFooter:true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      },
    ]
  }
];
