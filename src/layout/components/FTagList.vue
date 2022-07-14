<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height:44px"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { router } from "../../router";
import { functionsIn } from "lodash";
const route = useRoute();
const cookie = useCookies();

const activeTab = ref(route.path);
const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
]);

// 添加标签导航
function addTab(tab) {
  let noTab =
    tabList.value.findIndex((t) => {
      return t.path == tab.path;
    }) == -1;
  if (noTab) {
    tabList.value.push(tab);
  }
  cookie.set("tabList", tabList.value);
}

// 初始化标签导航列表
function initTabList() {
  let tbs = cookie.get('tabList')
  if(tbs){
    tabList.value = tbs
  }
}

initTabList()

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});

const changeTab = (t) => {
  activeTab.value = t
  router.push(t)
};

const removeTab = (targetName) => {};
</script>

<style lang="scss" scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center justify-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  .tag-btn {
    @apply bg-white rounded flex items-center justify-center px-2;
    height: 32px;
    margin-left: auto;
  }
}
::v-deep(.el-tabs__header) {
  @apply mb-0 flex justify-center items-center;
  border: 0 !important;
}
::v-deep(.el-tabs__nav) {
  border: 0 !important;
}
::v-deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 mt-auto mb-auto rounded;
}
::v-deep(.el-tabs__nav-next),
::v-deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
  margin-top: 2px;
}
::v-deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-200;
}
</style>