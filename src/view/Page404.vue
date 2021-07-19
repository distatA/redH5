<!--  -->
<template>
<div>
    <TabberTop :title="title"></TabberTop>
    <h1 class="title">你所访问的页面不存在 404</h1>
</div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
export default {
data() {
return {
title:'404'
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
 components:{
    TabberTop
  }
}
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.title{
    font-size: 20px;
    margin: 49vh auto;
    text-align: center;
}
</style>