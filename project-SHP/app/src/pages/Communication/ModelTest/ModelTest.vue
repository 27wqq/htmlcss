<template>
    <div>
        <h2>深入v-model</h2>
        <input type="text" v-model="msg">
        <span>{{msg}}</span>
        <br>
        <hr/>
        <h2>v-model实现的原理（vue2）</h2>
            <!-- 
                原生DOM当中是有oninput事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会发出一次回调
                Vue2：以下可以通过value与input事件实现v-model功能
             -->
        <input type="text" :value="msg" @input="msg=$event.target.value">
        <span>{{msg}}</span>
        <!-- 深入学习v-model:实现父子组件数据同步(实现父子组件通信) -->
        <hr/>
        <!-- 
            底下的：value到底是什么?注意这是组件标签身上的:value说明它是props,父子组件通信，这边写的是父组件，子组件是CustomInput,要去子组件接收。
            @input到底是什么?并非原生DOM的input事件，属于自定义事件
        -->
        <CustomInput :value="msg" @input="msg = $event"/>
        <!-- 当子组件触发自定义事件的时候，修改父组件当中的msg为自定义事件传过来的参数 -->

        <CustomInput v-model="msg"/>
        <!-- <CustomInput :value="msg" @input="msg = $event"/>这个写法可以直接简写成<CustomInput v-model="msg"/> 效果一样样-->

    </div>
</template>

<script>
import CustomInput from './CustomInput.vue'
export default {
    name:'ModelTest',
    components:{
        CustomInput
    },
    data() {
        return {
            msg:"我爱你塞北的大雪"
        }
    },
}
</script>