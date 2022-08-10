<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增/刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData" />
    <!-- 表格内容 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="desc" label="角色描述" />
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-switch
            :modelValue="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange($event, scope.row)"
            :loading="scope.row.statusLoading"
            :disabled="scope.row.super == 1"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="openSetRule(scope.row)"
          >
            配置权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            text
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-popconfirm
            title="是否要删除该角色?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="角色描述"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <!-- 权限配置 -->
    <FormDrawer
      ref="setRuleFormDrawerRef"
      title="权限配置"
      @submit="handleSetRuleSubmit"
    >
      <el-tree-v2
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
        :data="ruleList"
        :props="{ label: 'name', children: 'child' }"
        show-checkbox
        :height="treeHeight"
        ref="elTreeRef"
        @check="handleTreeCheck"
        :check-strictly="checkStrictly"
      >
        <template #default="{ node, data }">
          <div class="flex items-center">
            <el-tag :type="data.menu ? '' : 'info'" size="small">
              {{ data.menu ? "菜单" : "权限" }}
            </el-tag>
            <span class="ml-2 text-sm">{{ data.name }}</span>
          </div>
        </template>
      </el-tree-v2>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getRoleList,
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
  setRoleRules,
} from "@/api/role";
import { getRuleList } from "@/api/rule";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import { toast } from "@/composables/util.js";
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
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus,
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
    desc: "",
    status: 1,
  },
  getData,
  update: updateRole,
  create: createRole,
  rule: {
    name: [
      {
        required: true,
        message: "角色名称不能为空",
        trigger: "blur",
      },
    ],
  },
});

const setRuleFormDrawerRef = ref(null);
// 放权限配置的数组
const ruleList = ref([]);
// 计算虚拟树的高度
const treeHeight = ref(0);
// 当前操作对象的ID
const roleId = ref(0);
// 当前操作角色拥有的权限id
const ruleIds = ref([]);
// 默认树展开的数组
const defaultExpandedKeys = ref([]);
const elTreeRef = ref(null);
// 父子不互相关联
const checkStrictly = ref(false)


// 去配置权限
const openSetRule = (row) => {
  roleId.value = row.id;
  treeHeight.value = window.innerHeight - 180;
  checkStrictly.value = true
  getRuleList(1).then((res) => {
    defaultExpandedKeys.value = res.list.map((o) => {
      return o.id;
    });
    ruleList.value = res.list;
    setRuleFormDrawerRef.value.open();

    // 获取当前角色拥有的权限ID
    ruleIds.value = row.rules.map((o) => {
      return o.id;
    });
    setTimeout(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value);
      checkStrictly.value = false
    }, 150);
  });
};
// 权限配置
const handleSetRuleSubmit = () => {
  setRuleFormDrawerRef.value.showLoading();
  setRoleRules(roleId.value, ruleIds.value)
    .then((res) => {
      toast('配置成功!')
      getData()
      setRuleFormDrawerRef.value.close()
    })
    .finally(() => {
      setRuleFormDrawerRef.value.hideLoading();
    });
};

const handleTreeCheck = (...e) => {
  const { checkedKeys, halfCheckedKeys } = e[1];
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys];
};
</script>