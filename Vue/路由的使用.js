
/*####################路由的使用#########################*/
/**
 * 除了axios 其请求的拦截， 我们还需要对路由进行拦截，分2种情况
 * 1：对于后台，只有登录后才能访问其他页面
 * @param {}
 */
import router from './index' // 引入 router 对象
import Cookies  from 'js-cookie'

    router.beforeEach((to, from, next) => {

            if (Cookies.get('token')) { // 直接访问其他页面，未登录跳转到登录页面
                next()
            } else {
                if(to.path != '/login'){
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}
                    })
                }else{
                    next();
                }
            }

            if(!Cookies.get('token') && to.fullPath == "/login"){ // 未登录直接访问登录页面
                next();
            }else{
                if(Cookies.get('token')&&to.fullPath == "/login"){ // 登录过后还访问登录页面
                    next({
                        path:from.fullPath
                    });
                }

            }

});

/**
 * 除了axios 其请求的拦截， 我们还需要对路由进行拦截，分2种情况
 * 1：对于前台，列如商城系统
 * @param {}
 */

router.beforeEach((to, from, next) => { // 对于需要权限的页面，使用路由权限
    if (to.meta.roles) {
        if (Cookies.get('token')) {
            next()
        } else {
            if(to.path != '/login'){
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }else{
                next();
            }
        }
    } else {

        if(!Cookies.get('token') && to.fullPath == "/login"){
            if(Cookies.get('token')){
                next({
                    path:from.fullPath
                });

            }else {
                next();
            }
        }else{
            next()
        }
    }
});
