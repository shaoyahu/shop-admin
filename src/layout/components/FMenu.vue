<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      class="border-0"
      @select="handleSelect"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      :default-active="defaultActive"
    >
      <template v-for="item in asideMenus" :key="item.id">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();


// 默认选中
const defaultActive = ref(route.path);

// 监听路由变化
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path;
});

// 是否折叠
const isCollapse = computed(() => {
  return !(store.state.asideWidth == "250px");
});

// const asideMenus = [
//   {
//     name: "后台面板",
//     icon: "help",
//     child: [
//       {
//         name: "主控台",
//         icon: "home-filled",
//         frontpath: "/",
//       },
//     ],
//   },
//   {
//     name: "商城管理",
//     icon: "shopping-bag",
//     child: [
//       {
//         name: "商品管理",
//         icon: "shopping-cart-full",
//         frontpath: "/goods/list",
//       },
//     ],
//   },
// ];
const asideMenus = computed(() => {
  return store.state.menus;
});
const handleSelect = (e) => {
  router.push(e);
};
</script>

<style lang="scss" scoped>
.f-menu {
  // width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
  transition: all 0.5s;
  &::-webkit-scrollbar {
    width: 0px;
  }
}
</style>