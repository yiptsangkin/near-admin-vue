import Vue from 'vue'
import App from './App.vue'
import router from './router/manage'
import utils from '@js/utils'

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
