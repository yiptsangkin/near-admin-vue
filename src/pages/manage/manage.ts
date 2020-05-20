import Vue from 'vue'
import App from './App.vue'
import router from './router/manage'
import utils from '@core/utils'
import store from '@store/index'
import VueI18n from 'vue-i18n'
import lang from '@core/lang'
import mock from '@mock/index'
import AsyncComputed from 'vue-async-computed'

// antd component
import {
    ConfigProvider,
    Layout,
    Icon,
    Row,
    Col,
    Menu,
    message
} from 'ant-design-vue'
import comConfig from '@custom/config';

// config
Vue.config.productionTip = false

// import antd
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Footer.name, Layout.Footer)
Vue.component(Icon.name, Icon)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
// import antd directive
Vue.prototype.$message = message

// vue-i18n
Vue.use(VueI18n)
const i18n = new VueI18n(lang.i18nOpt)

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}

// async computed
Vue.use(AsyncComputed)

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
    router,
    i18n
}).$mount('#app')
