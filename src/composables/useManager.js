import { ref, reactive } from "vue";
import { logout, updatePassword } from "@/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showModal, toast } from "@/composables/util";

export function useRePassword() {
  const router = useRouter();
  const store = useStore();

  const formDrawerRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const rules = {
    oldpassword: [
      {
        required: true,
        message: "旧密码不能为空",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "新密码不能为空",
        trigger: "blur",
      },
    ],
    repassword: [
      {
        required: true,
        message: "确认密码不能为空",
        trigger: "blur",
      },
    ],
  };

  const formRef = ref(null);

  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }
      formDrawerRef.value.showLoading();
      updatePassword(form)
        .then((res) => {
          toast("修改密码成功，请重新登录");
          store.dispatch("logout");
          router.push("/login");
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  const openRePasswordForm = () => {
    formDrawerRef.value.open();
  }
  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordForm
  }
}

export function useLogout() {
  const router = useRouter();
  const store = useStore();

  // 退出登录
  function handleLogout() {
    showModal("是否要退出登录？").then((res) => {
      logout().finally(() => {
        store.dispatch("logout");
        // 跳转到登录页面
        router.push("/login");
        // 提示退出成功
        toast("退出成功");
      });
    });
  }
  return {
    handleLogout
  }
}