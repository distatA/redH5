<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <div class="container">
      <div class="title">{{ detail.title }}</div>
      <p class="time">{{ detail.createTime }}</p>
      <div v-html="detail.content" class="content"></div>
    </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
export default {
  data() {
    return {
      data: "",
      detail: "",
      title: "公告详情",
    };
  },
 components: {
    TabberTop,
  },
  mounted() {
    if (!this.$route.query.id) return;
    this.getDetail(this.$route.query.id);
  },
  methods: {
    async getDetail(id) {
      let params = `id=${id}`;
      const res = await apiData.langDetail.detail(params);
      this.detail = res.data;
     this.detail.content =   this.detail.content.replace('<img ', '<img style="max-width:100%;height:auto;display:block;margin:1012/ 375 * 100vw 0;"')
    },
  },
};
</script>
<style scoped lang="less">

.container {
  padding: 20/ 375 * 100vw;
  
}
.content{
  .imgs{
  width: 100%;
  height: auto;
}
}
.title {
  font-size: 16/ 375 * 100vw;
  font-weight: 400;
  color: #000000;
}
.time {
  font-size: 12/ 375 * 100vw;
  font-weight: 400;
  margin: 15/ 375 * 100vw 0 10/ 375 * 100vw 0;

}

</style>