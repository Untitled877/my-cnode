<template>
  <div class="authorInfo">
    <div class="autherSummary">
      <p class="topBar">作者</p>
      <div class="infoWrap">
        <div class="imgWrap">
          <router-link
            :to="{
              name: 'user_info',
              params: {
                name: userInfo.loginname,
              },
            }"
          >
            <img :src="userInfo.avatar_url" alt="" />
          </router-link>
          <router-link
            :to="{
              name: 'user_info',
              params: {
                name: userInfo.loginname,
              },
            }"
          >
            <span>{{ userInfo.loginname }}</span>
          </router-link>
        </div>
        <p>积分：{{ userInfo.score }}</p>
        <p>个性签名</p>
      </div>
    </div>
    <div class="authorTopics">
      <p class="topBar">作者其它话题</p>
      <ul v-if="userInfo.recent_topics">
        <li v-for="list in topicLimit5" class="recentTopic">
          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: list.id,
                name: list.author.loginname,
              },
            }"
          >
            {{ list.title }}
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li class="recentTopic">无</li>
      </ul>
    </div>
    <div class="noReplyTopics">
      <p class="topBar">无人回复的话题</p>
      <ul>
        <li v-for="list in getNoReplyPosts" class="noReplyTopic">
          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: list.id,
                name: list.author.loginname,
              },
            }"
          >
            {{ list.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleSideBar",
  data() {
    return {
      userInfo: {},
      posts:[]
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
    getPostsData(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page:1,
          limit:30
        }
      })
        .then(res=>{
          this.posts = res.data.data;
        })
        .catch(err=>{
          console.log(err);
        })
    },
  },
  computed: {
    topicLimit5() {
      if (this.userInfo.recent_topics) {
        return this.userInfo.recent_topics.splice(0, 5);
      }
    },
    getNoReplyPosts(){
      let noReplyPosts = [];
      for(let i = 0; i < this.posts.length; i++) {
        if(this.posts[i].reply_count === 0) {
          noReplyPosts.push(this.posts[i])
        }
      }
      return noReplyPosts.splice(0,5);
    }
  },
  beforeMount() {
    this.getUserData();
    this.getPostsData();
  },
};
</script>

<style scoped>
li{
  list-style: none;
}
.topBar {
  background: #f6f6f6;
  font-size: 13px;
  padding-left: 7px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
}

.imgWrap {
  display: flex;
  align-items: center;
}
.infoWrap{
  padding:10px;
}
.infoWrap>p{
  font-size: 14px;
  padding-top:5px;
}
img {
  width: 50px;
  border-radius: 3px;
  margin-right: 5px;
}
a {
  text-decoration: none;
  color: #778087;
  font-size: 14px;
}
.infoWrap,.authorTopics,.noReplyTopics{
  background: #FFF;
}
ul li{
  padding:5px;
  font-size: 14px;
}
.recentTopic, .noReplyTopic{
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
}
</style>
