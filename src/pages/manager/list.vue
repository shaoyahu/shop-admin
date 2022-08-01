<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增/刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="getData">
          <el-icon :size="20"><Refresh /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <!-- 表格内容 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="scope">
          <div class="flex items-center">
            <el-avatar :size="40" :src="scope.row.avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ scope.row.username }}</h6>
              <small>ID:{{ scope.row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属管理员" align="center">
        <template #default="scope">
          {{ scope.row.role?.name || "-" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-switch
            :modelValue="scope.row.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="是否要删除该管理员?"
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
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="公告内容"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getNoticeList,
  createNotice,
  deleteNotice,
  updateNotice,
} from "@/api/notice";
import FormDrawer from "@/components/FormDrawer.vue";
import { getManagerList } from "@/api/manager";
import { toast } from "@/composables/util.js";

const tableData = ref([]);
const loading = ref(false);
// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(5);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value)
    .then((res) => {
      tableData.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();

// 新增的抽屉表单
const formDrawerRef = ref(null);
const formRef = ref(null);
const form = reactive({
  title: "",
  content: "",
});
const rules = {
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
};

// 打开新增公告抽屉
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    title: "",
    content: "",
  });
  formDrawerRef.value.open();
};

// 标记判断是新增还是修改
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

// 重置表单
function resetForm(row = false) {
  if (formRef.value) {
    formRef.value.clearValidate();
  }
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}

// 抽屉确定按钮  新增 / 修改
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    formDrawerRef.value.showLoading();

    const fun = editId.value
      ? updateNotice(editId.value, form)
      : createNotice(form);
    fun
      .then((res) => {
        toast(`${drawerTitle.value}成功`);
        getData(editId.value ? false : 1);
        // editId.value ? getData(false) : getData(1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};

// 删除公告
const handleDelete = (id) => {
  loading.value = true;
  deleteNotice(id)
    .then((res) => {
      toast("删除成功");
      getData(false);
    })
    .finally(() => {
      loading.value = false;
    });
};

// 去修改公告
const handleUpdate = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};
</script>