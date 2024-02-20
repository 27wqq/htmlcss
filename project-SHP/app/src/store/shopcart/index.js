import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    // console.log(result)//测试是否能获取个人购物车数据
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // console.log(context)
    //context：小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    // console.log(getters.cartList.cartInfoList)
    //获取购物车中全部的商品是个数组
    let PromiseAll=[];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId): "";
      PromiseAll.push(promise);
    });
    //只要全部的p1|p2......都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll)
  },
  //修改全部产品的选中状态
  updateAllCartIsChecked({dispatch,state},isChecked){
    // console.log(context)
    // console.log(state)
    // console.log(isChecked)
    let PromiseAll=[];
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise =dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
      PromiseAll.push(promise)
    });
    //最终返回的结果
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}; //写{}是有可能是个空对象
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
