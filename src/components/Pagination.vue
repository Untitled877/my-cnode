<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judge">...</button>
    <button
      v-for="btn in pageBtns"
      @click="changeBtn(btn)"
      :class="[{ currentPage: btn === currentPage }, 'pageBtn']"
    >
      {{ btn }}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Pagination",
  data() {
    return {
      pageBtns: [1, 2, 3, 4, 5, "..."],
      // 当前选中的页码
      currentPage: 1,
      judge: false,
    };
  },
  methods: {
    changeBtn(page) {
      // 如果没有传入page参数，则用来处理上一页和下一页的点击事件
      if (typeof page !== "number") {
        switch (page.target.innerText) {
          case "上一页":
            $("button.currentPage").prev().click();
            break;
          case "下一页":
            $("button.currentPage").next().click();
            break;
          case "首页":
            this.pageBtns = [1, 2, 3, 4, 5, "..."];
            this.changeBtn(1);
            break;
          default:
            break;
        }
        return;
      }
      if (page > 4) {
        this.judge = true;
      } else {
        this.judge = false;
      }
      this.currentPage = page;
      if (page == this.pageBtns[4]) {
        this.pageBtns.shift();
        this.pageBtns.splice(4, 0, this.pageBtns[3] + 1);
      } else if (page == this.pageBtns[0] && page !== 1) {
        this.pageBtns.unshift(this.pageBtns[0] - 1);
        this.pageBtns.splice(5, 1);
      }
      this.$emit("handle", this.currentPage);
    },
  },
};
</script>

<style scoped>
button {
  background: white;
  font-size: 16px;
  border-radius: 3px;
  color: #778087;
  border: 1px solid grey;
  margin-right: 10px;
  outline: none;

  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}
.currentPage {
  background: #80bd01;
  color: white;
}
.btnClass > button {
  border: none;
}
.btnClass {
  border: 1px solid grey;
}
</style>
