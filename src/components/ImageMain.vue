<template>
  <el-main class="image_main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col v-for="(item, index) in list" :key="index" :span="6" :offset="0">
          <el-card shadow="hover" class="relative mb-3" :body-style="{ padding: 0 }"
            :class="{ 'border-amber-500': item.checked }">
            <el-image :src="item.url" fit="cover" :lazy="true" class="w-full h-[150px]" :preview-src-list="[item.url]"
              :initial-index="0"></el-image>
            <div class="image_title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-checkbox v-model="item.checked" @change="handleChooseChange(item)" v-if="openChoose" />

              <el-button type="primary" size="small" text @click="handleEdit(item)">重命名
              </el-button>
              <el-popconfirm title="是否删除该图片?" confirm-button-text="确认" cancel-button-text="取消"
                @confirm="handleDelete(item.id)">
                <template #reference>
                  <el-button type="primary" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
  </el-main>
  <el-drawer v-model="drawer" title="上传图片">
    <UploadFile :data="{ image_class_id }" @success="handleUploadSuccess" />
  </el-drawer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { getImageList, deleteImage, updateImage } from "@/api/image.js";
import { showPrompt, toast } from "@/composables/util.js";
import UploadFile from "./UploadFile.vue";
import { number } from "echarts";

// 上传图片
const drawer = ref(false);
const openUploadFile = () => {
  drawer.value = true;
};

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([]);
const loading = ref(false);
const image_class_id = ref(0);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageList(image_class_id.value, currentPage.value)
    .then((res) => {
      list.value = res.list.map((o) => {
        o.checked = false;
        return o;
      });
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 根据分类ID重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1;
  image_class_id.value = id;
  getData();
};

// 重命名图片
const handleEdit = (item) => {
  showPrompt("重命名", item.name)
    .then((res) => {
      loading.value = true;
      updateImage(item.id, res.value)
        .then((ress) => {
          toast("修改成功");
          getData();
        })
        .finally(() => {
          loading.value = false;
        });
    })
};

// 删除图片
const handleDelete = (id) => {
  loading.value = true;
  deleteImage([id])
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

// 图片上传成功回调
const handleUploadSuccess = () => {
  getData(1);
};

const props = defineProps({
  openChoose: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 1
  }
})

// 选中的图片
const emit = defineEmits(["choose"]);
const checkedImage = computed(() => {
  return list.value.filter((item) => {
    return item.checked == true;
  });
});

const handleChooseChange = (item) => {
  if (item.checked && checkedImage.value.length > props.limit) {
    item.checked = false;
    return toast(`最多只能选中${props.limit}张`, "error");
  }
  emit('choose', checkedImage.value)
};

// 导出/暴露出 当前组件拥有的方法
defineExpose({
  loadData,
  openUploadFile,
});
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

    .image_title {
      position: absolute;
      top: 135px;
      left: -1px;
      right: -1px;
      @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
    }
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