import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import {CacheRouteConfig} from '@js/core/type'
const Auth = () => import('../view/Auth.vue')

Vue.use(VueRouter)

const routesConfig: RouteConfig[] = [
    {
        path: '/',
        name: 'Auth',
        component: Auth
    }
];

const routerOpt: RouterOptions = {
    mode: 'history',
    base: '/auth',
    routes: routesConfig
}

const routesList: string = localStorage.getItem('asyncRoute') || ''
let newRoutesList: CacheRouteConfig[]
try {
    newRoutesList = JSON.parse(routesList)
    if (!Array.isArray(routesList)) {
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
