import Vue from 'vue'
import App from './App.vue'
import router from './router/manage'
import utils from '@js/core/utils'
import store from '@store/index'

// antd component
import {
    Button,
    ConfigProvider
} from 'ant-design-vue'

Vue.config.productionTip = false;

// import antd
Vue.component(Button.name, Button)
Vue.component(ConfigProvider.name, ConfigProvider)

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
    store,
    router
}).$mount('#app');
