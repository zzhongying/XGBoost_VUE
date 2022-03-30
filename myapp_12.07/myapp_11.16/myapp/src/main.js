import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
// import "../node_modules/_popper.js@1.14.7@popper.js/dist/popper.min"
// import "../node_modules/_bootstrap@3.4.1@bootstrap/dist/js/bootstrap.min";
// import "../node_modules/_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css";


Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
