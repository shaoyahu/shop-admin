<template>
  <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="submit" destroy-on-close>
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="content" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue';
import Editor from '@/components/Editor.vue'
import {
  readGoods,
  setGoodsBanner
} from '@/api/goods'
import { imageEmits } from 'element-plus';
import { toast } from '@/composables/util';

const formDrawerRef = ref(null)

const form = reactive({
  content:"",
  banners: []
})

// 当前选中打开抽屉的商品ID
const goodsId = ref(0)
const open = (row) => {
  goodsId.value = row.id
  row.contentLoading = true
  readGoods(goodsId.value).then(res => {
    form.banners = res.goodsBanner.map(item => {
      return item.url
    })
    formDrawerRef.value.open()
  }).finally(() => {
    row.contentLoading = false
  })
}

const emit = defineEmits(['reloadData'])
const loading = ref(false)
const submit = () => {
  // loading.value = true
  // setGoodsBanner(goodsId.value, form).then(res => {
  //   toast('设置轮播图成功')
  //   dialogVisible.value = false
  //   emit('reloadData')
  // }).finally(() => {
  //   loading.value = false
  // })
}

defineExpose({
  open
})


</script>

<style lang='scss' scoped>
</style>
