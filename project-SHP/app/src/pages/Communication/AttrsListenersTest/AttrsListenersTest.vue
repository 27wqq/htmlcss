<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数（el-button进行二次封装） -->
    <!-- @click，底下这个click代表的是自定义事件 -->
     <HintButton type="success" icon="el-icon-delete" size="mini" title="我是中国人" @click="handler"/>
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton';
export default {
  name: 'AttrsListenersTest',
  components:{
     HintButton 
  },
  methods: {
    handler() {
       alert('弹弹弹');
    },
  },
}
</script>