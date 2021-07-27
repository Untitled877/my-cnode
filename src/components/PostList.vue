<template>
  <div class="postLists">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <ul>
        <li>
          <div class="topBar">
            <span @click="allLists" class="selected allLists">全部</span>
            <span @click="goodLists" class="goodLists">精华</span>
            <span @click="shareLists" class="shareLists">分享</span>
            <span @click="answerLists" class="answerLists">问答</span>
            <span @click="jobLists" class="jobLists">招聘</span>
          </div>
        </li>
        <li v-for="post in posts" class="postList">
          <router-link :to="{
            name:'user_info',
            params:{
              name:post.author.loginname,
            }
          }">
            <img :src="post.author.avatar_url" class="userImg">
          </router-link>
          <span class="count">
            <span class="reply_count">{{ post.reply_count }}</span>
            /{{ post.visit_count }}
          </span>

          <span
            :class="[
              {
                post_good: post.good === true,
                post_top: post.top === true,
                post_tab: post.good !== true && post.top !== true,
              },
            ]"
          >
            <span>
              {{ post | tabFormat }}
            </span>
          </span>

          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: post.id,
                name: post.author.loginname,
              },
            }"
          >
            <span class="post_title">
              {{ post.title }}
            </span>
          </router-link>

          <span class="last_reply">
            {{ post.last_reply_at | formatDate }}
          </span>
        </li>
        <li>
          <Pagination @handle="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import $ from 'jquery'
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [], //页面的列表数
      postPage: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.postPage,
            limit: 20,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renderList(value) {
      this.postPage = value;
      this.getData();
    },
    allLists() {
      $('.topBar>span').removeClass('selected')
      $('.allLists').addClass('selected')
      this.getData();
    },
    goodLists() {
      $('.topBar>span').removeClass('selected')
      $('.goodLists').addClass('selected')
    },
    shareLists() {
      $('.topBar>span').removeClass('selected')
      $('.shareLists').addClass('selected')
    },
    answerLists() {
      $('.topBar>span').removeClass('selected')
      $('.answerLists').addClass('selected')
    },
    jobLists() {
      $('.topBar>span').removeClass('selected')
      $('.jobLists').addClass('selected')
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  width: 100%;
  margin: 0 auto;
}
li {
  display: block;
}
ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  color: #333;
  border-top: 1px solid #f0f0f0;
}
li:not(:first-child):hover {
  background: #f6f6f6;
}
li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

img {
  width: 30px;
  border-radius: 5px;
  vertical-align: middle;
}
.postLists {
  margin-top: 15px;
  background: white;
}
.selected {
  background: #80bd01;
  color:white;
  border-radius: 3px;
}
.topBar {
  background: #f6f6f6;
  font-size: 13px;
  color: #80bd01;
  padding-left: 20px;
}
.topBar > span {
  line-height: 35px;
  margin-right: 20px;
  padding:5px;
}
.topBar > span:hover {
  cursor: pointer;
  color: #005580;
}
.count {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #b4bbce;
}
.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.post_good,
.post_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
}

.post_tab {
  background: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
}

.last_reply {
  font-size: 12px;
  text-align: right;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
}
.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
