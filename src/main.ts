import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/iview.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from './axios';
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ufySmrMjKzItyY0cQ7CUFKGouuryXQLB',
});

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');



