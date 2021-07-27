<template>
  <div>
    <div class="autherSummary">
      <p class="topBar">个人信息</p>
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
      </div>
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
  name: "ArticleSideBar",
  data(){
    return {
      userInfo:{}
    }
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then((res) => {
          if (res.data.success === true) {
            this.userInfo = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.getUserData();
  },
}
</script>

<style scoped>
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
.imgWrap img {
  width: 50px;
  border-radius: 3px;
  margin-right: 5px;
}
a {
  text-decoration: none;
  color: #778087;
  font-size: 14px;
}
.infoWrap{
  background: #FFF;
}
.social,.client{
  background: white;
}
.social img{
  width:150px;
  display: block;
  padding:10px 10px;
}
.QRCode {
  font-size: 13px;
  color:#778087;
  text-align:center;
  padding: 5px 0;
}
.client a {
  text-decoration: none;
  color: #778087;
  font-size: 13px;
}
.client a:hover{
  text-decoration: underline;
}
</style>
