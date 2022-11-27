import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior: (to, from , savePosition) => savePosition ? savePosition : { left: 0, top: 0 }
});

export default router;