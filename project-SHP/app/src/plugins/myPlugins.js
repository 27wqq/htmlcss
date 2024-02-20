//vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
  // console.log(options);//这个option调用的是main.js中配置的那个对象
  // Vue.prototype.$bus
  // Vue.directive
  // Vue.component
  // Vue.filter
  Vue.directive(options.name, (element, params) => {//Vue.directive(指令名,回调函数)这边的回调函数我们可以先以a,b打印看看，发现a其实是元素，b的话我们就起名为params
    element.innerHTML = params.value.toUpperCase();
  });
};

export default myPlugins;
