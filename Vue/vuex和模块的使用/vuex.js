import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions.js'
import * as getters from './getters.js'
import state from './state.js'
import mutations from './mutations.js'

Vue.use(Vuex)

/* development mode is on, strict mode check vuex data */
const debug = process.env.NODE_ENV !== 'production'

/**
 * Vuex里面的所有属性和方法 都是唯一的，数据 和 方法不能重名 ，及时分模块也不行，分模块情况下，要添加命名空间
 * @param {}
 */
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
    modules:{
      test:{
        namespaces:'test',
          state:{/**/},
          actions:{/**/},
          getters:{/**/},
          mutations:{/**/},
      }
    },
  strict: debug, // 调试vuex ,上线之前一定要关闭，损耗性能
  plugins: debug ? [createLogger()] : []
})
