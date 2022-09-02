<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData" />
    <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id">
      <template #default="{ node, data }">
        <div class="custom_tree_node">
          <span>{{  data.name  }}</span>
          <div class="ml-auto">
            <el-button text type="primary" size="small" @click="openGoodsDrawer(data)"
              :loading="data.goodsDrawerLoading">推荐商品
            </el-button>
            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
              @change="handleStatusChange($event, data)">
            </el-switch>
            <el-button text type="primary" size="small" @click.stop="handleUpdate(data)">修改
            </el-button>
            <el-popconfirm title="是否要删除该菜单?" confirm-button-text="确认" cancel-button-text="取消"
              @confirm="handleDelete(data.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <GoodsDrawer ref="goodsDrawerRef" />
  </el-card>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import GoodsDrawer from "./components/GoodsDrawer.vue";
import {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
  getCategoryGoods
} from "@/api/category";
import { useInitTable, useInitForm } from "@/composables/useCommon";


const { loading, tableData, getData, handleDelete, handleStatusChange } =
  useInitTable({
    getList: getCategoryList,
    onGetListSuccess: (res) => {
      tableData.value = res.map(o => {
        o.goodsDrawerLoading = false
        return o
      });
    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus,
  });

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  handleCreate,
  drawerTitle,
  resetForm,
  handleSubmit,
  handleUpdate,
} = useInitForm({
  form: {
    name: "",
  },
  getData,
  update: updateCategory,
  create: createCategory,
  rule: {
    title: [
      {
        required: true,
        message: "公告标题不能为空",
        trigger: "blur",
      },
    ],
    content: [
      {
        required: true,
        message: "公告内容不能为空",
        trigger: "blur",
      },
    ],
  },
});

const goodsDrawerRef = ref(null)
const openGoodsDrawer = (data) => {
  goodsDrawerRef.value.open(data)
}
</script>
  
<style lang="scss" scoped>
.custom_tree_node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

::v-deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>