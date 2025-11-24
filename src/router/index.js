import { createRouter, createWebHistory } from 'vue-router'
import VirusesView from "@/views/VirusesView.vue";
import ShopView from "@/components/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopOrders from "@/views/ShopOrders.vue";

const routes = [
    // route pour afficher la liste des virus
  {
    path: '/shop/items',
    name: 'shopitems',
    component: VirusesView
  },
    {
        path: '/shop/home',
        name: 'shophome',
        component: ShopHome,
        alias: '/shop'
    },
    // route pour accéder au compte bancaire
    {
        path: '/bank/account',
        name: 'bankaccount',
        component: () => import('@/views/BankAccountView.vue')
    },

    {
        path: '/shop/buy',
        name: 'shopbuy',
        component: ShopBuy
    },
    {
        path: '/shop/orders',
        name: 'shoporders',
        component: ShopOrders
    },
    // route pour se loguer
  {
    path: '/shop/login',
    name: 'shoplogin',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la 1ère route.
    component: () => import('@/views/ShopLoginView.vue')
  },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView
    },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
