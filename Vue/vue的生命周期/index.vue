
<script>
    注意：
    Vue的所有生命周期函数都是自动绑定到this的上下文上。
    所以，你这里使用箭头函数的话，就会出现this指向的父级作用域，就会报错。
    created
    el属性对生命周期的影响
    export default {
        name: "index",
        beforeCreate: function() {
            console.log('调用了beforeCreate')
        },
        created: function() {
            console.log('调用了created')
        },
        beforeMount: function() {
            console.log('调用了beforeMount')
        },
        mounted: function() {
            console.log('调用了mounted')
        }

    }
    // 在没有el属性的情况下，没有vm.$mount
    export default {
            beforeCreate: function() {
                console.log('调用了beforeCreate')
            },
            created: function() {
                console.log('调用了created')
            },
            beforeMount: function() {
                console.log('调用了beforeMount')
            },
            mounted: function() {
                console.log('调用了mounted')
            }
        // 输出结果
        // 调用了beforeCreate
        // 调用了created
    }
    template属性对生命周期的影响
    1、在实例内部有template属性的时候，直接用内部的，然后调用render函数去渲染。
    2、在实例内部没有找到template，就调用外部的html。实例内部的template属性比外部的优先级高。
    3、要是前两者都不满足，那么就抛出错误。
    我们来看以下几个例子：
    new Vue({
        el: '#app',
        template: '<div id="app">hello world</div>'
    })

    //页面上渲染出了hello world
   <div id="app">hello world</div>

    new Vue({
        el: '#app'
    })

    // 页面上渲染出了hello world
   //两者都存在的时候

        <div id="app">hello world2</div>

        new Vue({
            el: '#app',
            template: '<div id="app">hello world1</div>'
        })
        // 页面上渲染出了hello world1
       从上述的例子可以看出内部的优先外部的。

    关于这个生命周期中的一些问题：

    1、为什么el属性的判断在template之前？
    因为el是一个选择器，比如上述例子中我们用到的最多的是id选择器app，vue实例需要用这个el去template中寻找对应的。
    2、实际上，vue实例中还有一种render选项，我们可以从文档上看一下他的用法：
    new Vue({
        el: '#app',
        render() {
            return (...)
        }
    })
    3、上述三者的渲染优先级：render函数 > template属性 > 外部html
    4、vue编译过程——把tempalte编译成render函数的过程

    beforeMount和mounted

    <div id="app">
        <p>{{message}}</p>
    </div>

    new Vue({
        el: '#app',
        data: {
            message: 1
        },
        beforeMount: function() {
            console.log('调用了beforeMount');
            console.log(this.message)
            console.log(this.$el)
        },
        mounted: function() {
            console.log('调用了mounted');
            console.log(this.message)
            console.log(this.$el)
        }
    })

    // 输出的结果：
    // 调用了beforeMount
    // 1
    // <div>
    // </div>

    // 调用了mounted
    // 1
    // <div id="app">
    //  <p>1</p>
    // </div>
    beforeUpdate和updated
    这个过程中，我们会发现，当一个数据发生改变时，你的视图也将随之改变，整个更新的过程是：
    数据改变——导致虚拟DOM的改变——调用这两个生命钩子去改变视图

    重点：这个数据只有和模版中的数据绑定了才会发生更新。
    // 没绑定的情况

    var vm = new Vue({
        el: '#app',
        template: '<div id="app"></div>',
        beforeUpdate: function() {
            console.log('调用了beforeUpdate')
        },
        updated: function() {
            console.log('调用了uodated')
        },
        data: {
            a: 1
        }
    })

    vm.a = 2
    //这种情况在控制台中是什么都不会输出的。
    var vm = new Vue({
        el: '#app',
        template: '<div id="app">{{a}}</div>',
        beforeUpdate: function() {
            console.log('调用了beforeUpdate')
        },
        updated: function() {
            console.log('调用了uodated')
        },
        data: {
            a: 1
        }
    })

    vm.a = 2

    // 输出结果：
    // 调用了beforeUpdate
    // 调用了uodated
    beforeDestory和destoryed
    在beferoDestory生命钩子调用之前，所有实例都可以用，
    但是当调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

    也有例外：当组件被缓存时候,以下两个是keep-alive 独享钩子

    activated：当组件激活的时候调用
    deactivated：当组件停用的时候调用   以此代替 destoryed 钩子

</script>

