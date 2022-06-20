<script  lang="ts">
import axios from "./request";
import { onActivated, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import setPlugin from "./plugin"
import { dir } from "console";
import config from "./config";
import useStore from "./store";
import { infoRequest } from './utils/utils';
import { useRouter } from 'vue-router';


export default {
  name: "App",
  setup() {
    // 当页面被创建时，拉取全局动态配置信息
    config("", true)
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      let link = document.createElement("link");
      link.type = "text/css";
      link.id = "theme";
      link.rel = "stylesheet";
      link.href = "/src/assets/style/dark.css";
      document.getElementsByTagName("head")[0].appendChild(link);

      // 为给定 ID 的 user 创建请求
      infoRequest()
    });


    let changeTheme = (type: string) => {
      const link: HTMLLinkElement = <HTMLLinkElement>document.getElementById("theme")
      link!.href = `/src/assets/style/${type}.css`;
    };

    return { changeTheme };
  },
}
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #0F172A;
  transition: color 1s, background-color .5s;
  overflow: hidden;
}


/* body::-webkit-scrollbar{
    display: none; 
} */

body {
  color: var(--fg_color);
  background-color: #0F172A;
  overflow: hidden;
}

ul {
  list-style: none;
  margin: 2px 0;
  padding-inline-start: 0;
}

button {
  border: 1px solid var(--search_border);
  background: var(--bg_box);
  text-align: center;
  color: var(--fg_color);
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex1 {
  flex: 1;
}

.flex {
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 100vh
}

.view_width {
  width: 16rem;
}

@media (min-width: 1300px) {
  .main_width {
    width: 45rem !important;
    flex-grow: 0;
  }
}

.main_view_width {
  width: 61rem;
}

.main-box {
  margin: 0 10px;
}

.fixed {
  position: fixed;
}

.left_box {
  margin: 0 auto 10px auto;
  border-radius: 5px;
  width: 80%;
}

.join {
  height: 40px;
  width: 70px;
  color: var(--fg_text_color_light);
  font-weight: bold;
  background-color: var(--bg_button_1);
  line-height: 40px;
  transition: all .2s;
}

.join:active {
  transform: scale(.9);
}

.hover_one:hover {
  background-color: var(--bg_button_action_1);
}

.hover_two:hover {
  background-color: var(--bg_button_action_2);
}

.to_link {
  background-color: var(--bg_button_2);
}

.dialog {
  background-color: var(--bg_box) !important;
  border-radius: 7px !important;
}

.el-dialog__body {
  padding-top: 15px !important;
}

.el-dialog__body,
.el-dialog__title {
  color: var(--fg_color) !important;
}

</style>
