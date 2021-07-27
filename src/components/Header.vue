<template>
  <div class="header">
    <div class="logo">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
    </div>
    <ul>
      <li>
        <router-link :to="{name:'root'}">
          首页
        </router-link>
      </li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .header{
    background: #444444;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:9px 70px;
  }
  .logo{
    display: flex;
    align-items: center;
  }
  img{
    width: 120px;
    vertical-align: middle;
  }
  ul{
    list-style: none;
    display: flex;
    width:350px;
    justify-content: space-between;
  }

  a{
    text-decoration: none;
    color:#ccc;
    font-size: 13px;
    text-shadow: none;
  }
  ul>li>a:hover{
    color:white;
  }
</style>
