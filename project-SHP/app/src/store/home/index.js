import { reqCategoryList,reqGetBannerList,reqFloorList } from '@/api';
//home模块的小仓库
const state = {
    //home模块中储存的是三级菜单的数据
    //state中数据默认初始值别瞎写，服务器返回对象，则初始值为对象，服务器返回数组，则初始值为数组。【根据数据接口返回值初始化】
    categoryList: [],
    //轮播图的数据
    bannerList:[],
    floorList:[],

};
const mutations = {
    GETCATEGOYRLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
        // console.log('在修改仓库中的bannerList数据')//用于测试swiper实例
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    },
};
const actions = {
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}) {
        let result = await reqCategoryList(); //await与async是cp一定要同时存在，获取到成功的数据
        // console.log(result) //此时控制台可以打印出服务器上取到的成功的数据
        //取到成功后的数据后就要存在仓库，所以要解构出commit，提交mutations
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("GETCATEGOYRLIST", result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        // console.log('在向服务器发起Ajax请求，获取轮播图的数据')//用于测试swiper实例
        let result = await reqGetBannerList();
        // console.log(result)//打印出来看到返回的是数组
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
            // console.log('提交成功')
        }
    },
    //获取floor的轮播图数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){//这里是code，不是data，找了好久的错啊 无语！！
            //提交mutation
            commit("GETFLOORLIST",result.data);
        }
    },
};
//计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}