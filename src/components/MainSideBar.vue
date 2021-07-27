<template>
<div class="sider">
  <div class="loginPart">
    <p class="title">CNode: Node.js专业中文社区</p>
    <p class="marked">您可以 <a href="#">登录</a> 或 <a href="#">注册</a>，也可以</p>
    <button class="gitHubBtn">通过 GitHub 登录</button>
  </div>
  <div class="noReplyLists">
    <p class="topBar">无人回复的话题</p>
    <ul>
      <li v-for="list in getNoReplyPosts" class="noReplyList">
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
  <div class="scoreTab">
    <p class="topBar">积分榜 TOP 100 >></p>
    <ul>
      <li>未实现</li>
    </ul>
  </div>
  <div class="social">
    <p class="topBar">友情社区</p>
    <a href="https://ruby-china.org/" target="_blank">
      <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png">
    </a>
    <a href="http://golangtc.com/" target="_blank">
      <img src="//static2.cnodejs.org/public/images/golangtc-logo.png">
    </a>
    <a href="http://phphub.org/" target="_blank">
      <img src="//static2.cnodejs.org/public/images/phphub-logo.png">
    </a>
  </div>
  <div class="client">
    <p class="topBar">客户端二维码</p>
    <div class="QRCode">
      <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU">
      <p><a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "MainSideBar",
  data() {
    return {
      posts:[]
    }
  },
  methods:{
    getData(){
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
  computed:{
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
    this.getData();
  }
}
</script>

<style scoped>
ul{
  list-style: none;
}
.loginPart a, .noReplyLists a{
  text-decoration: none;
  color: #778087;
  font-size: 14px;
}
.client a {
  text-decoration: none;
  color: #778087;
  font-size: 13px;
}

.loginPart a:hover,.client a:hover{
  text-decoration: underline;
}

.sider{
  margin-top:15px;
}
.topBar {
  background: #f6f6f6;
  font-size: 13px;
  padding-left: 7px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
}
.loginPart,.noReplyLists,.scoreTab,.social,.client{
  background: white;
}

.title{
  font-size: 14px;
  color:#333333;
  padding-bottom: 20px;
}
.marked{
  font-size: 13px;
  padding-bottom: 5px;
}
.loginPart{
  padding:10px 10px;
}
.gitHubBtn{
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  font-size: 14px;
  padding:3px 10px;
  color:#FFFFFF;
  background: #5BC0DE;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 3px;
  line-height: 2em;
  vertical-align: middle;
  border:none;
}
.social img{
  width:150px;
  display: block;
  padding:10px 10px;
}

.noReplyList{
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
  padding: 5px;
}

.scoreTab li{
  font-size: 13px;
  padding: 10px 10px;
}
.QRCode {
  font-size: 13px;
  color:#778087;
  text-align:center;
  padding: 5px 0;
}
</style>
