// config.js 文件


/**
 * axios 配置模块
 * @module config
 * @see utils/request
 */

/**
 *  axios具体配置对象
 * @description 包含了基础路径/请求前后对数据对处理，自定义请求头的设置等
 */
const axiosConfig = {
    baseURL: process.env.RESTAPI_PREFIX,
    // 请求前的数据处理
    // transformRequest: [function (data) {
    //   return data
    // }],
    // 请求后的数据处理
    // transformResponse: [function (data) {
    //   return data
    // }],
    // 自定义的请求头
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // 查询对象序列化函数
    // paramsSerializer: function (params) {
    //   return qs.stringify(params)
    // },
    // 超时设置s
    timeout: 10000,
    // 跨域是否带Token 项目中加上会出错
    // withCredentials: true,
    // 自定义请求处理
    // adapter: function(resolve, reject, config) {},
    // 响应的数据格式 json / blob /document /arraybuffer / text / stream
    responseType: 'json',
    // xsrf 设置
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // 下传和下载进度回调
    onUploadProgress: function (progressEvent) {
        Math.round(progressEvent.loaded * 100 / progressEvent.total)
    },
    onDownloadProgress: function (progressEvent) {
        Math.round(progressEvent.loaded * 100 / progressEvent.total)
    },
    // 最多转发数，用于node.js
    maxRedirects: 5,
    // 最大响应数据大小
    maxContentLength: 2000,
    // 自定义错误状态码范围
    validateStatus: function (status) {
        return status >= 200 && status < 300
    }
    // 用于node.js
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true })
}
/** 导出配置模块 */
export default axiosConfig

// api文件 -> 引入 config.js 文件
import config from 'config'
// 请求拦截器
config.interceptors.request.use(
    config => {
        // 触发loading效果
        store.dispatch('SetLoding', true)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 返回状态判断(添加响应拦截器)
request.interceptors.response.use(

    (res) => {
        // 加载loading
        store.dispatch('SetLoding', false)
        // 如果数据请求失败
        let message = ''
        let prefix = res.config.method !== 'get' ? '操作失败：' : '请求失败：'
        switch (code) {
            case 400: message = prefix + '请求参数缺失'; break
            case 401: message = prefix + '认证未通过'; break
            case 404: message = prefix + '此数据不存在'; break
            case 406: message = prefix + '条件不满足'; break
            default: message = prefix + '服务器出错了'; break
        }
        let error = new Error(message)

        if (tip) {
            errorTip(vueInstance, error, message)
        }
        let result = { ...res.data, error: error }
        return result
    },
    (error, a, b) => {
        store.dispatch('SetLoding', false)
        process.env.NODE_ENV !== 'production' && console.log(error)
        return { data: null, code: 500, error: error }
    }
)
// store.js 使用 store 判断，防止多次加载
state: {
    loading: 0
},
mutations: {
    SET_LOADING: (state, loading) => {
        loading ? ++state.loading : --state.loading
    },
        CLEAN_LOADING: (state) => {
        state.loading = 0
    }
},
actions: {
    SetLoding ({ commit }, boolean) {
        commit('SET_LOADING', boolean)
    },
    CLEANLOADING ({commit}) {
        commit('CLEAN_LOADING')
    }
},
getters: {
    loading (state) {
        return state.loading
    }
}
// 拆分
/*
* state采用计数方式能够避免一个页面可能同时有多个ajax请求，导致loading闪现多次，
* 这样就会在所有ajax都结束后才隐藏loading，不过有个很重要的地方需要注意，
* 每一个路由跳转时无论ajax是否结束，都必须把state的值设置为0，具体下面的代码
* */
// loading.vue
<div class="request-loading" :class="{'request-loading-show':loading}">
    <div class="request-loading-main" ></div>
    </div>
import {  mapGetters } from 'vuex'
export default {
    data () {

    }
    computed: {
            ...mapState(['loading])
        }
        <style lang="scss" scoped>
        // loading样式
        </style>

