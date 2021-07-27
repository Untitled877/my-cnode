<template>
  <div class="User">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="userInfo">
      <div class="userBaseInfo">
        <p class="topBar">
          <!--        <router-link>-->
          主页 /
          <!--        </router-link>-->
        </p>
        <div class="infoWrap">
          <div class="imgWrap">
            <img :src="userInfo.avatar_url" /><span class="userName">{{
              userInfo.loginname
            }}</span>
          </div>
          <p>{{ userInfo.score }}积分</p>
          <p>{{ this.collections.length }}个话题收藏</p>
          <p><a :href="gitHubAddress">{{ gitHubAddress }}</a></p>
          <p>
            <a :href="gitHubAddress">{{ '@'+ userInfo.githubUsername }}</a>
          </p>
          <div class="loginTime">注册时间 {{ userInfo.create_at | formatDate }}</div>
        </div>
      </div>

      <div class="createTopicList">
        <p class="listBar">最近创建的话题</p>
        <ul>
          <li v-for="recentTopic in userInfo.recent_topics">
            <div class="leftDiv">
              <img :src="recentTopic.author.avatar_url" alt="" />
              <router-link
                :to="{
                  name: 'post_content',
                  params: {
                    id: recentTopic.id,
                    name: recentTopic.author.loginname,
                  },
                }"
              >
                {{ recentTopic.title }}
              </router-link>
            </div>
            <div class="rightDiv">
              <span class="replyAt">{{
                recentTopic.last_reply_at | formatDate
              }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="joinedTopic">
        <p class="listBar">最近参与的话题</p>
        <ul>
          <li v-for="recentReply in userInfo.recent_replies">
            <div class="leftDiv">
              <img :src="recentReply.author.avatar_url" alt="" />
              <router-link
                :to="{
                  name: 'post_content',
                  params: {
                    id: recentReply.id,
                    name: recentReply.author.loginname,
                  },
                }"
              >
                {{ recentReply.title }}
              </router-link>
            </div>
            <div class="rightDiv">
              <span class="replyAt">{{
                recentReply.last_reply_at | formatDate
              }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userInfo: {},
      collections:[]
    };
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then((res) => {
          if (res.data.success === true) {
            this.isLoading = false;
            this.userInfo = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCollections() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`)
        .then((res) => {
          if (res.data.success === true) {
            this.isLoading = false;
            this.collections = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  computed:{
    gitHubAddress(){
      return "https://github.com/" + this.userInfo.githubUsername;
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserData();
    this.getCollections();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
.topBar {
  background: #f6f6f6;
  color: #80bd01;
  margin-top: 15px;
  font-size: 15px;
  padding-left: 7px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.userBaseInfo {
  background: #ffffff;
}
.userBaseInfo img {
  width: 40px;
  border-radius: 3px;
  margin-right: 10px;
}
.imgWrap {
  display: flex;
  align-items: center;
}
.userName {
  font-size: 15px;
}
.infoWrap{
  margin: 10px 0 0 10px;
}
.infoWrap > p{
  margin-top:10px;
  color:#778087;
  font-size: 14px;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
.infoWrap p a{
  color:#778087;
}
.loginTime{
  padding: 20px 0;
  color:#778087;
  font-size: 14px;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
.listBar {
  background: #f6f6f6;
  font-size: 15px;
  padding-left: 7px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.createTopicList {
  margin-top: 15px;
}
.createTopicList img {
  width: 30px;
  border-radius: 3px;
  margin-right: 5px;
}
.joinedTopic {
  margin-top: 15px;
}
.joinedTopic img {
  width: 40px;
  border-radius: 3px;
  margin-right: 5px;
}
li {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 9px;
  border-top: 1px solid #f0f0f0;
}
.leftDiv {
  display: flex;
  align-items: center;
}
.replyAt {
  color: grey;
  margin-right: 10px;
}
a {
  text-decoration: none;
  color: #0088cc;
}
a:hover {
  text-decoration: underline;
  color: #005580;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
