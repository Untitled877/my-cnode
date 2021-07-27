<template>
<div class="article">
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif">
  </div>
  <div v-else>
    <div class="topicHeader">
      <div class="topicTitle">{{post.title}}</div>
      <ul>
        <li>• 发布于{{post.create_at | formatDate}}</li>
        <li>• 作者{{post.author.loginname}}</li>
        <li>• {{post.visit_count}}次浏览</li>
        <li>• 来自{{post | tabFormat}}</li>
      </ul>
      <div v-html="post.content" class="topicContent"></div>
    </div>
    <div class="replyBody" v-if="post.replies.length>0">
      <div class="topBar">{{post.replies.length}} 回复</div>
      <div class="replyList" v-for="(reply,index) in post.replies">
        <div class="userWrap">
          <div class="leftWrap">
            <router-link :to="{
            name:'user_info',
            params:{
              name:reply.author.loginname,
            }
          }">
              <img :src="reply.author.avatar_url" class="userImg">
            </router-link>
            <router-link :to="{
            name:'user_info',
            params:{
              name:reply.author.loginname,
            }
          }">
              <span class="userName">{{reply.author.loginname}}</span>
            </router-link>
            <span class="replyTime">{{index+1}}楼•{{reply.create_at | formatDate}}</span>
          </div>
          <div class="rightWrap">
            <span v-if="reply.ups.length>0">
          ☝{{reply.ups.length}}
          </span>
            <span v-else></span>
          </div>
        </div>
        <p v-html="reply.content" class="replyContent"></p>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "Article",
  data(){
    return {
      isLoading:false,
      post:[],  // 当前文章页的所有内容、属性
    }
  },
  methods:{
    getArticleData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res=>{
          if(res.data.success === true) {
            this.isLoading = false;
            this.post = res.data.data;
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  // 检测路由是否发生变化
  watch:{
    '$route'(to, from) {
      this.getArticleData()
    }
  }
}
</script>

<style>
@import url('../assets/github-markdown.css');

.article {
  margin-bottom:20px;
}
.topicHeader {
  padding:10px;
  background: white;
  margin-top:15px;
}

.topicTitle{
  font-size: 20px;
  font-weight: bold;
  padding-top:10px;
  padding-bottom: 10px;
}
.topicHeader>ul{
  list-style: none;
  padding:0;
  margin:6px 0;
}
.topicHeader>ul>li{
  display: inline-block;
  font-size: 12px;
  color:#838383;
}
.topicContent {
  border-top:1px solid #e5e5e5;
  padding:10px 20px;
}
.markdown-text img{
  width: 75% !important;
}
.replyBody{
  margin-top: 15px;
  background: white;
}
.topBar{
  background: #F6F6F6;
  font-size: 13px;
  padding-left:10px;
  padding-top:10px;
  padding-bottom: 10px;
}
.replyBody img{
  width:30px;
  border-radius: 3px;
  margin-top:5px;
  margin-right: 10px;
}
.replyBody a{
  text-decoration: none;
}
.replyList{
  border-bottom: 1px solid #e5e5e5;
}

.userName{
  font-size: 12px;
  color:#666;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  margin-right: 5px;
}
.replyTime{
  font-size: 12px;
  color:#0088cc;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
.userWrap{
  display: flex;
  justify-content: space-between;
}
.leftWrap{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.rightWrap{
  margin-right: 10px;
  margin-top: 10px;
}
.replyContent {
  margin: 0 10px 10px 50px;
}
.loading{
  text-align: center;
  padding-top: 300px;
}

</style>
