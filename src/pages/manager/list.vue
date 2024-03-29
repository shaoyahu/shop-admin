<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索 -->
    <!-- 搜索 -->
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="关键词">
        <el-input v-model="searchForm.keyword" placeholder="管理员名称" clearable></el-input>
      </SearchItem>
    </Search>
    <!-- 新增/刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData" />
    <!-- 表格内容 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="scope">
          <div class="flex items-center">
            <el-avatar :size="40" :src="scope.row.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ scope.row.username }}</h6>
              <small>ID:{{ scope.row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template #default="scope">
          {{ scope.row.role?.name || "-" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0"
            @change="handleStatusChange($event, scope.row)" :loading="scope.row.statusLoading"
            :disabled="scope.row.super == 1">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作
          </small>
          <div v-else>
            <el-button type="primary" size="small" text @click="handleUpdate(scope.row)">修改
            </el-button>
            <el-popconfirm title="是否要删除该管理员?" confirm-button-text="确认" cancel-button-text="取消"
              @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger" text>删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import ChooseImage from "@/components/ChooseImage.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";

import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from "@/api/manager";

import { useInitTable, useInitForm } from "@/composables/useCommon";

// 角色身份数组
const roles = ref([]);
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    keyword: "",
  },
  getList: getManagerList,
  delete: deleteManager,
  updateStatus: updateManagerStatus,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map((o) => {
      o.statusLoading = false;
      return o;
    });
    roles.value = res.roles;
    total.value = res.totalCount;
  },
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
    username: "",
    password: "",
    role_id: "",
    status: 1,
    avatar: "",
  },
  getData,
  update: updateManager,
  create: createManager,
  rule: {
    username: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
    ],
  },
});
</script>