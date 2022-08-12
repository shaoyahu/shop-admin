import { ref, reactive, computed } from "vue";
import { toast } from "@/composables/util.js";

// 列表 分页 搜索 删除 修改状态
export function useInitTable(opt = {}) {
  // 关键词搜索
  let searchForm = null
  // 重置关键词
  let resetSearchForm = null
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm })
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData()
    }
  }


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
    opt.getList(currentPage.value, searchForm)
      .then((res) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
          opt.onGetListSuccess(res)
        } else {
          tableData.value = res.list
          total.value = res.totalCount
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
  getData();

  // 删除管理员
  const handleDelete = (id) => {
    loading.value = true;
    opt.delete(id)
      .then((res) => {
        toast("删除成功");
        getData(false);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // 改变管理员状态
  const handleStatusChange = (status, row) => {
    row.statusLoading = true;
    opt.updateStatus(row.id, status)
      .then((res) => {
        toast("修改状态成功");
        row.status = status;
      })
      .finally(() => {
        row.statusLoading = false;
      });
  };

  // 多选选中ID
  const multiSelectIds = ref([]);
  const handleSelectionChange = (e) => {
    multiSelectIds.value = e.map((o) => {
      return o.id;
    });
  };
  const multipleTableRef = ref(null);
  // 批量删除
  const handleMultiDelete = () => {
    loading.value = true;
    opt.delete(multiSelectIds.value)
      .then((res) => {
        toast("删除成功");
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection();
        }
        getData()
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
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
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete
  }
}

// 新增 修改
export function useInitForm(opt = {}) {
  // 新增的抽屉表单
  const formDrawerRef = ref(null);
  const formRef = ref(null);
  const defaultForm = opt.form
  const form = reactive({});
  const rules = opt.rule || {};

  // 打开新增公告抽屉
  const handleCreate = () => {
    editId.value = 0;
    resetForm(defaultForm);
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
      for (const key in defaultForm) {
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

      let body = {}
      if (opt.beforeSubmit && typeof opt.beforeSubmit == "function") {
        body = opt.beforeSubmit({ ...form })
      } else {
        body = form
      }

      const fun = editId.value
        ? opt.update(editId.value, form)
        : opt.create(body);
      fun
        .then((res) => {
          toast(`${drawerTitle.value}成功`);
          opt.getData(editId.value ? false : 1);
          // editId.value ? getData(false) : getData(1);
          formDrawerRef.value.close();
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  // 去修改公告
  const handleUpdate = (row) => {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
  };

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    handleCreate,
    editId,
    drawerTitle,
    resetForm,
    handleSubmit,
    handleUpdate
  }
}