<template>
  <div class="tabberWarp">
    <div class="warp">
      <Item
        :txt="item.txt"
        :page="item.page"
        v-for="(item, index) in tabbarDes"
        :key="index"
        :sel="select"
      >
        <img :src="item.normalImg" slot="normalImg" />
        <img :src="item.activeImg" slot="activeImg" />
      </Item>
    </div>
  </div>
</template>
<script>
import Item from "./Item.vue";
export default {
  props: ["selected"],
  components: {
    Item,
  },
  computed: {
    select() {
      console.log(this.selected);
      if (this.selected) {
        return this.selected;
      } else {
        return 'my'
      }
    },
  },
  data: function () {
    return {
      tabbarDes: [
        // {
        //   txt: "快讯",
        //   page: "flash",
        //   normalImg: require("@/assets/images/flash.png"),
        //   activeImg: require("@/assets/images/flash1.png"),
        // },
         {
          txt: "首页",
          page: "note",
          normalImg: require("@/assets/images/indexNormal.png"),
          activeImg: require("@/assets/images/indexFoucs.png"),
        },
        {
          txt: "维权315",
          page: "complain",
          normalImg: require("@/assets/images/315Normal.png"),
          activeImg: require("@/assets/images/315foucs.png"),
        },
        {
          txt: "土研院",
          page: "land",
          normalImg: require("@/assets/images/landNormal.png"),
          activeImg: require("@/assets/images/landFoucs.png"),
        },
        {
          txt: "我的",
          page: "my",
          normalImg: require("@/assets/images/userNormal.png"),
          activeImg: require("@/assets/images/userFoucs.png"),
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" >
.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}
.warp img {
  width: 20px;
  height: 20px;
}
.tabberWarp img {
  margin-top: 10px;
  margin-bottom: 5px;
}
.tabberWarp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
}
</style>