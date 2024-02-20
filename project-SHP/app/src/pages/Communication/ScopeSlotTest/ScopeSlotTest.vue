<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- 子组件：数据来源于父组件 -->
    <List :todos="todos">
        <!-- 子组件决定不了它的结构与外观,所以要父组件来传，底下这里用todo变量来接收作用域插槽回传的每一条数组对象-->
        <template slot-scope="todo">
          <!-- {{todo}} 可以打印看下回传的数据结构-->
            <h5 :style="{color:todo.todo.isComplete?'green':'black'}">{{todo.todo.text}}</h5>
        </template>
    </List>
    <hr>
    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List1 :todos="todos">
         <template slot-scope="{todo,index}">
               <h1 :style="{color:todo.isComplete?'green':'hotpink'}">索引值{{index}}---------{{todo.text}}</h1>
         </template>
    </List1>
  </div>
</template>

<script type="text/ecmascript-6">
  //子组件
  import List from './List'
  import List1 from './List1'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      List1 
    }
  }
</script>