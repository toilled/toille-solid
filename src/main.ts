import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "@picocss/pico";
import "./index.css";
import App from "./App.vue";
import PageContent from "./components/PageContent.vue";
import Checker from "./components/Checker.vue";
import pages from "./configs/pages.json";

const routes = [
  { path: "/", redirect: pages[0].link },
  { path: "/:name", component: PageContent, props: true },
  { path: "/checker", component: Checker },
  { path: "/:pathMatch(.*)*", component: PageContent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");