export default [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ `@/views/Home.vue`)
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "About" */ `@/views/About.vue`)
  }
]