import Vue from 'vue'
import Vuex from 'vuex'
import core from '@corestore/core'
import global from '@store/modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    core,
    global
  }
})
