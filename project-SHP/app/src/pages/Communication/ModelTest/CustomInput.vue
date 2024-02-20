<template>
    <div style="background:#ccc;height:50px;">
        <h2>input包装组件</h2>
        <input type="text" :value="value" @input="$emit('input',$event.target.value)"><!--$emit触发的是input事件，传的值是$event.target.value-->
        <!-- 这边的:value="value"是原生DOM,input表签身上的说明它是给原生DOM标签绑定的一个响应式属性,value值是父亲传过来的值 -->
        <!-- 
            :value 动态属性
            @input 给原生DOM绑定原生DOM事件 
        -->
    </div>
</template>

<script>
export default {
    name:'CustomInput',
    props:['value']
}
</script>