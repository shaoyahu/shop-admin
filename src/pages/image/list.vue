<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image_header">Header</el-header>
    <el-container>
      <el-aside width="220px" class="image_aside">
        <div class="top">
          <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">分页</div>
      </el-aside>
      <el-main class="image_main">
        <div class="top">
          <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">分页</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
</script>

<style lang="scss" scoped>
.image_header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
.image_aside, .image_main {
  border-right: 1px solid #eee;
  position: relative;
  & .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  & .bottom {
    @apply flex items-center justify-center;
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
  }
}
</style>
