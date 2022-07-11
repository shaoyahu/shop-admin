<template>
  <el-row class="login_container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="left_title">欢迎光临</div>
        <div class="left_subtitle">
          欢迎来到站点,欢迎来到站点,欢迎来到站点,欢迎来到站点,欢迎来到站点
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="right_title">欢迎回来</h2>
      <div class="right_notice">
        <span class="right_notice_left"></span>
        <span>账号密码登录</span>
        <span class="right_notice_right"></span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-[250px]"
            color="rgb(59, 130, 246)"
            round
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { toast } from "@/composables/util.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
// import { User, Lock } from '@element-plus/icons-vue' //如果没有全局引入就局部引入
// do not use same name with ref

const form = reactive({
  username: "",
  password: "",
});
const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      min: 3,
      max: 50,
      message: "用户名长度必须在3-50个字符",
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
};
const formRef = ref(null);
const loading = ref(false);


const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    store
      .dispatch("login", form)
      .then((res) => {
        toast("登录成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

// 监听回车事件
function onKeyUp(e) {
  if(e.key === 'Enter'){
    onSubmit()
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style lang="scss" scoped>
.login_container {
  @apply min-h-screen;
  .left {
    @apply bg-blue-500 flex items-center justify-center;
    .left_title {
      @apply font-bold text-5xl text-light-500 mb-4;
    }
    .left_subtitle {
      @apply text-gray-200 text-sm;
    }
  }
  .right {
    @apply flex items-center justify-center flex-col;
    .right_title {
      @apply font-bold text-3xl text-gray-800;
    }
    .right_notice {
      @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
      .right_notice_left {
        @apply h-[1px] w-16 bg-gray-200;
      }
      .right_notice_right {
        @apply h-[1px] w-16 bg-gray-200;
      }
    }
  }
}
</style>