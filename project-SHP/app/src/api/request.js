//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//start:进度条开始 done：进度条结束
// console.log(nprogress)
//引入进度条的样式
import "nprogress/nprogress.css";
//引入store
import store from '@/store'

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径当中会出现api
  baseURL: "/api",
  //代表请求超时的时间5S
  timeout: 5000,
});

// 请求拦截器---在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //config:配置对象，对象里面有一个属性很重要，headers请求头
  //console.log(store)//控制台打印出来的位置在store中
  if(store.state.detail.uuid_token){
    //给请求头添加一个字段(userTempId)：这个字段是已经和后台确定好的字段
    config.headers.userTempId=store.state.detail.uuid_token;
  }
  //需要携带token带给服务器（请求头携带token向服务器发请求）
  if(store.state.user.token){
    config.headers.token=store.state.user.token;
  }
  nprogress.start();
  return config;
});

//响应拦截器---当服务器手动请求之后，做出响应(响应成功)会执行的
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error("faile"));
    // alert(error.message);
    //终止Promise链
    // return new Promise();
  }
);

//对外暴露
export default requests;
