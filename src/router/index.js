import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:id',
    name: 'personDetails',
    props: (route) => route.params,
    component: () => import('@/views/Person.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
