<!-- 账户余额 -->
<template>
  <div class="returnTop">
    <van-nav-bar 
    :title="title" 
    left-text 
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight">
      <!-- <template #right>
        <van-icon name="ellipsis"/>
      </template> -->
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props:['title'],
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
     onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      Toast('按钮');
    },
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
    .van-nav-bar {
    height: 0.88rem;
    }
    /deep/ .van-nav-bar__arrow {
        color: #2c2c2c;
        font-size: 0.4rem;
    }
    /deep/ .van-nav-bar__title{
        font-size: 0.28rem;
    }
    /deep/ .van-icon-ellipsis{
        color:tomato;
        font-size: 0.6rem;
    }
</style>