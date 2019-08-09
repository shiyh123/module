
/**
    前言：vue是数据驱动视图更新的框架, 所以对于vue来说组件间的数据通信非常重要
         此列举出常用的几种通信方式
*   父子组件之间通信
    非父子组件之间通信(兄弟组件、隔代关系组件等)
    常见使用场景可以分为三类:

    父子组件通信: props; $parent / $children; provide / inject ; ref ;  $attrs / $listeners
    兄弟组件通信: eventBus ; 	vuex
    跨级通信:  eventBus；Vuex；provide / inject 、$attrs / $listeners

*
* @param {}
*/
/*#################### props / $emit  #########################*/

    父组件通过props的方式向子组件传递数据，
    子组件通过$emit向父组件通信。

// section父组件
/**
 @param {props}
*/
<template>
    <div class="section">
        <com-article :articles="articleList"></com-article>
    </div>
</template>

<script>
    import comArticle from './test/article.vue'
    export default {
        name: 'HelloWorld',
        components: { comArticle },
        data() {
            return {
                articleList: ['红楼梦', '西游记', '三国演义']
            }
        }
    }
</script>

<template>
    <div>
        <span v-for="(item, index) in articles" :key="index">{{item}}</span>
    </div>
</template>

<script>
    export default {
        props: ['articles']
    }
</script>

/**
@param {$emit}
*/
// 父组件中
<template>
    <div class="section">
        <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
        <p>{{currentIndex}}</p>
    </div>
</template>


<script>
    import comArticle from './test/article.vue'
    export default {
        name: 'HelloWorld',
        components: { comArticle },
        data() {
            return {
                currentIndex: -1,
                articleList: ['红楼梦', '西游记', '三国演义']
            }
        },
        methods: {
            onEmitIndex(idx) {
                this.currentIndex = idx
            }
        }
    }
</script>
<template>
    <div>
        <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
    </div>
</template>

<script>
    export default {
        props: ['articles'],
        methods: {
            emitIndex(index) {
                this.$emit('onEmitIndex', index)
            }
        }
    }
</script>

总结： prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流
      而且 prop 只读，不可被修改，（如要修改则在子组件中引用一个obj）
      所有修改都会失效并警告。

/*#################### $children / $parent #########################*/
注意：节制使用，还是使用 props 和 emit();
    要注意边界情况，
    如在#app上拿$parent得到的是new Vue()的实例，
    在这实例上再拿$parent得到的是undefined，
    而在最底层的子组件拿$children是个空数组。
    也要注意得到$parent和$children的值不一样，$children 的值是数组，而$parent是个对象

// 父组件中
<template>
    <div class="hello_world">
        <div>{{msg}}</div>
        <com-a></com-a>
        <button @click="changeA">点击改变子组件值</button>
    </div>
</template>

<script>
    import ComA from './test/comA.vue'
    export default {
        name: 'HelloWorld',
        components: { ComA },
        data() {
            return {
                msg: 'Welcome'
            }
        },

        methods: {
            changeA() {
                // 获取到子组件A
                this.$children[0].messageA = 'this is new value'
            }
        }
    }
</script>


// 子组件中
<template>
    <div class="com_a">
        <span>{{messageA}}</span>
        <p>获取父组件的值为:  {{parentVal}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                messageA: 'this is old'
            }
        },
        computed:{
            parentVal(){
                return this.$parent.msg;
            }
        }
    }
</script>

/*#################### ref / refs #########################*/
ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据
// 子组件 A.vue

export default {
    data () {
        return {
            name: 'Vue.js'
        }
    },
    methods: {
        sayHello () {
            console.log('hello')
        }
    }
}

// 父组件 app.vue

<template>
    <component-a ref="comA"></component-a>
</template>
<script>
    export default {
        mounted () {
            const comA = this.$refs.comA;
            console.log(comA.name);  // Vue.js
            comA.sayHello();  // hello
        }
    }
</script>

/*#################### eventBus #########################*/
eventBus 又称为事件总线，
在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，
可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件
可以使兄弟逐渐也可以是父子组件
1：先需要创建一个事件总线(空的vue对象)并将其导出, 以便其他模块可以使用或者监听它.
    import Vue from 'vue'
    export const EventBus = new Vue()
2：使用
<template>
    <div>
        <show-num-com></show-num-com>
        <addition-num-com></addition-num-com>
    </div>
</template>

<script>
    import showNumCom from './showNum.vue'
    import additionNumCom from './additionNum.vue'
    export default {
        components: { showNumCom, additionNumCom }
    }
</script>
<template>
    <div>
        <button @click="additionHandle">+加法器</button>
    </div>
</template>

<script>
    import {EventBus} from './event-bus.js'
    console.log(EventBus)
    export default {
        data(){
            return{
                num:1
            }
        },

        methods:{
            additionHandle(){
                EventBus.$emit('addition', {
                    num:this.num++
                })
            }
        }
    }
</script>

3. 接收事件
<template>
    <div>计算和: {{count}}</div>
</template>

<script>
    import { EventBus } from './event-bus.js'
    export default {
        data() {
            return {
                count: 0
            }
        },

        mounted() {
            EventBus.$on('addition', param => {
                this.count = this.count + param.num;
            })
        }
    }
</script>

4. 移除事件监听者

    import { eventBus } from 'event-bus.js'
    EventBus.$off('addition', {})

/*#################### Vuex #########################*/
1.  Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式,为了解决不同组件之间的数据共享
Vuex 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，
将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上
2. Vuex各个模块
state：用于数据的存储，是store中的唯一数据源
getters：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
mutations：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
actions：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

/*#################### $attrs / $listeners #########################*/

如果A组件与D组件是隔代关系， 那它们之前进行通信有哪些方式呢？
1：使用props绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
2：使用eventBus,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
3：使用Vuex来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.
在vue2.4中，为了解决该需求，引入了$attrs 和$listeners ，
新增了inheritAttrs 选项。
在版本2.4以前，默认情况下,父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)，
将会“回退”且作为普通的HTML特性应用在子组件的根元素上。

// app.vue
// index.vue

<template>
    <div>
        <child-com1
                :name="name"
                :age="age"
                :gender="gender"
                :height="height"
                title="程序员成长指北"
        ></child-com1>
    </div>
</template>
<script>
    const childCom1 = () => import("./childCom1.vue");
    export default {
        components: { childCom1 },
        data() {
            return {
                name: "zhang",
                age: "18",
                gender: "女",
                height: "158"
            };
        }
    };
</script>
// childCom1.vue

<template class="border">
    <div>
        <p>name: {{ name}}</p>
        <p>childCom1的$attrs: {{ $attrs }}</p>
        <child-com2 v-bind="$attrs"></child-com2>
    </div>
</template>
<script>
    const childCom2 = () => import("./childCom2.vue");
    export default {
        components: {
            childCom2
        },
        inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
        props: {
            name: String // name作为props属性绑定
        },
        created() {
            console.log(this.$attrs);
            // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
        }
    };
</script>

// childCom2.vue

<template>
    <div class="border">
        <p>age: {{ age}}</p>
        <p>childCom2: {{ $attrs }}</p>
    </div>
</template>
<script>

    export default {
        inheritAttrs: false,
        props: {
            age: String
        },
        created() {
            console.log(this.$attrs);
            // { "gender": "女", "height": "158", "title": "程序员成长指北" }
        }
    };
</script>

