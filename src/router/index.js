import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectPopUp from '../views/ProjectPopUp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ProjectPopUp',
    component: ProjectPopUp,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
