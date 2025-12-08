import {createRouter, createWebHistory} from 'vue-router'
import VirusesView from "@/views/VirusesView.vue";
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopOrders from "@/views/ShopOrders.vue";

const routes = [
    // route pour afficher la liste des virus
    {
        path: '/shop/items',
        name: 'shopitems',
        components: {default : VirusesView}
    },
    // route pour accéder au compte bancaire
    {
        path: '/bank/account',
        name: 'bankaccount',
        components: {default : () => import('@/views/BankAccountView.vue')}
    },
    {
        path: '/shop',
        name: 'shop',
        components: {default : ShopView},
        children: [{
            path: '',
            name: 'shophome',
            components: {shopmain : ShopHome },
            alias: ['shop']
        },{
            path: 'buy',
            name: 'shopbuy',
            component: {shopmain : ShopBuy }
        }, {
            path: 'orders',
            name: 'shoporders',
            components: {shopmain : ShopOrders}
        }, {
            path: 'pay/:orderId',
            name: 'shoppay',
        }, { //todo
            path: 'login',
            name: 'shoplogin',
            // import dynamique du composant, plutôt qu'en début de fichier, comme la 1ère route.
            component: () => import('@/views/ShopLoginView.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
