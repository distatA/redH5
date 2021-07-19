<!--  -->
<template>
  <div class="person">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
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
  mounted() {
    console.log(this.$route); //包含各种信息（meta 对这个页面的内容备注 是否要登录等）
    //console.log(this.$router.currentRoute.params.id);
    // console.log(this.$route.params.id);

    //this.$router.currentRoute.params.id
  },
  methods: {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.person {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
}
ul {
  height: 200px;
  display: flex;
  list-style: none;
  li {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: red;
    margin-right: 20px;
    animation: love1 4s 0s infinite;
  }
}
li:nth-child(1) {
  animation: love1 4s 0s infinite;
}
li:nth-child(9) {
  animation: love1 4s 1.6s infinite;
}
li:nth-child(2) {
  background: darkturquoise;
  animation: love2 4s 0.2s infinite;
}
li:nth-child(8) {
  background: darkturquoise;
  animation: love2 4s 1.4s infinite;
}
li:nth-child(3) {
  background: darksalmon;
  animation: love3 4s 0.4s infinite;
}
li:nth-child(7) {
  background: darksalmon;
  animation: love3 4s 1.2s infinite;
}
li:nth-child(4) {
  background: deeppink;
  animation: love4 4s 0.6s infinite;
}
li:nth-child(6) {
  background: deeppink;
  animation: love4 4s 1s infinite;
}
li:nth-child(5) {
  background: yellow;
  animation: love5 4s 0.8s infinite;
}

@keyframes love1 {
  30%,
  50% {
    height: 60px;
    transform: translateY(-30px);
  }
  70%,
  100% {
    height: 0px;
    transform: translateY(0px);
  }
}
@keyframes love2 {
  30%,
  50% {
    height: 125px;
    transform: translateY(-60px);
  }
  70%,
  100% {
    height: 0px;
    transform: translateY(0px);
  }
}
@keyframes love3 {
  30%,
  50% {
    height: 160px;
    transform: translateY(-75px);
  }
  70%,
  100% {
    height: 0px;
    transform: translateY(0px);
  }
}
@keyframes love4 {
  30%,
  50% {
    height: 180px;
    transform: translateY(-60px);
  }
  70%,
  100% {
    height: 0px;
    transform: translateY(0px);
  }
}
@keyframes love5 {
  30%,
  50% {
    height: 200px;
    transform: translateY(-45px);
  }
  70%,
  100% {
    height: 0px;
    transform: translateY(0px);
  }
}
</style>