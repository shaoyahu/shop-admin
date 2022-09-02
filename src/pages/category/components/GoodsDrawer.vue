<template>
  <FormDrawer ref="formDrawerRef" title="推荐商品" size="50%" @submit="handleConnect" confirmText="关联">
    <el-table :data="tableData" border stripe style="width:100%">
      <el-table-column prop="goods_id" label="ID" width="60" />
      <el-table-column label="商品封面" width="180">
        <template #default="{ row }">
          <el-image :src="row.cover" fit="fill" :lazy="true" style="width:64px;height:64px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-popconfirm title="是否要删除该菜单?" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="primary" text size="small" :loading="row.loading">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

  </FormDrawer>
  <ChooseGoods ref="chooseGoodsRef" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue';
import ChooseGoods from '@/components/ChooseGoods.vue';

import {
  getCategoryGoods,
  deleteCategoryGoods
} from '@/api/category'
import { toast } from '@/composables/util';

const formDrawerRef = ref(null)
const category_id = ref(0)
const tableData = ref([])

const open = (item) => {
  category_id.value = item.id
  item.goodsDrawerLoading = true
  getData()
    .then(res => {
      formDrawerRef.value.open()
    })
    .finally(() => {
      item.goodsDrawerLoading = false
    })
}

function getData() {
  return getCategoryGoods(category_id.value)
    .then(res => {
      tableData.value = res.map(o => {
        o.loading = false
        return o
      })
    })
}

const handleDelete = (row) => {
  row.loading = true
  deleteCategoryGoods(row.id)
    .then(res => {
      toast('删除成功')
      getData()
    })
}

const chooseGoodsRef = ref(null)
const handleConnect = () => {
  chooseGoodsRef.value.open()
}

defineExpose({
  open
})
</script>

<style lang='scss' scoped>
</style>
