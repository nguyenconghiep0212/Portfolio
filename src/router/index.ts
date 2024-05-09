import {
  useRouter,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      hidden: true,
      title: "Trang chủ",
    },
  },
  {
    path: "/tresjs",
    name: "tresjs",
    component: () => import("../views/tresjs.vue"),
    meta: {
      hidden: true,
      title: "Tresjs",
    },
  },
  {
    path: "/playground",
    name: "playground",
    component: () => import("../views/playground.vue"),
    meta: {
      hidden: true,
      title: "playground",
    },
  },
  {
    path: "/solarSystem-test",
    name: "solarSystemTest",
    component: () => import("../views/solarSystem_test.vue"),
    meta: {
      hidden: true,
      title: "Solar system test",
    },
  },
  {
    path: "/solarSystem",
    name: "solarSystem",
    component: () => import("../views/SolarSystem/index.vue"),
    meta: {
      title: "Solar system",
    },
  },
  {
    path: "/3dBuilding",
    name: "3dBuilding",
    component: () => import("../views/3DBuilding/index.vue"),
    meta: {
      title: "3D Building",
    },
  },
  {
    path: "/showroom",
    name: "showroom",
    component: () => import("../views/Showroom/index.vue"),
    meta: {
      title: "Showroom",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("../views/error.vue"),
    meta: {
      hidden: true,
      title: "404",
    },
  },
];

const routers = createRouter({
  history: createWebHashHistory("/Portfolio/"),
  routes,
});

routers.beforeEach((to, from) => {
  console.log(from, "---->", to);
});
export default routers;
