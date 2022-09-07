<template>
  <div class="flex items-center justify-between mb-4">
    <div>
      <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增
      </el-button>
      <el-popconfirm title="是否要批量删除选中?" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('delete')">
        <template #reference>
          <el-button v-if="btns.includes('delete')" type="danger" size="small">批量删除
          </el-button>
        </template>
      </el-popconfirm>
      <slot />
    </div>
    <div>
      <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="top">
        <el-button text @click="$emit('refresh')">
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="btns.includes('download')" effect="dark" content="导出数据" placement="top">
        <el-button text @click="$emit('download')">
          <el-icon :size="20">
            <Download />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { computed } from "vue";
const props = defineProps({
  layout: {
    type: String,
    default: "create,refresh",
  },
});

const btns = computed(() => {
  return props.layout.split(",");
});

defineEmits(["create", "refresh", "delete", 'download']);
</script>
  
<style>

</style>