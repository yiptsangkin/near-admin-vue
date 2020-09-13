import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import utils from '@corets/utils'
import dict from '@custom/dict'
const Login = () => import('../view/Login.vue')

Vue.use(VueRouter)

const basePath = dict.commonObj.basePath

const routesConfig: RouteConfig[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const routerOpt: RouterOptions = {
    mode: 'history',
    base: `/${basePath || 'auth'}`,
    routes: routesConfig
}

const routeObj = new VueRouter(routerOpt)
routeObj.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (to.meta.title) {
        utils.setPageTitle(title)
    } else {
        utils.setPageTitle('')
    }
    next()
})

export default routeObj
