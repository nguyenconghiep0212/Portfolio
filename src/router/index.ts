import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/tresjs",
    name: "tresjs",
    component: () => import("../views/tresjs.vue"),
  },
  {
    path: "/playground",
    name: "playground",
    component: () => import("../views/playground.vue"),
  },
  {
    path: "/solarSystem",
    name: "solarSystem",
    component: () => import("../views/solarSystem.vue"),
  },

  {
    path: "/404",
    name: "error",
    component: () => import("../views/error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/interactive-map/"),
  routes,
});

router.beforeEach((to, from) => {
  console.log(from, "---->", to);
});
export default router;
