<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(navList, index) in list.navList"
              :key="index"
            >
              <a href="#tab1" data-toggle="tab">{{ navList.text }}</a>
            </li>
            <!-- <li>
              <a href="#tab2" data-toggle="tab">大家电</a>
            </li>
            <li>
              <a href="#tab3" data-toggle="tab">生活电器</a>
            </li>
            <li>
              <a href="#tab4" data-toggle="tab">厨房电器</a>
            </li>
            <li>
              <a href="#tab5" data-toggle="tab">应季电器</a>
            </li>
            <li>
              <a href="#tab6" data-toggle="tab">空气/净水</a>
            </li>
            <li>
              <a href="#tab7" data-toggle="tab">高端电器</a>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">
                  {{ keyword }}
                </li>
                <!-- <li>4K电视</li>
                <li>空气净化器</li>
                <li>IH电饭煲</li>
                <li>滚筒洗衣机</li>
                <li>电热水器</li> -->
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 轮播图 -->
              <Carousel :list="list.carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入swiper包
// import Swiper from "swiper";//因为轮播图已经封装为一个组件了，所以这边不用引入swiper包，直接在封装的组件中引入就行
export default {
  name: "",
  props: ["list"],
  mounted() {
    //之前在ListContainer中，第一次写Swiper的时候：在mounted中书写是不可以的，但是现在为什么可以了?
    //第一次书写Swiper 轮播图的时候，是在当前组件内部发送请求、动态渲染结构【前台要等服务器数据返回回来】，所以不行
    //这边可以是因为请求是在父组件发的，Floor组件的数据是父组件通过props传递过来的，结构早已渲染完毕。
    //父beforeCreate→父created→父beforeMount→子beforeCreate→子created→子beforeMount→子mounted→父mounted
    /*
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
    });*/
  },
  //以下写成watch监视这个方法是为了封装组件,以下watch代码已经封装在Carousel组件当中。
  // watch: {
  //   list: {
  //     //立即监听：不管你数据有没有变化，上来立即监听一次
  //     //为什么watch监听不到list：因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
  //     immediate: true,
  //     handler() {
  //       // console.log('我在监听Floor组件中的list数据')
  //       //到此只能监听到数据已经有了，但是v-for动态渲染结构我们还是没办法确定，因此我们还是需要用到nextTick
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(this.$refs.cur, {
  //           //   direction: "vertical", // 垂直切换选项
  //           loop: true, // 循环模式选项

  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //             //点击小球的时候切换图片
  //             clickable: true,
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
