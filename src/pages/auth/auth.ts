import Vue from 'vue'
import App from './App.vue'
import router from './router/auth'
import utils from '@core/utils'
import store from '@store/index'
import VueI18n from 'vue-i18n'
import lang from '@core/lang'
import mock from '@mock/index'

// antd component
import {
    ConfigProvider,
    Row,
    Col,
    Tabs,
    FormModel,
    Input,
    Icon,
    Checkbox,
    Button,
    Dropdown,
    Menu,
    Form,
    message,
    notification
} from 'ant-design-vue'
import comConfig from '@custom/config';

// config
Vue.config.productionTip = false

// import antd component
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(FormModel.name, FormModel)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Icon.name, Icon)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Form.name, Form)
// import antd directive
Vue.prototype.$message = message
Vue.prototype.$notification = notification

// vue-i18n
Vue.use(VueI18n)
const i18n = new VueI18n(lang.i18nOpt)

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}


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
