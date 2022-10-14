<template>
    <el-icon @click="changeIcon" class="fa-icons">
        <component :is="status ? Expand : Fold" />
    </el-icon>
</template>
<script setup lang='ts'>
import {computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { menuStore } from '@/store/menu'
const store = menuStore()
const status = computed(()=>{
    return store.getCollapse
})
//图标切换
const changeIcon = ()=>{
    store.setCollapse(!status.value)
}
</script>
<style scoped lang='scss'>
.fa-icons {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #303133;
    cursor: pointer;
    margin-right: 15px;
}
</style>