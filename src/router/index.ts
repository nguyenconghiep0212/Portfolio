import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      title: "Trang chủ",
    },
  },
  {
    path: "/tresjs",
    name: "tresjs",
    component: () => import("../views/tresjs.vue"),
    meta: {
      title: "Tresjs",
    },
  },
  {
    path: "/playground",
    name: "playground",
    component: () => import("../views/playground.vue"),
    meta: {
      title: "playground",
    },
  },
  {
    path: "/solarSystem-test",
    name: "solarSystemTest",
    component: () => import("../views/solarSystem_test.vue"),
    meta: {
      title: "Solar system test",
    },
  },
  {
    path: "/solarSystem",
    name: "solarSystem",
    component: () => import("../views/SolarSystem/solarSystem.vue"),
    meta: {
      title: "Solar system",
    },
  },

  {
    path: "/404",
    name: "error",
    component: () => import("../views/error.vue"),
    meta: {
      title: "404",
    },
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
