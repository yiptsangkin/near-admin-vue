import Vue from 'vue'
import App from './App.vue'
import router from './router/auth'
import utils from '@js/core/utils'

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (to.meta.title) {
        utils.setPageTitle(title)
    } else {
        utils.setPageTitle('')
    }
    next()
})


new Vue({
    render: (h) => h(App),
    router
}).$mount('#app');
