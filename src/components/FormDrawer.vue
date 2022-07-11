<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref(false);
const loading = ref(false)
const showLoading = () => {
  loading.value = true
}
const hideLoading = () => {
  loading.value = false
}
// 打开抽屉
const open = () => {
  showDrawer.value = true;
};

// 关闭抽屉
const close = () => {
  showDrawer.value = false;
};

//提交
const emit = defineEmits(['submit'])
const submit = () => {
  emit('submit')
}

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
});

// 向外暴露属性
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "40%",
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});
</script>

<style lang="scss" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
  .body {
    flex: 1;
    overflow-y: auto;
  }
  .actions {
    height: 50px;
    @apply mt-auto flex items-center;
  }
}
</style>