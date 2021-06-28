import Vue from 'vue';
import VueRouter from 'vue-router';
import Panel from '../views/Panel.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/panel',
    name: 'Panel',
    component: Panel,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
