import Vue from 'vue'
import iView from 'iview'
import router from '../router';
Vue.use(iView);

import '../iview-variables.less'

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '' || token === 'undefined') {
            next('/login');
        } else {
            next();
        }
    }
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});

