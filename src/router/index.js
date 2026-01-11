import { createRouter, createWebHistory } from 'vue-router'


import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopOrders from "@/views/ShopOrders.vue";
import ShopLoginView from "@/views/ShopLoginView.vue";
import ShopPay from "@/views/ShopPay.vue";
import BasketView from "@/views/BasketView.vue";


const BankView = () => import('@/views/BankView.vue');

const routes = [
    { path: '/', redirect: '/shop' },

 
    { path: '/shop/items', redirect: '/shop/buy' },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView,
        children: [
            { path: '', name: 'shophome', components: { shopmain: ShopHome }, alias: 'home' },
            { path: 'buy', name: 'shopbuy', components: { shopmain: ShopBuy } },
            { path: 'orders', name: 'shoporders', components: { shopmain: ShopOrders } },
            { 
                path: 'pay/:orderId', 
                name: 'shoppay', 
                components: { shopmain: ShopPay }, 
                props: { shopmain: route => ({ orderUuid: route.params.orderId }) } 
            },
            { path: 'login', name: 'shoplogin', components: { shopmain: ShopLoginView } },
            { path: 'basket', name: 'basket', components: { shopmain: BasketView } }
        ]
    },


    {
        path: '/bank',
        component: BankView, 
        children: [
            {
                path: 'home',
                alias: '', 
                name: 'bankhome',
                components: { bankmain: () => import('@/views/BankHome.vue') }
            },
            {
                path: 'account',
                name: 'bankaccount',
                
                components: { bankmain: () => import('@/views/BankAccountView.vue') }
            },
            {
                path: 'amount',
                name: 'bankamount',
                components: { bankmain: () => import('@/views/BankAmount.vue') }
            },
            {
                path: 'operation',
                name: 'bankoperation',
                components: { bankmain: () => import('@/views/BankOperation.vue') }
            },
            {
                path: 'history',
                name: 'bankhistory',
                components: { bankmain: () => import('@/views/BankHistory.vue') }
            },
            {
                path: 'logout',
                name: 'banklogout',
                components: { bankmain: () => import('@/views/BankLogout.vue') }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router