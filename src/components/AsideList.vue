<template>
  <div class="aside_list" :class="{ active: active }">
    <span class="truncate"><slot /></span>
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="small"
      @click="$emit('edit')"
    >
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>
    <el-button
      class="px-1"
      text
      type="primary"
      size="small"
      @click="$emit('delete')"
    >
      <el-icon :size="12"><Close /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "delete"]);
</script>

<style lang="scss" scoped>
.aside_list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600;
  cursor: pointer;
  &:hover {
    @apply bg-blue-100;
  }
}
.active {
  @apply bg-blue-100;
}
</style>