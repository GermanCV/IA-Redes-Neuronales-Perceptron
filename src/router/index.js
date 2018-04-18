import Vue from 'vue';
import Router from 'vue-router';
import Perceptron from '@/components/Perceptron';
import PerceptronAnd from '@/components/PerceptronAnd';
import PerceptronOr from '@/components/PerceptronOr';
import PerceptronCaracteres from '@/components/PerceptronCaracteres';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/perceptron',
      name: 'Perceptron',
      component: Perceptron,
    },
    {
      path: '/perceptron-and',
      name: 'Perceptron-and',
      component: PerceptronAnd,
    },
    {
      path: '/perceptron-or',
      name: 'Perceptron-or',
      component: PerceptronOr,
    },
    {
      path: '/perceptron-caracteres',
      name: 'Perceptron-caracteres',
      component: PerceptronCaracteres,
    },
  ],
});
