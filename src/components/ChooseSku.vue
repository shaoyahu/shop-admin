<template>
<el-dialog
  title="规格选择"
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
</el-dialog>

</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
</script>

<style lang='scss' scoped>

</style>
