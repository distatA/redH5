<template>
  <div>
    <div class="list" v-if="item">
      <div class="zz" v-if="display == 1">
        <div class="zz-box" style="width: 310px">
          <div class="clos" @click="closeZz">
            <img
              src="../assets/index-img/cha.png"
              style="width: 20px; height: 20px; display: block; margin: 0"
            />
          </div>
          <div class="box-title">我要打赏</div>
          <img
            :src="redheadUrl"
            alt=""
            style="
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin: 10px auto;
              display: block;
            "
          />
          <div class="box-name">{{ rednickName }}</div>
          <div v-if="!otherTrue">
            <div class="box-item">
              <div
                class="box-list"
                v-for="(item, index) in moneyist"
                :key="index"
                @click="pay(item, '1')"
              >
                {{ item }}元
              </div>
            </div>
            <div class="other" @click="other">其他金额</div>
          </div>
          <div v-if="otherTrue">
            <div class="custom">
              <input
                type="number"
                style="text-align: center; width: 78px"
                v-model="moneyValue"
                @keydown="handleInput"
              />
              <div style="color: #914CDF">元</div>
            </div>
            <div class="other" style="margin: 20px 0" @click="back">
              固定金额
            </div>
            <div class="box-foot" @click="pay('', '2')">确定</div>
          </div>
        </div>
      </div>
      <div>
        <div class="top">
          <div class="left">
            <div class="headimg"><img :src="item.headUrl" alt="" /></div>
            <div>
              <div class="nickname">
                <div>{{ item.nickName }}</div>
                <img src="../assets/index-img/huiyuan.png" alt="" />
              </div>
              <div class="time">{{ item.create_time }}</div>
            </div>
          </div>
          <div class="right">
             <img
              src="../assets/index-img/shang.png"
              alt=""
              @click="daShang(item.id, item.nickName, item.headUrl)"
            />
            <!-- <div class="people">
                <div class="browseImgItem">
                    <div class="houseIteam" >
                        <div class="browseImgView" hover-class="none" hover-stop-propagation="false">
                            <img src="" alt="" class="browseImg">
                        </div>
                    </div>           
                </div>
                <view class="left">520人打赏</view>
            </div> -->
          </div>
        </div>
        <div @click="jump(item.id)">
          <div class="title">
            <div class="biaoti">{{ item.subtitle }}</div>
          </div>
          <div class="main">
            <div class="image">
              <!-- <img src="../assets/index-img/5g.png" alt="" /> -->
               <img :src="item.memberNoteArticleImageList[0].imageUrl"  style="border-radius:5px;" />
              <img src="../assets/index-img/pay.png" alt="" class="pay" />
              <div class="titles">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div
          class="bottom"
        >
          <!-- <div class="left"><img src="../assets/index-img/share.png" alt=""><div>分享</div></div> -->
          <div class="right" @click="clickZan(item.id)">
            <img src="../assets/index-img/isview.png" alt="" />
          </div>
          <div class="yinBox" v-if="item.isView">
            <div class="left" @click="jump(item.id)">
              <img src="../assets/index-img/com.png" alt="" />
              <div class="right">评论</div>
            </div>
            <div class="xian"></div>
            <div
              class="left"
              @click="zan(item.id, item.member_no, item.flag, index)"
            >
              <img
                src="../assets/index-img/iszan.png"
                alt=""
                style="width: 14px; height: 13px"
              />
              <div class="right" v-if="item.flag == 0">喜欢</div>
              <div class="right" v-if="item.flag == 1">取消</div>
            </div>
          </div>
        </div>
        <!-- 点赞、评论 -->
        <div
          class="box"
          v-if="
            item.nickNames.length > 0 ||
            item.memberNoteAndArticleComments.length > 0
          "
        >
          <div class="zan" v-if="item.nickNames.length > 0">
            <div class="left">
              <img src="../assets/index-img/zan.png" alt="" />
            </div>
            <div class="name" v-for="(its, ids) in item.nickNames" :key="ids">
              {{ its }}
            </div>
          </div>
          <div
            class="comment"
            v-if="item.memberNoteAndArticleComments.length > 0"
          >
            <div class="left">
              <img src="../assets/index-img/comment.png" alt="" />
            </div>
            <div>
              <div
                class="right"
                v-for="(its, ids) in item.memberNoteAndArticleComments"
                :key="ids"
              >
                <div class="name">{{ its.nick_name }}：</div>
                <div class="pinglun">{{ its.context }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
export default {
  props: {
    item: {},
  },
  data() {
    return {
      isZan: false,
       moneyValue: "",
      display: 2, //打赏弹窗
      otherTrue: false, //是否自定义打赏金额
      pid: "", //文章id
      redheadUrl: "",
      rednickName: "",
      moneyist: [0.01, 6.66, 18.88, 66.66, 100, 1.88]
    };
  },
  created() {
    // console.log(this.item);
  },
  methods: {
    // 展示点赞
    clickZan() {
      this.item.isView = !this.item.isView;
    },
    // 点赞
    async zan(id, member, flag) {
      let params = {
        like_type: 1, //1-笔记  2-文章  3-评论 4-抓取的文章 5-快讯 6-后台发布的快讯 7-后台发布的笔记
        like_id: id,
        member_no: this.$api.member_no,
      };
      const result = await this.$api.kuaixun.getZan(params);
      console.log(result);
      if (result.code == 200) {
        if (flag == 0) {
          this.$toast.center("点赞成功");
        } else {
          this.$toast.center("取消点赞");
        }
        // this.getList()
        this.item.isView = !this.item.isView;
        this.$emit("event1", this.isShuaxin);
      } else if (result.code == 500 && !this.$api.member_no) {
        this.$toast.center("未登录");
        this.$router.push("/login");
      }
    },
    // 进去快讯详情
    jump(id) {
      this.$router.push({ path: "/kuaixun", query: { id: id } });
    },
     //打赏
    daShang(id, name, head) {
      this.display = 1;
      this.rednickName = name;
      this.redheadUrl = head;
      this.pid = id;
    },
    //关闭弹窗
    closeZz() {
      this.display = 2;
      this.otherTrue = false;
    },
    //自定义金额
    other() {
      this.otherTrue = true;
    },
    //固定金额
    back() {
      this.otherTrue = false;
    },
         //支付
    async pay(id, type) {
      console.log(id, type);
      const params = {
        type: 2, //1给红人打赏 2给笔记打赏
        article_id: this.pid,
        price: type == 1 ? id : this.moneyValue, //金额
        reward_member_no: this.$api.member_no, //我的
        member_no_other: "", //红人的
      };
      const result = await this.$api.shang.getShang(params);
      console.log(result);
      if (result.code == 200) {
        window.location.href = result.data.wxPayMpOrderResult.mwebUrl
      }
    },
  },
};
</script>

<style scoped lang='less'>
.list {
  padding: 5px 20px 10px 20px;
  box-sizing: border-box;
  margin-top: 15px;
  border-bottom: 5px solid #f9f9f9;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .headimg {
        margin-right: 12px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #abcdef;
        }
      }
      .nickname {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        img {
          width: 14px;
          height: 13px;
          margin-left: 3px;
        }
      }
      .time {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(174, 174, 174, 1);
        margin-top: 3px;
        text-align: left;
      }
    }
    .right {
      /* 打赏人数 */
      .people {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #484848;
          text-align: center;
        }
        .browseImgItem {
          display: flex;
          margin-left: 26px;
        }
        .browseImg {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
        .browseImgView {
          border-radius: 50%;
          width: 26px;
          height: 26px;
          border: 1px solid #fff;
          box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.2);
          margin-left: -10px;
        }
      }

      img {
        width: 26px;
        height: 26px;
      }
    }
  }
  .title {
    margin: 10px 0;
    display: flex;
    align-items: baseline;
    .kuaixun {
      width: 40px;
      height: 14px;
    }
    .biaoti {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 550;
      color: rgba(0, 0, 0, 1);
      line-height: 25px;
      text-align: left;
    }
  }
  .main {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(100, 99, 99, 1);
    line-height: 25px;
    text-align: left;
    .image {
      position: relative;
      border-radius: 5px;
      img {
        width: 100%;
        height: 175px;
        border-radius: 5px;
      }
      .pay {
        width: 50px;
        height: 25px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .titles {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: rgba(95, 95, 95, 0.59);
        border-radius: 0px 0px 5px 5px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        padding-left: 5px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    margin-top: 10px;

    position: relative;
    .left {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #914CDF;
      margin-right: 13px;
      img {
        width: 12px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .right img {
      width: 35px;
      height: 20px;
    }
    .yinBox {
      position: absolute;
      top: -7px;
      right: 43px;
      background: rgba(104, 104, 104, 1);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 9px 13px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 15px;
          height: 15px;
        }
        .right {
          margin-left: 3px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #fff;
        }
      }
      .xian {
        width: 1px;
        height: 18px;
        background: #979797;
        margin: 0 15px;
      }
    }
  }
  .box {
    margin-top: 10px;
    padding: 7px 5px 12px 4px;
    box-sizing: border-box;
    background: #f6f6f6;
    .zan {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-bottom: 5px;
      .left {
        img {
          width: 12px;
          height: 11px;
          margin-right: 5px;
        }
      }
      .name {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #914CDF;
        line-height: 18px;
      }
    }
    .comment {
      display: flex;
      // flex-wrap: wrap;
      align-items: baseline;
      img {
        width: 12px;
        height: 12px;
        margin-right: 5px;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .name {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #914CDF;
          line-height: 18px;
        }
        .pinglun {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #5e5e5e;
          line-height: 18px;
        }
      }
    }
  }
}
 /* 弹框 */
  .zz {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    /* background: #fff; */
    z-index: 999;
    display: flex;
    align-items: center;
  }
  .zz-box {
    width: 280px;
    /* height:100%; */
    background: rgba(255, 255, 255, 1);

    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    position: absolute;
    /* padding:0 10px; */
    box-sizing: border-box;
  }

  .zz.no {
    display: none;
  }
  .zz-box .clos {
    position: absolute;
    top: 10px;
    right: 14px;
    width: 20px;
    height: 20px;
  }
  .box-title {
    font-size: 22px;
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 550;
    color: #fff;
    margin-bottom: 18px;
    margin-top: -1px;
    background: url(https://firsthouse.oss-cn-shanghai.aliyuncs.com/blog/2020-03-09/afd930f746c64006b15172ac5e835711-tmp_a843e621c02d32a920ec55a5cc22a402.jpg)
      center/100%;
    background-repeat: no-repeat;
    height: 100px;
    line-height: 100px;
    border-radius: 12px 12px 0 0;
  }
  .box-name {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #484848;
    text-align: center;
    margin-top: 15px;
  }
  .box-item {
    padding: 22px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .box-list {
    width: 80px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #914CDF;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #914CDF;
    margin-bottom: 24px;
  }
  .other {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 550;
    color: rgba(0, 122, 255, 1);
    text-align: center;
    padding-bottom: 40px;
  }
  .box-foot {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
    background: linear-gradient(to right, #914CDF, #914CDF);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border-radius: 5px;
  }
  .custom {
    width: 128px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    border: 1px solid #914CDF;
    display: flex;
    align-items: center;
    margin: 10px auto;
    margin-top: 10px;
    padding: 0 16px;
    box-sizing: border-box;
  }
</style>