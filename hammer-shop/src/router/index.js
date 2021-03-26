import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home.vue';
import GoodsList from '@/components/goods-list.vue';
import Detail from '@/components/detail.vue';
import CartDetail from '@/components/cart-detail.vue';
import Address from '@/components/address.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', redirect: '/goodlist', component: Home, children: [
      { path: '/goodlist', component: GoodsList },
      { path: '/detail/:id', name: "detail", component: Detail },
      { path: '/cart', component: CartDetail },
      { path: '/address', component: Address }
    ] }
  ]
})