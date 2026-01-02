import { createRouter, createWebHistory } from 'vue-router'
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopOrders from "@/views/ShopOrders.vue";
import ShopLoginView from "@/views/ShopLoginView.vue";
import ShopPay from "@/views/ShopPay.vue";
import BasketView from "@/views/BasketView.vue";

const routes = [
    { path: '/', redirect: '/shop' },

    { path: '/shop/items', redirect: '/shop/buy' },

    {
        path: '/bank/account',
        name: 'bankaccount',
        component: () => import('@/views/BankAccountView.vue')
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView, // Charge le layout avec <router-view name="shopmain">
        children: [
            {
                path: '', // Route par défaut (/shop)
                name: 'shophome',
                components: { shopmain: ShopHome },
                alias: 'home'
            },
            {
                path: 'buy',
                name: 'shopbuy',
                components: { shopmain: ShopBuy } // C'est ici que tu utiliseras ton CheckedList pour acheter
            },
            {
                path: 'orders',
                name: 'shoporders',
                components: { shopmain: ShopOrders }
            },
            {
                path: 'pay/:orderId',
                name: 'shoppay',
                components: { shopmain: ShopPay },
                props: route => ({orderUuid: route.params.orderId})
            },
            {
                path: 'login',
                name: 'shoplogin',
                components: { shopmain: ShopLoginView }
            },
            {
                path: 'basket',
                name: 'basket',
                components: { shopmain: BasketView }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router