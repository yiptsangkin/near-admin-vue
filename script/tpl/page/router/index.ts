import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import dict from '@custom/dict'
import utils from '@corets/utils'

Vue.use(VueRouter)

const routesConfig: RouteConfig[] = []

const routerOpt: RouterOptions = {
    mode: 'history',
    base: `/${dict.commonObj.authPath}`,
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
