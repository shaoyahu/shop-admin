<template>
  <el-drawer title="订单详情" v-model="dialogVisible" size="50%">

  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)

const open = () =>{
  dialogVisible.value = true
}
</script>

<style lang='scss' scoped>
</style>
