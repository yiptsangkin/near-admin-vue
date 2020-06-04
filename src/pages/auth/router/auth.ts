import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import {CacheRouteConfig} from '@corets/type'
import dict from '@custom/dict';
const Login = () => import('../view/Login.vue')

Vue.use(VueRouter)

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
];

const routerOpt: RouterOptions = {
    mode: 'history',
    base: `/${dict.commonObj.authPath}`,
    routes: routesConfig
}

const routesList: string = localStorage.getItem(`${dict.commonObj.authPath}AsyncRoute`) || ''
let newRoutesList: CacheRouteConfig[]
try {
    newRoutesList = JSON.parse(routesList)
    if (!Array.isArray(newRoutesList)) {
        newRoutesList = []
    }
} catch (e) {
    newRoutesList = []
}

newRoutesList.forEach((item, index) => {
    item.component = () => import(`../view/${item.componentPath}`)
})

if (routerOpt && routerOpt.routes) {
    routerOpt.routes = routerOpt.routes.concat(newRoutesList)
}

const routeObj = new VueRouter(routerOpt)

export default routeObj
