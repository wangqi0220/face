<template>
  <!-- 对应方式一 -->
  <template
    v-for="menu in menuList"
    :key="menu.path"
  >
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <!-- menu.meta.icon 防止报错 -->
        <i
          v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"
          :class="menu.meta.icon"
        />
        <!-- 动态组件的使用方法 -->
        <component
          :is="menu.meta.icon"
          v-else
          class="icons"
        />
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menu-list="menu.children" />
    </el-sub-menu>
    <el-menu-item 
      v-else
      style="color: #f4f4f5" 
      :index="menu.path"
    >     
      <i
        v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"
        :class="menu.meta.icon"
      />   
      <!-- 动态组件的使用方法 --> 
      <component
        :is="menu.meta.icon"
        v-else
        class="icons"
      />
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
.icons {
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>