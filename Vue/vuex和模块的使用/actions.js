/* operate lots of mutation, async */
import * as types from './mutation-types'

export const select =({ commit, state }, { list }) => { // 主要提交一些mutations
  commit(types.SET_DATA, list)

}

export default {
    select({ commit, state }, { list }){
        commit(types.SET_DATA, list)
  }
}
