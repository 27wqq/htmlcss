export default {
  methods: {
    giveMoney(money) {
      this.money -= money;
      //需要在子组件内部，获取到父组件，让父组件的数据加上50
       //可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法
      this.$parent.money += money;
    },
  },
};
