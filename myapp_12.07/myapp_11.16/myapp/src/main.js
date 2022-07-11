import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
// import "../node_modules/_popper.js@1.14.7@popper.js/dist/popper.min"
// import "../node_modules/_bootstrap@3.4.1@bootstrap/dist/js/bootstrap.min";
// import "../node_modules/_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.min"


Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')

Vue.directive("resize",{   //自定义指令，在窗口大小发生变化时，实时打印最新的窗口高宽
  bind(el,binding,vNode){  //el:绑定的dom节点，可以直接操作dom
    console.log(binding.value)
    console.log(binding.arguments)

  },
  inserted(){},
  update(){},
  componentUpdated(){},
  unbind(){}
})
