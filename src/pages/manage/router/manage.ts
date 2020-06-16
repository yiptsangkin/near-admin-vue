import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import {CacheRouteConfig} from '@corets/type'
import dict from '@custom/dict';
import utils from '@corets/utils';
const NManage = () => import('@corecp/NManage.vue')

Vue.use(VueRouter)

const routesConfig: RouteConfig[] = [
    {
        path: '/',
        name: 'Manage',
        component: NManage
    }
];

const routerOpt: RouterOptions = {
    mode: 'history',
    base: `/${dict.commonObj.managePath}`,
    routes: routesConfig
}

const routesList: string = localStorage.getItem(`${dict.commonObj.managePath}AsyncRoute`) || ''
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
