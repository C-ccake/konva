import { createRouter, createWebHashHistory } from "vue-router";
import Page1 from "../views/Page1.vue";
import About from "../views/About.vue";
import imit from "../views/imit.vue";
const routes = [
  {
    path: "/",
    name: "Page1",
    component: Page1,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/imit",
    name: "imit",
    component: imit,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
