<template>
    <div>
        key的特殊属性主要用在Vue的虚拟DOM算法，
        在新旧nodes对比时辨识VNodes,
        如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
        使用key，它会基于key的变化重新排列元素顺序， 并且会移除key不存在的元素。
        有相同父元素的子元素必须有独特的key。
        重复的key会造成渲染错误。
        总之就是一句话，key属性能够提升性能(主要作用于数据更新时)。

    </div>
    <div>
        由于vue缓存的策略，对于新增的记录才会渲染，假如，使用index,当我在数组中插入一条记录。
        则：该记录和后面的记录都会渲染。降低性能
    </div>
</template>

<script>
    export default {
        name: "v-for为什么不推荐用index做key值.vue"
    }

</script>

<style scoped>

</style>
