import service from './http'  // axios 实例
 export const getParams = ({url,method,params}) =>{ // get请求
     return service({
         url,
         method,
         params
     })
 };

 export const getData = ({url,method,data}) =>{ // post请求
     return service({
         url,
         method,
         data
     })
 };

