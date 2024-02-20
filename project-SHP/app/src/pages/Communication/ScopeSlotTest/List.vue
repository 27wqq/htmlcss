<template>
  <ul>
    <li v-for="(item,index) in todos" :key="index">
       <!-- 坑：熊孩子挖到坑，父亲填坑 -->
       <!-- 数据来源于父亲：子组件决定不了自身的结构与外观，所以要用到slot-->
       <slot :todo="item"></slot><!--将子组件的数据回传给父组件-->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>