<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> --><!-- -->
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- <过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <!-- c1就是一级分类的意思，c1.categoryId就是一级分类的id -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                  <!-- <router-link to="/seacrh">{{c1.categoryName}}</router-link>声明式导航有卡顿现象 -->
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                        <!-- <router-link to="/seacrh">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                          <!-- <router-link to="/seacrh">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; //组件获取vuex仓库里的数据，这里借用mapState映射，将categoryList映射组件实例身上的一个属性所以底下配了computed
// import _ from 'lodash';//这个是全部引入
// console.log(_)//打印lodash
import throttle from "lodash/throttle"; //按需引入
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标索引值移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：可以向服务器发请求，获取数据，展示数据
  mounted() {
    //通知Vuex发送请求，获取数据，存储于仓库当中

    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //这里使用的是mapState的对象形式
      //categoryList，右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state,其实即为大仓库中的数据
      //这个属性比如我们就叫categoryList，那值是什么呢?其实vuex默认给我们提供了一个函数
      categoryList: state =>state.home.categoryList.slice(0, 16) /*完整写法(state)=>{
                // console.log(state)//上面模板中的h1,就是打印出来了，看到了目前仓库配置好的home和search
                return state.home.categoryList;//return出来的结果就是作为新的这个categoryList属性的属性值
            }*/,
      //此时组件身上就可以拿到数据了，
    }),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index){//es6写法
    //     // alert(123)
    //     //index:鼠标移上某一个一级分类的元素的索引值
    //     this.currentIndex=index;
    //     // console.log("鼠标进入了"+index)
    //     //正常情况(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //     //非正常情况(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
    //     //就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象

    // },
    changeIndex: throttle(function (index) {
      //es5写法
      //throttle回调函数别用箭头函数，可能出现上下文的this的问题
      this.currentIndex = index;
      // console.log("鼠标进入了"+index)
    }, 50),
    // 一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1; //鼠标移出currentIndex，变为-1
      if (this.$route.path != "/home") {
        this.show = false; //当鼠标离开的时候，让商品分类列表进行隐藏
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委派
      //利用事件委派，存在一些问题：事件委派，是把全部的子节点【h3,dt,dl,em】的事件全部委托给父亲节点
      //点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      //存在另一个问题，即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

      //第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName，其余的子节点是没有的
      let element = event.target;
      //获取到当前触发这个事件的节点【h3,dt,dl,a】，需要带有data-categoryname这样节点【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      console.log(element.dataset); //打印出来是个对象，就可以解构出来
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签的身上拥有categoryname一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        /*
            //整理合并query参数
            location.query=query;
            //路由跳转
            this.$router.push(location);
        */
        //判断：如果路由跳转的时候，带有params参数，也要一起传过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query; //动态给location配置对象添加query属性
          //路由跳转
          this.$router.push(location); //编程式导航
        }
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
      }

      // .item:hover{
      //     background: skyblue;
      // }
      .cur {
        background: skyblue;
      }
    }
    //过渡动画样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    //过渡动画结束状态（进入）
    .sort-enter {
      height: 461px;
      // transform: rotate(360deg);
    }
    //定义动画的时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
