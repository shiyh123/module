

/**
前言：
    Mixins：可以理解为形成了一个新的组件，则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法。

1、方法和参数在各组件中不共享
如混入对象中有一个 cont:1的变量,在组件A中改变cont值为5，这时候在组件B中获取这个值，拿到的还是1，还是混入对象里的初始值，数据不共享
2、值为对象的选项
如methods,components等，选项会被合并，键冲突的组件会覆盖混入对象的，比如混入对象里有个方法A，组件里也有方法A，这时候在组件里调用的话，执行的是组件里的A方法
3、值为函数的选项
如created,mounted等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用，同一个钩子函数里，会先执行混入对象的东西，再执行本组件的
4、与vuex的区别
vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。
5、与公共组件的区别
组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。


*
* @param {}
*/
// 定义 一个组件，或一个方法
注意：路由传递参数，可能要在mounted里面去取值，之前在created里面并未取到
<template>

</template>

<script>

    export default {
        name: 'mixins-test-main',
        components: {},
        props: {},
        data () {
            return {
                mixinData: 'mixin中的变量'
            }
        },
        methods: {
            mixinFunction () {
                return '我是mixins里面的公共方法'
            },
        },
        mounted () {
        },
        computed: {}
    }

    // 使用

</script>

<template>
    <div>
        <div @click="handleMixin">调用mixin方法</div>
    </div>
</template>

<script>
    import MixinItem from './mixin'

    export default {
        name: 'mixin-test-comp',
        props: {},
        mixins: [MixinItem],
        components: {},
        data () {
            return {}
        },
        methods: {
            handleMixin () {
                console.log('mixin-data=========', this.mixinData)
                let mixfun = this.mixinFunction()
                console.log('mixin-fun====>>>', mixfun)
            },
        },
        mounted () {
        },
        computed: {}
    }
</script>

<style scoped>
</style>


