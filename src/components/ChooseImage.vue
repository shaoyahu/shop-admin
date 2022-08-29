<template>
  <span>
    <div v-if="modelValue && preview">
      <el-image v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover"
        class="w-[100px] h-[100px] rounded border mr-2"></el-image>
      <div v-else class="flex flex-wrap">
        <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
          <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full" style="z-index: 10"
            @click="removeImage(url)">
            <CircleClose />
          </el-icon>
          <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
        </div>
      </div>
    </div>
    <div v-if="preview" class="choose_image_btn" @click="open">
      <el-icon :size="25" class="text-gray-500">
        <User />
      </el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
      <el-container class="bg-white rounded" style="height: 70vh">
        <el-header class="image_header">
          <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类
          </el-button>
          <el-button type="warning" size="small" @click="handleOpenUpload">上传图片
          </el-button>
        </el-header>
        <el-container>
          <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
          <ImageMain ref="ImageMainRef" @choose="handleChoose" openChoose :limit="limit" />
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
import { ref } from "vue"
import ImageAside from "@/components/ImageAside.vue"
import ImageMain from "@/components/ImageMain.vue"
import { toast } from "@/composables/util"

const dialogVisible = ref(false)

const callbackFunction = ref(null)
// 打开
const open = (callback = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}

const close = () => {
  dialogVisible.value = false
}

// 确定
const submit = () => {
  let value = []
  if (props.limit == 1) {
    value = urls[0]
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls]
    if (value.length > props.limit) {
      let limit = props.preview ? props.limit - props.modelValue.length : props.limit
      return toast(`最多还能选择${limit}张`, 'error')
    }
  }
  if (value && props.preview) {
    emit("update:modelValue", value)
  }
  if (!props.preview && typeof callbackFunction.value === "function") {
    callbackFunction.value(value)
  }
  close()
}

const ImageAsideRef = ref(null)
const ImageMainRef = ref(null)

// 去新增图片分类
const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate()
}

// 点击选中图片分类
const handleAsideChange = (image_class_id) => {
  ImageMainRef.value.loadData(image_class_id)
}

// 去上传图片
const handleOpenUpload = () => {
  ImageMainRef.value.openUploadFile()
}

const props = defineProps({
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(["update:modelValue"])

// 选中图片
let urls = []
const handleChoose = (e) => {
  urls = e.map((o) => {
    return o.url
  })
}

// 删除图片
const removeImage = (url) => {
  emit("update:modelValue", props.modelValue.filter(u => u != url))
}

defineExpose({
  open
})
</script>


<style lang="scss" scoped>
.choose_image_btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}

.image_header {
  border-bottom: 1px solid #eee ;
  @apply flex items-center;
}
</style>