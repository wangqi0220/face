<template>
  <template
    v-for="menu in menuList"
    :key="menu.path"
  >
    <!-- 有下一级就走el-sub-menu 没有就走 el-menu -item --> 
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0 && !menu.redirect"
      :index="menu.path"
    >
      <template #title> 
        <!-- 动态组件的使用方法 -->
        <el-icon>
          <component
            :is="menu.meta.icon"
            class="icons"
          />
        </el-icon>
        <!-- <Icon class="icons"  :icon='menu.meta.icon'></Icon> -->
        <span>{{ menu.meta.title }}</span>
      </template>
      <!-- 自己调用自己  递归 -->
      <menu-item :menu-list="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      style="color: #f4f4f5"
      :index="menu.path"
    >
      <!-- 动态组件的使用方法 --> 
      <el-icon>
        <component
          :is="menu.meta.icon"
          class="icons"
        />
      </el-icon>
      <!-- <Icon class="icons"  :icon='menu.meta.icon'></Icon> -->
      <template #title>
        {{ menu.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
defineProps(['menuList'])
</script>
<style scoped>
/* 防止图标太大 */
.icons { 
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>