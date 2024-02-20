//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"; //mockRequests这个是我们自己随便取得名字
import axios from "axios";
//三级联动接口 看接口文档中的记录：请求地址/api/product/getBaseCategoryList get 无参数

//发请求：采用的是封装好的函数的形式requests(),axios发请求返回结果Promise对象
//一定要写return 这边直接写成箭头函数，没写return是因为箭头函数的return就是函数体本身
//对外暴露一个函数，只要外部调用这个函数，就像服务器发起ajax的请求、获取咱们的三级菜单的数据。当前咋们这个函数只要把服务器返回结果返回即可。
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");

//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

//获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
// 当前这个接口，给服务器传递参数params,至少是一个空对象，测试的时候，main.js 中一定要个{}
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// axios的2种方式：
// axios.get('url');
// axios({})

//获取产品详情信息的接口
//写接口的时候就要想下，将来调用这个接口的时候要不要传参
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

//将产品添加到购物车中（获取更新某一个产品数的个数）
//查看文档接口：/api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车列表数据接口
//URL:/api/cart/cartList method:get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中的状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//用户注册的接口/api/user/passport/register method:POST,带参的话这边直接写成一个data，因为接口中也没带参，所以我们地址就写成以下的模式data:data,KV一致省略V
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'});

//用户登录的接口/api/user/passport/login method:POST 
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'});

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo method:get 因为接口里面也没带参数，所以我们要带参数的话 请求头写
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录的接口
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
///api/user/userAddress/auth/findUserAddressList
// export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});//老师的接口不能用，自己mock数据
//获取useraddressInfo数据
export const reqAddressInfo = () => mockRequests.get("/useraddressInfo");

//获取商品清单
///api/order/auth/trade
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'});

//提交订单的接口
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心的数据
// /api/order/auth/{page}/{limit} GET
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

