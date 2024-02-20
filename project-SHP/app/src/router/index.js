//这个是路由配置文件
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
import routes from './routes';
//引入store
import store from '@/store';

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
    // VueRouter.prototype.replace = function(location, resolve, reject) {
    //     if (resolve && reject) {
    //         originReplace.call(this, location, resolve, reject);
    //     } else {
    //         originReplace.call(this, location, () => {}, () => {});
    //     }
    // }


//创建并暴露一个路由(配置路由)
let router= new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0，代表的滚动条在最上方
        return {y:0};//此处的y可以是100或者其它数据，就是滚轮距离顶部的距离
    }
});


//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    //to:可以获取到你要跳转到的那个路由信息//from：可以获取到你从哪个路由而来的信息
    //next：放行函数 next()放行 next(path)放行到指定路由  next(false);
    //为了测试先全都放行
    // next();
    // console.log(store);//测试看看是否能捞到store
    let token=store.state.user.token;//用户登录了才会有token，未登录一定不会有token
    // let userInfo=store.state.user.userInfo;//这边注意不能通过空对象去判断，因为空对象永远为真，要通过对象里面的属性值去判断
    let name = store.state.user.uesrInfo.name;
    // console.log(userInfo);
    //用户已经登录了
    if(token){
        //用户已经登录了还想去login[不能去，停留在首页]
        if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            //登陆了，但是去的不是login
            //如果用户名已有
            if(name){
                next();
            }else{
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //走这个分支的情况就是token失效了，获取不到用户信息，重新登录
                    //我们要做的就是清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    }else{
        //未登录,不能去交易相关（trade）、支付相关（pay\paysuccess）、用户中心（center）
        // console.log(to.path)
        let toPath=to.path;
        console.log(toPath)
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录的时候想去而没有去成的信息，存储于地址栏中【其实是存储于路由当中】
            next('/login?redirect='+toPath)
        }else{
            //去的不是上面的那些路由则放行
            next();
        }
    }
})

export default router;