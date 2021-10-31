import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Index.vue';

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

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to.params.person) {
      document.title = `${to.params.person.name.first} ${to.params.person.name.last}`;
    } else {
      document.title = 'Users';
    }
  });
});

export default router;
