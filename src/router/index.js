import Vue from 'vue';
import Router from 'vue-router';
import Perceptron from '@/components/Perceptron';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/perceptron',
      name: 'Perceptron',
      component: Perceptron,
    },
  ],
});
