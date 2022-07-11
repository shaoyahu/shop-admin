<template>
  <el-result title="404提示" sub-title="没有这个页面了(暂时">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
    </template>
  </el-result>
</template>

<script>
export default {};
</script>

<style>
</style>