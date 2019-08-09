/**
 * mapping state data
 * outside can get vuex state data
 * @param state
 */
export const watchData = state => state.youData // actions 可以直接写fun,也可以到处 module
export default  {
    watchData:state => state.youData
}
