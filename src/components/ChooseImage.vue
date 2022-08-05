<template>
  <span>
    <div v-if="modelValue">
      <el-image
        :src="modelValue"
        fit="cover"
        class="w-[100px] h-[100px] rounded border mr-2"
      ></el-image>
    </div>
    <div class="choose_image_btn" @click="open">
      <el-icon :size="25" class="text-gray-500"><User /></el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
      <el-container class="bg-white rounded" style="height: 70vh">
        <el-header class="image_header">
          <el-button type="primary" size="small" @click="handleOpenCreate"
            >新增图片分类
          </el-button>
          <el-button type="warning" size="small" @click="handleOpenUpload"
            >上传图片
          </el-button>
        </el-header>
        <el-container>
          <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
          <ImageMain ref="ImageMainRef" @choose="handleChoose" openChoose />
        </el-container>
      </el-container>

      <template #footer>
        <span>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </span>
</template>

<script setup>
import { ref } from "vue";
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";

const dialogVisible = ref(false);

// 打开
const open = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

// 确定
const submit = () => {
  if (urls.length) {
    emit("update:modelValue", urls[0]);
  }
  close();
};

const ImageAsideRef = ref(null);
const ImageMainRef = ref(null);

// 去新增图片分类
const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate();
};

// 点击选中图片分类
const handleAsideChange = (image_class_id) => {
  ImageMainRef.value.loadData(image_class_id);
};

// 去上传图片
const handleOpenUpload = () => {
  ImageMainRef.value.openUploadFile();
};

const props = defineProps({
  modelValue: [String, Array],
});
const emit = defineEmits(["update:modelValue"]);

// 选中图片
let urls = [];
const handleChoose = (e) => {
  urls = e.map((o) => {
    return o.url;
  });
};
</script>


<style lang="scss" scoped>
.choose_image_btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
.image_header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>