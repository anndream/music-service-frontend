import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import EditDetail from '@/components/Playlist/edit/Index.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [ 
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/playlist/:id',
    name: 'EditDetail',
    component: EditDetail
  }, 
  {
    path: '/genre',
    name: 'Genre',
    component: () =>
      import(/* webpackChunkName: "genre" */ "../views/Genre.vue")
  },
  
  {
    path: '/artist',
    name: 'Artist',
    component: () =>
      import(/* webpackChunkName: "artist" */ "../views/Artist.vue")
  },
  {
    path: '/song',
    name: 'Song',
    component: () =>
      import(/* webpackChunkName: "song" */ "../views/Song.vue")
  },
  {
    path: '/curation',
    name: 'Curation',
    component: () =>
      import(/* webpackChunkName: "song" */ "../views/Curation.vue")
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/Test.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
