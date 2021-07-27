<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <div class="articlePart">
        <router-view name="main"></router-view>
      </div>
      <div class="sideBar">
        <router-view name="slideBar"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PostList from './components/PostList'

export default {
  name: 'App',
  components:{
    Header,
    PostList
  }
}
</script>

<style>
* {
  margin:0; padding:0;
  box-sizing: border-box;
}
*::before,*::after {
  box-sizing: border-box;
}

body{
  height: 100%;
  background: #E1E1E1;

}
.main{
  display:flex;
  width:90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-end;
}
.articlePart{
  width:75%
}
.sideBar{
  width:25%;
  margin-left: 15px;
}
* {
  margin:0; padding:0;
  box-sizing: border-box;
}
*::before,*::after {
  box-sizing: border-box;
}
</style>
