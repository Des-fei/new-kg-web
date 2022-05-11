import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/plugins",
    name: "Plugins",
    component: () => import("@/views/plugins/index.vue")
  },
  {
    path: "/cloud-music",
    name: "CloudMusic",
    component: () => import("@/views/netease-cloud-music/index.vue")
  },
  {
    path: "/antvx6",
    name: "AntvX6",
    component: () => import("@/views/antvx6/index.vue")
  },
  {
    path: "/antvg6",
    name: "AntvG6",
    component: () => import("@/views/antvg6/index.vue")
  },
  {
    path: "/echarts/chart1",
    name: "Chart1",
    component: () => import("@/views/echarts/chart1.vue")
  },
  {
    path: "/antvx6demo",
    name: "AntvX6demo",
    component: () => import("@/views/antvx6demo/demo.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
