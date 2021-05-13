'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import AddEventView from '../views/AddEventView.vue'
import EditEventView from '../views/EditEventView.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addEvent',
    name: 'AddEvent',
    component: AddEventView
  },
  {
    path: '/editEvent',
    name: 'EditEvent',
    component: EditEventView
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
