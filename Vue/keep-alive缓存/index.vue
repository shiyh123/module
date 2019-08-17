<template>
    <div class="formStyle">
        <div v-for="n in 10" class="formItem" :key='n' @click='toDetail(n)'>
            <div class="machineTitle">追不上我吧--{{n}}</div>
            <div class="flex-text">
                <div><p>我就是这么强大</p>
                    <p><span style="color:red">{{n}}</span>／啦啦啦～</p></div>

                <div><p>非现销售：155元／25个</p>
                    <p>今日销售：130元／30个</p></div>
                <div style="padding-top:10px"> > </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        beforeRouteEnter(to, from, next) {
            if (from.path == "/home/detail") {
                to.meta.isBack = true;
            } else {
                to.meta.isBack = false;
            }
            next();
        },
        beforeRouteUpdate(to,from,next){

        },
        beforeRouteLeave(to,from){

        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.initInfo();
            }
            this.$route.meta.isBack = false;
        },
        deactivate(){},
        destroy(){},
        methods: {
            initInfo() {},
            toDetail(n) {
                console.log(n);
                this.$router.push("detail");
            }
        }
    };
</script>
