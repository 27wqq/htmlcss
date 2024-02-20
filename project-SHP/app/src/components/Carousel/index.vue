<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      //立即监听：不管你数据有没有变化，上来立即监听一次
      //为什么watch监听不到list：因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
      immediate: true,
      handler() {
        // console.log('我在监听Floor组件中的list数据')
        //到此只能监听到数据已经有了，但是v-for动态渲染结构我们还是没办法确定，因此我们还是需要用到nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            //   direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped></style>
