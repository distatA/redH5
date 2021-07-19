<template>
  <div class="body-content">
    <!-- <div id="magazine">
      <div v-for="(item, index) in allPages" :key="`test_${index}`">
        <div :class="`text${item.page}`">
          <footer
            v-if="item.page - 1 !== 0 && item.page - 1 !== allPages.length - 1"
            class="current-page"
          >
            <div v-if="(item.page - 1) % 2 == 0" class="even-numbers">
              {{ item.page - 1 }}
            </div>
            <div v-else class="odd-number">{{ item.page - 1 }}</div>
          </footer>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import turn from "../../utils/turn";

export default {
  name: "FenMian2",
  data() {
    return {
      value: "",
      page: 1,
      allPages: [
        {
          page: 1,
          name: "aa"
        },
        {
          page: 2,
          name: "aa"
        },
        {
          page: 3,
          name: "aa"
        },
        {
          page: 4,
          name: "aa"
        },
        {
          page: 5,
          name: "aa"
        },
        {
          page: 6,
          name: "aa"
        }
      ]
    };
  },
  mounted() {
    // let self = this;
    // $("#magazine").turn("center");
    // $("#magazine").turn("page");
    // this.$nextTick(() => {
    //   $("#magazine").turn({
    //     display: "double",
    //     elevation: 50,
    //     duration: 100,
    //     gradients: true,
    //     autoCenter: true,
    //     acceleration: true,
    //     gradients: !$.isTouch,
    //     page: self.page,
    //     width: 1152,
    //     when: {
    //       turned: function(e, page, pages) {
    //         //当前页
    //         console.log("Current view: ", $(this).turn("view"));
    //         //总页数
    //         console.log(
    //           "#magazine has " + $("#magazine").turn("pages") + " pages"
    //         );
    //         // $("#magazine").turn("hasPage", 10);
    //         // $("#magazine").turn("pages", 5);
    //       }
    //     }
    //   });
    // });
  },
  methods: {},
  components: {}
};
</script>
<style lang="less" scoped>
// body {
//   background: #ccc;
// }

// #magazine {
//   width: 1152px;
//   height: 752px;
//   .text1 {
//     background: url("../../images/1.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .text2 {
//     background: url("../../images/2.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .text3 {
//     background: url("../../images/3.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .text4 {
//     background: url("../../images/4.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .text5 {
//     background: url("../../images/5.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .text6 {
//     background: url("../../images/0.jpg") no-repeat;
//     background-size: 100% 100%;
//     width: 100%;
//     height: 752px;
//   }
//   .current-page {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     text-align: center;
//     font-size: 14px;
//     .even-numbers {
//       width: 30px;
//       height: 30px;
//       background: #ffcc66;
//       color: #fff;
//       right: 0;
//       position: absolute;
//       bottom: 0px;
//       line-height: 30px;
//       text-align: center;
//     }
//     .odd-number {
//       position: absolute;
//       bottom: 0px;
//       width: 30px;
//       height: 30px;
//       background: #cc00ff;
//       color: #fff;
//       line-height: 30px;
//       text-align: center;
//     }
//   }
// }

// #magazine .shadow,
// #magazine.shadow {
//   -webkit-box-shadow: 0 4px 10px #666;
//   -moz-box-shadow: 0 4px 10px #666;
//   -ms-box-shadow: 0 4px 10px #666;
//   -o-box-shadow: 0 4px 10px #666;
//   box-shadow: 0 4px 10px #666;
// }

// #magazine .turn-page {
//   background-color: #ccc;
//   background-size: 100% 100%;
// }
// .bookmark {
//   margin-left: 633px;
//   font-size: 20px;
//   writing-mode: tb-rl;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding-top: 47px;
//   .item:nth-child(2n) {
//     background: #ccc;
//     width: 45px;
//     height: 150px;
//   }
//   .item {
//     width: 45px;
//     height: 160px;
//     background: red;
//   }
//   .item:nth-child(1) {
//     z-index: 4;
//     text-shadow: 6px 6px 6px #999;
//   }
//   .item:nth-child(2) {
//     z-index: 3;
//     text-shadow: 6px 6px 6px #333;
//   }
//   .item:nth-child(3) {
//     z-index: 2;
//     text-shadow: 6px 6px 6px #333;
//   }
//   .item:nth-child(4) {
//     z-index: 1;
//     text-shadow: 6px 6px 6px #333;
//   }
// }
</style>
