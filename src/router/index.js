import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectEditor from '../views/ProjectEditor.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/project/:id',
    name: 'ProjectEditor',
    component: ProjectEditor,
    props: true,
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
