/**
 * modify data operation
 */
import * as types from './mutation-types' // mutations 常量函数名

const mutations = {
  // state; pass parameter
  [types.SET_DATA](state, testData) {
    /* singer: string */
    state.youData = testData
  }
}

export default mutations
