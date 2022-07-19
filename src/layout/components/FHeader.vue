<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Connection /></el-icon>
      商城后台
    </span>
    <el-tooltip effect="dark" content="展开" placement="left">
      <el-icon class="icon_btn" @click="$store.commit('handleAsideWidth')"
        ><Fold v-if="$store.state.asideWidth == '250px'" /><Expand v-else
      /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="right">
      <el-icon class="icon_btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon_btn" @click="toggle"
          ><Reading v-if="!isFullscreen" /><DocumentCopy v-else
        /></el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <form-drawer
      ref="formDrawerRef"
      title="修改密码"
      @submit="onSubmit"
      destroyOnClose
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入新密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
            v-model="form.repassword"
            type="password"
            placeholder="请确认密码"
            show-password
          >
          </el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<script setup>
import FormDrawer from "@/components/FormDrawer.vue";
import { useFullscreen } from "@vueuse/core";
import { useRePassword, useLogout } from "@/composables/useManager";
const { isFullscreen, enter, exit, toggle } = useFullscreen();
const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } =
  useRePassword();
const { handleLogout } = useLogout();

// 下拉框方法
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      handleRePassword();
      break;
  }
};

// 修改密码
function handleRePassword() {
  openRePasswordForm();
}

// 刷新页面
function handleRefresh() {
  location.reload();
}
</script>

<style lang="scss" scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-cyan-100 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
  .logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
  }
  .icon_btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
    &:hover {
      @apply bg-indigo-500;
    }
  }
  .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
  }
}
</style>