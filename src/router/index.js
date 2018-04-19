import Vue from 'vue';
import Router from 'vue-router';
import Perceptron from '@/components/Perceptron';
import PerceptronAnd from '@/components/PerceptronAnd';
import PerceptronOr from '@/components/PerceptronOr';
import PerceptronCaracteres09 from '@/components/PerceptronCaracteres09';
import PerceptronCaracteresAZ from '@/components/PerceptronCaracteresAZ';

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
      path: '/perceptron-caracteres-0-9',
      name: 'Perceptron-caracteres09',
      component: PerceptronCaracteres09,
    },
    {
      path: '/perceptron-caracteres-a-z',
      name: 'Perceptron-caracteresaz',
      component: PerceptronCaracteresAZ,
    },
  ],
});
