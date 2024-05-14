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
    component: () => import("../views/Homepage/index.vue"),
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
    path: "/projects/:key",
    name: "projects",
    component: () => import("../views/Projects/index.vue"),
    meta: {
      hidden: true,
      title: "Projects",
    },
  },
  {
    path: "/solarSystem",
    name: "solarSystem",
    component: () => import("../views/SolarSystem/index.vue"),
    meta: {
      icon: "solar:black-hole-3-bold-duotone",
      title: "Solar system",
      description:'Super-simplify version our star system. Inspired by NASA\'s Eyes on the Solar System'
    },
  },
  {
    path: "/3dBuilding",
    name: "3dBuilding",
    component: () => import("../views/3DBuilding/index.vue"),
    meta: {
      icon: "solar:buildings-2-bold-duotone",
      title: "City block",
      description:'Just a simple simulation a city block'
    },
  },
  {
    path: "/showroom",
    name: "showroom",
    component: () => import("../views/Showroom/index.vue"),
    meta: {
      icon: "solar:armchair-2-bold",
      title: "Showroom",
      description:'A simple test room for physic engine cannon-es. Currently building...'
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
