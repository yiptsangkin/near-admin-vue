import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import utils from '@corets/utils'
import dict from '@custom/dict'

Vue.use(VueRouter)

const routesConfig: RouteConfig[] = []
const basePath = dict.commonObj.basePath

const routerOpt: RouterOptions = {
    mode: 'history',
    base: `/${basePath}`,
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
