<template>

  <el-drawer
    title="物流信息"
    v-model="dialogVisible"
    size="40%"
  >
    <el-card shadow="never" class="mb-3 border-0">
      <div class="flex items-center">
        <el-image
          :src="info.logo"
          fit="fill"
          style="width:60px;height:60px"
          :lazy="true"
          class="rounded border"
        ></el-image>
        <div class="ml-3">
          <p>物流公司: {{ info.typename }}</p>
          <p>物流单号: {{ info.number }}</p>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item
          :timestamp="item.time"
          placement="top"
          v-for="(item, index) in info.list"
          :key="index"
        >
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>


  </el-drawer>

</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  getShipInfo
} from '@/api/order'
import { toast } from '@/composables/util';
const dialogVisible = ref(false)
const info = ref({})
const open = (id) => {
  return getShipInfo(id)
    .then(res => {
      if (res.status != 0) {
        return toast(res.msg, 'error')
      }
      info.value = res.result
      console.log(res.result)
      dialogVisible.value = true
    })
}

defineExpose({
  open
})

</script>

<style lang='scss' scoped>

</style>
