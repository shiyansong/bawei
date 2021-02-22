import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '@/components/goods-list'
import ShopCart from '@/components/shop-cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'GoodsList',
    component: GoodsList
  },
  {
    path: '/cart',
    name: 'ShopCart',
    component: ShopCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
