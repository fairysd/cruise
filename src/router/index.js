import Vue from 'vue'
import Router from 'vue-router'
import Agent from '@/components/Agent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Agent',
      component: Agent
    }
  ]
})
