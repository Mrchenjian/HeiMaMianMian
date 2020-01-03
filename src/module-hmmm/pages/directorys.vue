<template>
  <div>目录</div>
</template>

<script>
export default {
  name: "DirectorysList",
  data() {
    return {
      searchForm:{
        directoryName:'', // 目录名称
        state:null //状态
      },
      status:status
    };
  }
};
</script>

<style scoped>
</style>
