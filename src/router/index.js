import Vue from 'vue'
import Router from 'vue-router'
import movies from '@/components/Movie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'movies',
      component: movies
    }
  ]
})
