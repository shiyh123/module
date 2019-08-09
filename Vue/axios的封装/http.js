
import axios from "axios" //axios模块
import qs from "qs" //qs序列化url
import Cookies from 'js-cookie' // 储存服务端返回的token存储在本地
import '~/plugins/vant' // 框架
import app from '../main' // 引入Vue根实例
import router from '../router' // 引入router进行跳转
import {loginHide,loginWarn} from './loading'

const service = axios.create({
    baseURL: 'http://118.24.47.160:8080/api/',
    timeout: 5000,  // 请求超时时间
    //withCredentials: true // 允许携带cookie, 如何后台设施allow-origin="*" （允许所有跨域）则前端不需要设置此项，
    // 如需要设置，后台改为'http://xxx'具体的路径，allow-origin=String || Array
    responseType: 'json', // default
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    let tokens = null;
    if(Cookies.get('token')){
        tokens = JSON.parse(Cookies.get('token'));
    }
    if (tokens) { // 判断是否存在token，存在，为每个header都加上token
        config.headers.common['token'] = tokens.token;
        config.headers.common['refresh_token'] = tokens.refresh_token;
    }
    if(config.url =='/equipments/insert' || config.url =='/equipments/update'){

        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        config.method === 'post'
            ? config.data = JSON.stringify({...config.data})
            : config.params = {...config.params};
    }else{
        config.method === 'get'
            ? config.params ={...config.params}
            :config.data = qs.stringify({...config.data});
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    console.log('request->>',config);
    return config;
}, error => {  //请求错误处理
    // 请求超时
    // app.$toast.warn('登陆超时，请重新发起！',{duration: 1500});
    return Promise.reject(error);
});

/****** respone拦截器 ==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        console.log('response-->>',response);

        if(response.data.code == 401){ // 未携带token请求
            if(Cookies.get('token')){
                Cookies.remove('token')
            }
             router.push({
               path: '/login'
             });
              loginWarn('请重新登录');
             loginHide();
        }else if(response.data.code == 402){ // 未携带token请求
            if(Cookies.get('token')){
                Cookies.remove('token')
            }
            router.push({
              path: '/login'
            });
             loginWarn('请重新登录');
              loginHide();
        }else if(response.data.code == 201){ // token 过期 refresh_token 重新刷新获取新的token
            if(Cookies.get('token')){

                let newToken = JSON.parse(Cookies.get('token'));
                newToken.refresh_token = response.data.refresh_token;
                newToken.token = response.data.token;
                console.log('newToken',newToken);
                Cookies.set('token',newToken ,{ expires: 1 });

            }

        }else if (response.data.token) { //  登陆后首次设置cook
            Cookies.set('token',{refresh_token:response.data.refresh_token,token:response.data.token,userName:response.data.userName,userId:response.data.userId} ,{ expires: 1 });// ,{ expires: 1 }
        }else{
            Cookies.set('token',{refresh_token:'123456',token:'789654',userName:'syh',userId:24} ,{ expires: 1 });// ,{ expires: 1 }

        }

        return response.data;
    },
    error => {  //响应后台返回错误信息处理
        let err = JSON.parse(JSON.stringify(error));
        let tok = Cookies.get('token');
        console.log('Error:obj:::',err);
        /*if(err.code =='ECONNABORTED'){
          router.push({
            path: '/login'
          });
          if(tok){
            Cookies.remove('token');
          }
          loginWarn('服务中断，请稍后重试');
          loginHide();
        }else if(JSON.stringify(err.request) == '{}'){

          if(tok){
            Cookies.remove('token');
          }

          router.push({
            path: '/login'
          });
          loginWarn('服务中断，请稍后重试');
          loginHide();
        }*/

        return Promise.reject(error)
    }
);
export default service;
