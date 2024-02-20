<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册成为全局组件，因此不需要再次引入了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <!-- :list="floor"这个就是父给子传数据list是属性名可以随便叫但是值floor传的时候一定不能写错 -->
    <!-- <Floor /> -->
    <Brand />
    <!-- vuex非模块式开发例子
            <button @click="add()">点击我加上1</button>
            <span>仓库的数据{{count}}</span>
        <button>点击我减去1</button> 
        -->
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

// import {mapState} from 'vuex'//vuex非模块式开发例子
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList,//state是大仓库，home是小仓库
    }),
  },
  /*
    computed:{
        ...mapState(['count'])
    },
    methods: {
        add(){
            //派发action
            this.$store.dispatch('add')
        }
    },
    */
};
</script>

<style scoped></style>
