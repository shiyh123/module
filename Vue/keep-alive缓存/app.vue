
https://juejin.im/post/5cdcbae9e51d454759351d84  原作者
<template>
    <div>
        <keep-alive :include="include">
            <!-- 需要缓存的视图组件 -->
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
        </keep-alive>

        <!-- 不需要缓存的视图组件 -->
        <router-view v-if="!$route.meta.keepAlive">
        </router-view>

    </div>
</template>
<script>
    场景概述：
    一个常见的的场景，
    主页 -->前进 列表页-->前进 详情页，详情页 -->返回 主页 -->返回 列表页
        我们希望，
    从 详情页 -->返回 列表页 的时候页面的状态是缓存，不用重新请求数据，提升用户体验。
    从 列表页 -->返回 主页 的时候页面，注销掉列表页，以在进入不同的列表页的时候，获取最新的数据。

    // keep-alive组件如果设置了 include ，就只有和 include 匹配的组件会被缓存，包含需要缓存的额组件
    export  default {
        name: "app",
        data: () => ({
            include: []
        }),
        watch: {
            $route(to, from) {
                //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
                if (to.meta.keepAlive) {
                    !this.include.includes(to.name) && this.include.push(to.name);
                }
                //如果 要 form(离开) 的页面是 keepAlive缓存的，
                //再根据 deepth 来判断是前进还是后退
                //如果是后退
                if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
                    var index = this.include.indexOf(from.name);
                    index !== -1 && this.include.splice(index, 1);
                }
            }
        }
    }

    // 总结：
    1：实现按需 keep-alive ，网上有方法，通过修改 route 配置里的 meta里的 keepAlive 值来实现。
    直接修改 meta 的值，可能会出现上图的情况，keep-alive里有一直有一个缓存的 list,正常的 rotuer-view 里也有一个,
        复现这个问题需要很长得篇幅，感兴趣的朋友可以自己去爬一下坑。

    2：还有得方法是 通过在keep-alive 的视图组件在退出 rotuer 的时候，调用this.$destory()
    直接摧毁组件，这会导致组件没法在缓存，这个bug ，在官方issue有提到。

    // router 得配置

    new Router({
        routes: [
            {
                path: '/',
                name: 'index',
                component: () => import('./views/keep-alive/index.vue'),
                meta: {
                    deepth: 0.5
                }
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('./views/keep-alive/list.vue'),
                meta: {
                    deepth: 1
                    keepAlive: true //需要被缓存
                }
            },
            {
                path: '/detail',
                name: 'detail',
                component: () => import('./views/keep-alive/detail.vue'),
                meta: {
                    deepth: 2
                }
            }
        ]
    })

</script>
