<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <!-- <van-notice-bar mode="closeable" left-icon="volume-o">如需操作请前往app进行操作</van-notice-bar> -->
    <!-- <div class="footer">
        <div class="leftImg">
            <van-icon name="phone-o" size="30px" />
        </div>
        <div class="rightMessage"><span>{{noteDetails.nickName }}</span><span>{{noteDetails.mobile }}</span> </div>
    </div> -->
    <div class="list">
      <div class="top">
        <div class="left">
          <div class="headimg">
            <img :src="noteDetails.headUrl" alt />
          </div>
          <div>
            <div class="nickname">
              <div>{{ noteDetails.nickName }}</div>
              <img
                src="../assets/index-img/huiyuan.png"
                style="margin-left: 3px"
                alt
              />
            </div>
            <div class="time">{{ noteDetails.create_time }}</div>
          </div>
        </div>
        <div class="right">
          <!-- <img src="../assets/index-img/shang.png" alt=""> -->
          <!-- <div class="people">
                <div class="browseImgItem">
                    <div class="houseIteam" >
                        <div class="browseImgView" hover-class="none" hover-stop-propagation="false">
                            <img src="" alt="" class="browseImg">
                        </div>
                    </div>           
                </div>
                <view class="left">520人打赏</view>
          </div>-->
          <img
            :src="isCollect ? collectFoucs : collectNoraml"
            style="width: 20px; height: 17px"
            @click="collect"
            alt=""
          />
        </div>
      </div>
      <div class="title">
        <div class="kuaixun">
          <img src="../assets/index-img/kuaixun.png" alt />
        </div>
        <div class="biaoti">{{ noteDetails.title }}</div>
      </div>
      <div class="main">
        <div v-html="noteDetails.content"></div>
        <div class="imgs">
          <div v-if="noteDetails.images">
            <!-- 一张图 -->
            <div v-if="noteDetails.images.length == 1">
              <img
                :src="its"
                :id="its"
                alt
                v-for="(its, index) in noteDetails.images"
                :key="index"
                style="width: 108px; height: 108px"
                @click="bigImg(its)"
              />
            </div>
            <!-- 多张图 -->
            <div v-if="noteDetails.images.length > 1">
              <viewer>
                <img
                  :src="its"
                  :id="its"
                  alt
                  v-for="(its, index) in noteDetails.images"
                  :key="index"
                  style="width: 108px; height: 108px"
                  @click="bigImg(its)"
                />
              </viewer>
            </div>
          </div>
          <video
            :src="noteDetails.videoUrls"
            controls
            style="width: 100%; height: 225px"
            v-if="noteDetails.videoUrls"
          ></video>
        </div>
      </div>

      <!-- 付费阅读 -->
      <div class="main" v-if="noteDetails.type == 3">
        <div
          class="money"
          v-if="
            noteDetails.is_fee == 1 &&
            noteDetails.isPay == 0 &&
            authorMember != mymember_no
          "
          @click="fuqian"
        >
          <div>点击付费￥{{ noteDetails.fee_money }}，阅读全文</div>
          <img src="../assets/index-img/xias.png" alt />
        </div>
        <div
          v-html="noteDetails.content"
          v-if="noteDetails.isPay == 1 || authorMember == mymember_no"
        ></div>
      </div>
      <!-- 投票 -->
      <div class="vote" v-if="memberArtVote.title">
        <div class="vote-top">
          <div style="margin-right: 4px">|</div>
          投票
        </div>
        <div class="vote-title">{{ memberArtVote.title }}</div>
        <!-- 文字 -->
        <template v-if="memberArtVote.type == 1">
          <!-- 未开始 -->
          <template v-if="memberArtVote.isVote == 0">
            <div
              class="vote-list"
              v-for="(item, index) in memberArtVote.list"
              :key="index"
              @click="onclicks1"
            >
              <div class="left">{{ item.title }}</div>
              <div class="right" v-if="item.checked">{{ item.num }}</div>
            </div>
          </template>
          <!-- 进行中 -->
          <template v-if="memberArtVote.isVote == 1">
            <div
              class="vote-list"
              v-for="(it, index) in memberArtVote.list"
              :key="index"
              @click="onclicks(it.id, it.target, it.chose, memberArtVote.list)"
              :style="{ padding: it.checked == 0 ? '0 15px' : '0px' }"
            >
              <template v-if="it.checked">
                <div
                  class="left"
                  :style="{
                    background: it.target == 1 ? '#914CDF' : '#E7E7E8',
                  }"
                  style="padding: 0 5px"
                >
                  {{ it.title }}
                </div>
              </template>
              <template v-if="!it.checked">
                <div class="left">{{ it.title }}</div>
              </template>
              <div
                class="right"
                v-if="it.checked"
                :style="{ color: it.target == 1 ? '#914CDF' : '' }"
              >
                {{ it.num }}
              </div>
            </div>
          </template>
          <!-- 已结束 -->
          <template v-if="memberArtVote.isVote == 2">
            <div
              class="vote-list"
              v-for="(item, index) in memberArtVote.list"
              :key="index"
              @click="onclickss"
              style="padding: 0; box-sizing: border-box"
            >
              <div
                class="left"
                style="background-color: #e7e7e8; padding: 0 5px"
              >
                {{ item.title }}
              </div>
              <div class="right">{{ item.num }}</div>
            </div>
          </template>
        </template>
        <!-- 图片 -->
        <template v-if="memberArtVote.type == 2">
          <div class="voteImg">
            <!-- 未开始 -->
            <template v-if="memberArtVote.isVote == 0">
              <div
                class="img-item"
                v-for="(item, index) in memberArtVote.list"
                :key="index"
              >
                <div class="img-items">
                  <img :src="item.image" alt />
                  <div class="voteBox">《{{ item.title }}》</div>
                </div>
                <div class="vote-piao" @click="onclicks1">投票</div>
              </div>
            </template>
            <!-- 进行中 -->
            <template v-if="memberArtVote.isVote == 1">
              <div
                class="img-item"
                v-for="(it, index) in memberArtVote.list"
                :key="index"
              >
                <div class="img-items">
                  <img :src="it.image" alt />
                  <div class="voteBox">《{{ it.title }}》</div>
                </div>
                <div
                  class="vote-piao"
                  @click="
                    onclicks(
                      it.id,
                      it.target,
                      it.chose,
                      memberArtVote.id,
                      memberArtVote.list
                    )
                  "
                >
                  投票
                </div>
              </div>
            </template>
            <!-- 已结束 -->
            <template v-if="memberArtVote.isVote == 2">
              <div
                class="img-item"
                v-for="(item, index) in memberArtVote.list"
                :key="index"
              >
                <div class="img-items">
                  <img :src="item.image" alt />
                  <div class="voteBox">《{{ item.title }}》</div>
                </div>
                <div class="vote-piao" @click="onclickss">投票</div>
              </div>
            </template>
          </div>
          <div
            class="vote-tiao"
            v-if="
              memberArtVote.list[0].checked || memberArtVote.list[1].checked
            "
          >
            <div
              class="tiao-left"
              style="
                width: memberArtVote.list[0].num/(
                    memberArtVote.list[0].num + memberArtVote.list[1].num
                  ) * 100%;
              "
              v-if="memberArtVote.list[0].num != 0"
            >
              {{ memberArtVote.list[0].num }}
            </div>
            <div
              class="tiao-right"
              style="
                width: memberArtVote.list[1].num/(
                    memberArtVote.list[0].num + memberArtVote.list[1].num
                  ) * 100%;
              "
              v-if="memberArtVote.list[1].num != 0"
            >
              {{ memberArtVote.list[1].num }}
            </div>
          </div>
        </template>
        <div class="vote-time">
          {{ voteNum }}人参与
          <div style="margin-left: 15px">{{ memberArtVote.voteText }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="left left1">
          <img src="../assets/index-img/comment.png" alt />
          <div>{{ noteDetails.comment_num }}</div>
        </div>
        <div
          class="left left2"
          @click="zan(noteDetails.pid, noteDetails.dznum, noteDetails.type)"
        >
          <img
            src="../assets/index-img/zan.png"
            alt
            style="width: 12px; height: 11px"
            v-if="noteDetails.dznum == 0"
          />
          <img
            src="../assets/index-img/zans.png"
            alt
            v-if="noteDetails.dznum == 1"
          />
          <div>{{ noteDetails.like_num }}</div>
        </div>
        <div class="left">
          <!-- <img src="../assets/index-img/share.png" alt=""><div>分享</div> -->
        </div>
      </div>
      <!-- 、评论 -->
      <div class="box">
        <!-- 发送新评论 -->
        <div class="sent">
          <div class="headimg">
            <img :src="headUrl" alt />
          </div>
          <div class="right">
            <input
              type="text"
              placeholder="说点什么，留下你的足迹。"
              v-model="value"
            />
            <img src="../assets/index-img/sent.png" alt @click="submit(0)" />
          </div>
        </div>
        <!-- 回复 -->
        <div class="foot" v-show="isreply">
          <input type="text" placeholder="回复你的内容" v-model="value2" />
          <img src="../assets/index-img/sent.png" alt @click="submit(1)" />
        </div>
        <!-- 评论列表 -->
        <template v-show="commentList.length > 0">
          <div
            class="message"
            v-for="(item, index) in commentList"
            :key="index"
          >
            <div class="head">
              <img :src="item.head_url" alt />
            </div>
            <div class="right">
              <div class="top">
                <div class="nickName">{{ item.nick_name }}</div>
                <div
                  style="display: flex; align-items: center"
                  @click="zan1(item.id, item.flag)"
                >
                  <img
                    src="../assets/index-img/zan.png"
                    alt
                    v-show="item.flag == 0"
                    style="width: 12px; height: 11px"
                  />
                  <img
                    src="../assets/index-img/zans.png"
                    alt
                    v-show="item.flag == 1"
                  />
                  <div class="num">{{ item.like_num }}</div>
                </div>
              </div>
              <div class="text">{{ item.context }}</div>
              <div class="bos">
                <div class="time">{{ item.create_time }}</div>
                <div class="reply" @click="reply(item.id)">回复</div>
              </div>
              <div v-for="(its, ids) in item.memberCommentVoList" :key="ids">
                <!-- 作者回复 -->
                <div class="author">
                  <div class="tops">
                    <template v-if="its.member_no == noteDetails.member_no">
                      <div class="left"></div>
                      <div style="margin-left: 8px">作者</div>
                    </template>
                    <template v-if="its.member_no != noteDetails.member_no">
                      <img :src="item.head_url" alt />
                      <div class="name">{{ item.nick_name }}</div>
                    </template>
                  </div>
                  <div class="text">{{ its.context }}</div>
                  <div class="time">{{ its.create_time }}</div>
                </div>
                <!-- 不是作者 -->
                <!-- <div class="author">
                        
                        <div class="tops">
                            <img :src="item.head_url" alt=""><div class="name">{{item.nick_name}}</div>
                        </div> 
                        <div class="text">{{item.context}}</div>
                        <div class="time">{{item.create_time}}</div>
                       
                </div>-->
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import apiData from "@/api/apiData";
import { Dialog, Toast } from "vant";
import wx from "@/plugins/share";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
import TabberTop from "@/components/TabberTop";

export default {
  data() {
    return {
      title: "快讯详情",
      noteId: "",
      rewardList: [],
      noteDetails: "",
      memberArtVote: [],
      voteNum: 0,
      tempUrl: "",
      artPayVOS: [],
      isreply: false,
      value: "",
      value2: "",
      nickName: apiData.nickName,
      headUrl: apiData.headUrl,
      commentList: [],
      pid: "",
      mymember_no: this.$api.member_no,
      authorMember: "", //坐着的
      isCollect: false, //是否点赞
      collectNoraml: require("../assets/images/collectNoraml.png"),
      collectFoucs: require("../assets/images/collectFoucs.png"),
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    TabberTop,
  },
  created() {},
  mounted() {
    this.noteId = this.$route.query.id;
    this.getDetail(); //详情
    this.getComList(); //评论列表
  },
  methods: {
    // 收藏
    async collect() {
      this.isCollect = !this.isCollect;
      let params = {
        collect_id: this.noteDetails.pid,
        collect_type: 2,
        member_no: apiData.member_no,
      };
      const result = await apiData.collect.myCollect(params);
      if (result.code === 200) {
        Toast.success("操作成功");
      }
    },
    //付费
    fuqian() {},
    //详情
    async getDetail() {
      const params = {
        id: this.$route.query.id,
        member_no: apiData.member_no, //apiData.member_no
      };
      const result = await apiData.kuaixun.getDetail(params);
      if (result.code == 200) {
        var newArr = result.data.memberArtVote ? result.data.memberArtVote : [];
        let now = parseInt(new Date().getTime()); //当前时间戳
        // 投票
        if (newArr && newArr.start_at) {
          let start = new Date(newArr.start_at.replace(/\-/g, "/")).getTime();
          let end = new Date(newArr.end_at.replace(/\-/g, "/")).getTime();

          if (now < start) {
            var isVote = 0;
            var voteText = "投票尚未开始";
          } else if (start < now && now < end) {
            console.log(Math.floor((end - now) / 1000 / 3600));
            var isVote = 1;
            var voteText =
              "还有" +
              Math.floor(((end - now) / 1000 / 3600) % 24) +
              "小时结束";
          } else if (end < now) {
            var isVote = 2;
            var voteText = "投票已结束";
          }
          newArr.isVote = isVote;
          newArr.voteText = voteText;
          // 判断用户是否点过
          for (let j = 0; j < newArr.list.length; j++) {
            let list = newArr.list;
            let arr = list.every(function (value) {
              return value.target == 0;
            });
            if (arr) {
              newArr.list[j].checked = false; //未投票
              newArr.list[j].chose = newArr.chose; //1单选 2多选
            } else {
              newArr.list[j].checked = true; //已投票
              newArr.list[j].chose = newArr.chose; //1单选 2多选
            }
          }
        }
        this.rewardList = result.data.rewardList; //打赏
        this.noteDetails = result.data.noteVO;
        this.noteDetails.content = this.noteDetails.content.replace(
          /<img /g,
          '<img style="width:100%;height:100%;'
        );
        result.data.noteVO.collecNum === 0
          ? (this.isCollect = false)
          : (this.isCollect = true);
        let times = new Date(
          this.noteDetails.create_time.replace(/-/g, "/")
        ).getTime();
        try {
          this.noteDetails.create_time = this.myTime(times + 28800000);
        } catch (error) {}
        (this.memberArtVote = newArr), //投票
          (this.voteNum = result.data.voteNum ? result.data.voteNum : 0),
          (this.tempUrl = result.data.noteVO.tempUrl
            ? result.data.noteVO.tempUrl
            : ""),
          (this.artPayVOS = result.data.artPayVOS); //付费
        this.authorMember = result.data.noteVO.member_no;
      }
    },
    // 点击图片
    bigImg(item) {
      Viewer.setDefaults({
        Options: {
          inline: true,
          button: true,
          navbar: true,
          title: true,
          toolbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          transition: true,
          fullscreen: false,
          keyboard: true,
          url: "data-source",
        },
      });
    },
    // 发布新评论
    async submit(id) {
      if (this.value.trim() === "" && id === 0) {
        this.$toast.center("请输入内容");
      } else if (this.value2.trim() === "" && id === 1) {
        this.$toast.center("请输入内容");
      } else {
        const params = {
          pid: id == 0 ? id : this.pid,
          context: id == 0 ? this.value : this.value2,
          member_no: apiData.member_no,
          article_id: this.$route.query.id,
          nick_name: apiData.nickName,
          head_url: apiData.headUrl,
        };
        const result = await apiData.kuaixun.getComment(params);
        if (result.code == 200) {
          this.$toast.center(result.data);
          if (id == 0) {
            this.value = "";
          } else {
            this.value = "";
            this.isreply = !this.isreply;
          }
          this.getComList(); //评论列表
        }
      }
      // console.log(this.value);
      // console.log(id);
      //   if (id == 0 ? !this.value : !this.value2) {
      //     console.log(this.value);
      //     this.$toast.center("请输入内容");
      //     return false;
      //   }
      // this.$toast.center("请前往app评论");
    },
    //回复弹窗
    reply(id) {
      this.pid = id;
      this.isreply = !this.isreply;
    },
    //点赞文章
    async zan(id, flag, type) {
      const params = {
        like_type: type, //1-笔记  2-文章  5-评论
        like_id: id,
        member_no: apiData.member_no,
      };
      const result = await apiData.kuaixun.getZan(params);
      console.log(result);
      if (result.code == 200) {
        if (flag == 0) {
          this.$toast.center("点赞成功");
        } else {
          this.$toast.center("取消点赞");
        }
        this.getDetail(); //刷新接口
      }
    },
    //点赞评论
    async zan1(id, flag) {
      const params = {
        like_type: 6,
        like_id: id,
        member_no: apiData.member_no,
      };
      const result = await apiData.kuaixun.getZan(params);
      console.log(result);
      if (result.code == 200) {
        if (flag == 0) {
          this.$toast.center("点赞成功");
        } else {
          this.$toast.center("取消点赞");
        }
        this.getComList(); //刷新接口
      }
    },
    //评论列表
    async getComList() {
      const params = {
        article_id: this.$route.query.id,
        //DA2885905007477B9813B3F8F4108495
        member_no: apiData.member_no, //apiData.member_no
      };
      const data = await apiData.kuaixun.getComList(params);
      if (data.code == 200 && data.data) {
        console.log(data);
        this.commentList = data.data;
      } else {
        this.commentList = [];
      }
    },
    onclicks(id, target, chose, item) {
      var checkedArr = [];
      for (let i = 0; i < item.length; i++) {
        if (item[i].checked) {
          checkedArr.push(item[i].checked);
        }
      }
      if (target == 0) {
        //投票
        const params = {
          id: id,
          art_id: this.$route.query.id,
          memberNo: apiData.member_no,
        };
        if (chose == 2) {
          //多选
          const result = apiData.vote.getVote(params);
          this.getDetail(); //刷新接口
        } else {
          //单选
          if (checkedArr.length == 0) {
            const result = apiData.vote.getVote(params);
            this.getDetail(); //刷新接口
          } else {
            this.$toast.center("单选不可修改");
          }
        }
      } else {
        //取消投票
        const params = {
          id: id,
          memberNo: apiData.member_no,
        };
        Dialog.confirm({
          title: "",
          message: "您确定要取消投票吗?",
        })
          .then(() => {
            // on confirm
            const result = apiData.vote.getDelVote(params);
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    onclicks1() {
      this.$toast.center("投票时间尚未开始");
    },
    onclickss() {
      this.$toast.center("投票时间已过期");
    },
    // 点击图片
    bigImg(item) {
      Viewer.setDefaults({
        Options: {
          inline: true,
          button: true,
          navbar: true,
          title: true,
          toolbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          transition: true,
          fullscreen: false,
          keyboard: true,
          url: "data-source",
        },
      });
    },
  },
};
</script>

<style scoped lang='less'>
.center() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 5px;
  padding-top: 5px;
  color: #757575;
  border-top: 0.5px solid #e0e0e0;
  left: 0;
  height: 30px;
  background-color: #ffffff;
  display: flex;
  .leftImg {
    .center();
    width: 60px;
    align-items: flex-start;
    border-right: 1px solid #ccc;
  }
  .rightMessage {
    flex: 1;
    .center();
    font-size: 21px;
    justify-content: space-evenly;
  }
}
.list {
  padding: 5px 20px;
  box-sizing: border-box;
  margin-top: 15px;
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
      img {
        width: 100%;
        height: 100%;
      }
    }
    .biaoti {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 550;
      color: rgba(0, 0, 0, 1);
      line-height: 25px;
      text-align: left;
      margin-left: 10px;
    }
  }
  .main {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: rgba(100, 99, 99, 1);
    line-height: 25px;
    text-align: left;
    margin-top: 10px;
    .imgs {
      display: flex;
      img {
        margin-right: 5px;
        margin-bottom: 7px;
      }
      img:nth-child(3) {
        margin-right: 0;
      }
      img:nth-child(6) {
        margin-right: 0;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-top: 16px;
    .left {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #914cdf;
      margin-right: 13px;
      img {
        width: 12px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .left1 {
      color: #646363;
      img {
        width: 12px;
        height: 12px;
        margin-right: 5px;
      }
    }
    .left2 {
      color: #646363;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }
  .box {
    margin-top: 18px;
    .sent {
      display: flex;
      align-items: center;
      .headimg img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .right {
        width: 282px;
        height: 30px;
        background: #f2f2f2;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 15px;
        box-sizing: border-box;
        margin-left: 13px;
        input {
          background: #f2f2f2;
          width: 180px;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .message {
      margin-top: 30px;
      display: flex;
      // justify-content: space-between;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 17px;
      .head img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .right {
        margin-left: 10px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nickName {
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: 520;
            color: rgba(0, 0, 0, 1);
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img {
            width: 14px;
            height: 14px;
          }
          .num {
            color: #914cdf;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .text {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #484848;
          margin-top: 10px;
          margin-bottom: 15px;
        }
        .bos {
          display: flex;
          justify-content: space-between;
          align-content: center;
          .time {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #484848;
            line-height: 17px;
          }
          .reply {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #484848;
          }
        }
        /* 作者回复 */
        .author .left {
          font-size: 15px;
          width: 2px;
          height: 17px;
          background: linear-gradient(to bottom, #ff5653, #ff8654);
        }
        .author .tops {
          display: flex;
          align-items: center;
          margin-top: 14px;
          margin-bottom: 6px;
        }
        .tops img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .author .name {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-left: 9px;
        }
        .author .text {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(132, 132, 132, 1);
        }
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 10px;
    left: 30px;
    width: 282px;
    height: 30px;
    background: #f2f2f2;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 15px;
    box-sizing: border-box;
    margin-left: 13px;
    input {
      background: #f2f2f2;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  /* 投票 */
  .vote {
    margin-top: 10px;
    padding: 7px 10px;
    background: rgba(197, 197, 197, 0.14);
    border-radius: 2px;
  }
  .vote-top {
    display: flex;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #914cdf;
    padding-bottom: 4px;
  }
  .vote-title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(94, 94, 94, 1);
    margin-top: 5px;
  }
  .vote-list {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    width: 100%;
    margin-top: 5px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(237, 237, 237, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .vote-list .left {
    width: 90%;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vote-list .right {
    width: 10%;
    text-align: center;
  }
  .vote-time {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(94, 94, 94, 1);
    margin-top: 5px;
  }
  /* 图片 */
  .voteImg {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
  .img-items {
    width: 155px;
    height: 120px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .voteBox {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(95, 95, 95, 0.59);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vote-piao {
    width: 60px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #914cdf;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #914cdf;
    margin: 0 auto;
    margin-top: 12px;
  }
  /* .vote-piao:nth-child(2){
    border:1px solid #6ED400;
    color:#6ED400;
    } */
  .vote-tiao {
    width: 100%;
    height: 28px;
    background: #e7e7e8;
    border-radius: 4px;
    display: flex;
  }
  .tiao-left {
    width: 50%;
    height: 28px;
    line-height: 28px;
    background: rgba(255, 232, 229, 1);
    border-radius: 4px 0px 0px 4px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #914cdf;
    text-align: left;
    padding-left: 5px;
  }
  .tiao-right {
    width: 50%;
    background: rgba(110, 212, 0, 0.3);
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 170, 0, 1);
    text-align: right;
    padding-right: 5px;
  }
  .money {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 550;
    color: #914cdf;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 12px;
      height: 8px;
      margin-left: 3px;
    }
  }
}
.my_img {
  width: 100vw !important;
  height: 300px !important;
}
</style>