import Vue from "vue";
import Router from "vue-router";
import PostList from "../components/PostList";
import Article from "../components/Article";
import UserInfo from "../components/UserInfo";
import ArticleSidebar from "../components/ArticleSideBar";
import UserSideBar from "../components/UserSideBar";
import MainSideBar from "../components/MainSideBar";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "root",
      path: "/",
      components: {
        main: PostList,
        slideBar: MainSideBar,
      },
    },
    {
      name: "post_content",
      path: "/topic/:id&author=:name",
      components: {
        main: Article,
        slideBar: ArticleSidebar,
      },
    },
    {
      name: "user_info",
      path: "/userinfo/:name",
      components: {
        main: UserInfo,
        slideBar: UserSideBar,
      },
    },
  ],
});
