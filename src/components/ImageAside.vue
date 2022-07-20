<template>
  <el-aside width="220px" class="image_aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeID == item.id"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
  <FormDrawer title="新增" ref="formDrawerRef" @submit="handleSubmit">
  </FormDrawer>
</template>

<script setup>
import { ref } from "vue";
import AsideList from "./AsideList.vue";
import { getImageClassList } from "@/api/image_class.js";
import FormDrawer from "./FormDrawer.vue";

// 加载动画
const loading = ref(false);
const list = ref([]);
const activeID = ref(0);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      list.value = res.list;
      total.value = res.totalCount;
      let item = list.value[0];
      if (item) {
        activeID.value = item.id;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();

const formDrawerRef = ref(null);
const handleCreate = () => {
  formDrawerRef.value.open()
};
const handleSubmit = () => {
  console.log('提交表单')
};
defineExpose({
  handleCreate
})
</script>

<style lang="scss" scoped>
.image_aside {
  border-right: 1px solid #eee;
  position: relative;
  .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  .bottom {
    @apply flex items-center justify-center;
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
  }
}
</style>