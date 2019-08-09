<template>
    <div>
        {{test}}
    </div>
</template>

<script>
    // 对于vuex语法糖的使用
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        /**/
        computed:{
            ...mapGetters(['test']), // 数组方式
            ...mapGetters({
                test:'test' // 映射方式
            }) // 数组方式
        },
        methods:{
            init(){
                let options = {} // 传参数据
                this.set_data(); // Action提交mutations
                this.SET_DATA(options); // 提交mutations
                this['a/get_data'](options) // 模块提交
            },
            ...mapActions(['set_data','a/get_data']),
            ...mapActions({ // 映射关系
                set_data:'set_data'
            }),
            ...mapMutations(['SET_DATA','a/SET_DATA']),
            ...mapMutations({// 映射关系
                SET_DATA:'SET_DATA'
            })
        }
        /**/
    }
</script>
<style scoped lang="stylus" ></style>
