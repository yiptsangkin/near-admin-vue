import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store/index'
import i18n from '@corets/lang'
import mock from '@mock/index'
import plugin from '@corets/plugin'
import AsyncComputed from 'vue-async-computed'
import VueCodemirror from 'vue-codemirror'
import directives from '@custom/directives'

// antd component
import {
    ConfigProvider,
    Layout,
    Icon,
    Row,
    Col,
    Menu,
    message,
    Input,
    Dropdown,
    Modal,
    Button,
    Breadcrumb,
    Spin,
    FormModel,
    Select,
    Table,
    Divider,
    Tooltip,
    Checkbox,
    Transfer,
    Switch
} from 'ant-design-vue'
import comConfig from '@custom/config';
import utils from '@corets/utils';

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
Vue.component(Input.name, Input)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Button.name, Button)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item)
Vue.component(Spin.name, Spin)
Vue.component(FormModel.name, FormModel)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Table.name, Table)
Vue.component(Divider.name, Divider)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Modal.name, Modal)
Vue.component(Transfer.name, Transfer)
Vue.component(Switch.name, Switch)


// here to fix https://github.com/vueComponent/ant-design-vue/issues/2261# this issue
Vue.use(Modal)

// import antd directive
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

// reset `$t` directive when isI18n switch is on
if (!comConfig.buildSwitch.isI18n) {
    Vue.prototype.$t = (str: string) => {
        return utils.getLocaleIfI18nOff(str)
    }
}

// custom directives
Object.keys(directives).forEach((item) => {
    // @ts-ignore
    Vue.directive(item, directives[item])
})

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}

// async computed
Vue.use(AsyncComputed)
// custom plugin
Vue.use(plugin)

// codemirror
Vue.use(VueCodemirror)

new Vue({
    render: (h) => h(App),
    store,
    router,
    i18n
}).$mount('#app')
