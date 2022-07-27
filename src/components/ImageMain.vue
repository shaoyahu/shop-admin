<template>
  <el-main class="image_main" v-loading="loading">
    <div class="top">
      <div v-for="i in 100" :key="i">{{ i }}</div>
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
  </el-main>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getImageList
} from '@/api/image.js'

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([])
const loading = ref(false)
const image_class_id = ref(0)

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageList(image_class_id, currentPage.value)
    .then((res) => {
      list.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

</script>

<style lang="scss" scoped>
.image_main {
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