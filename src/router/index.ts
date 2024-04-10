import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/interactive-map",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/interactive-map/playground",
    name: "playground",
    component: () => import("../views/playground.vue"),
  },
  {
    path: "/interactive-map/solarSystem",
    name: "solarSystem",
    component: () => import("../views/solarSystem.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
