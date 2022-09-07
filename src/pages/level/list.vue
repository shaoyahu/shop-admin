<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增/刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData" />
    <!-- 表格内容 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="会员等级" />
      <el-table-column prop="discount" label="折扣率" align='center' />
      <el-table-column prop="level" label="等级序号" align='center' />
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0"
            @change="handleStatusChange($event, scope.row)" :loading="scope.row.statusLoading"
            :disabled="scope.row.super == 1">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleUpdate(scope.row)">
            修改
          </el-button>
          <el-popconfirm title="是否要删除记录?" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder="等级名称"></el-input>
        </el-form-item>
        <el-form-item label="等级权重" prop="level">
          <el-input type="number" v-model="form.level" placeholder="等级权重"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="升级条件" prop="level">
          <div>
            <small class="text-xs mr-2">累计消费满</small>
            <el-input type="number" v-model="form.max_price" placeholder="累计消费" style="width:50%">
              <template #append>元</template>
            </el-input>
            <small class="text-gray-400 flex">
              累计消费满一定数值,单位:元
            </small>
          </div>
          <div>
            <small class="text-xs mr-2">累计次数满</small>
            <el-input type="number" v-model="form.max_times" placeholder="累计次数" style="width:50%">
              <template #append>笔</template>
            </el-input>
            <small class="text-gray-400 flex">
              累计购买次数达到一定数量,单位:笔
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率" prop="discount">
          <el-input type="number" v-model="form.discount" placeholder="折扣率" style="width:50%">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-400 flex">
            请输入折扣率,百分比,按原价的百分比购买
          </small>
        </el-form-item>

      </el-form>
    </FormDrawer>

  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getUserLevelList,
  createUserLevel,
  deleteUserLevel,
  updateUserLevel,
  updateUserLevelStatus,
} from "@/api/level";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import { useInitTable, useInitForm } from "@/composables/useCommon";

const limit = ref(8);

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    params: {
      limit,
    },
  },
  getList: getUserLevelList,
  delete: deleteUserLevel,
  updateStatus: updateUserLevelStatus,
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
    level: 100,
    status: 1,
    discount: 0,
    max_price: 0,
    max_times: 0
  },
  getData,
  update: updateUserLevel,
  create: createUserLevel,
  rule: {
    name: [
      {
        required: true,
        message: "会员等级名称不能为空",
        trigger: "blur",
      },
    ],
  },
});




</script>