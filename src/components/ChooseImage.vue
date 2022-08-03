<template>
  <div class="choose_image_btn">
    <el-icon :size="25" class="text-gray-500"><User /></el-icon>
  </div>
  <!-- <el-dialog
    title="选择图片"
    v-model="dialogVisible"
    width="80%"
    :before-close="">
    <span></span>
    <template #footer>
    <span>
      <el-button @click=" = false">Cancel</el-button>
      <el-button type="primary" @click="">OK</el-button>
    </span>
    </template>
  </el-dialog> -->
  
</template>

<script setup>

</script>

script

<style lang="scss" scoped>
.choose_image_btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
</style>