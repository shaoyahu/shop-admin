<template>
  <span>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      class="button-new-tag ml-1"
      size="small"
      @click="showInput"
    >
      + 添加规格值
    </el-button>
  </span>
</template>

<script setup>
import { nextTick, ref } from "vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"])

const inputValue = ref("");
const dynamicTags = ref(props.modelValue ? props.modelValue.split(",") : []);
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  emit('update:modelValue',dynamicTags.value.join(','))
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
    emit('update:modelValue',dynamicTags.value.join(','))
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>


<style lang='scss' scoped>
</style>
