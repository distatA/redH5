<!--  -->
<template>
  <div>
    <p>
      <router-link to="/bignews/image">Go to image</router-link> |
      <router-link to="/bignews/text">Go to text</router-link> |
      <router-link to="/bignews/video">Go to video</router-link>
    </p>
    <p>bigNews</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
</style>