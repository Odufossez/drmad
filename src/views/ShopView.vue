<template>
  <div class="shop-view">
    <h1>Boutique de Virus</h1>

    <NavBar v-if="isAdmin()" :links="menus_admin" />

    <NavBar v-else-if="isUser()" :links="menus_user" />

    <NavBar v-else :links="login_nav_bar" />

    <router-view name="shopmain"></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useShopStore } from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";

const shopStore = useShopStore();

// --- Adaptation des Menus au nouveau format { label, to } ---

const login_nav_bar = ref([
  { label: 'Login', to: '/shop/login' }
]);

const menus_admin = ref([
  { label: 'Viruses', to: '/shop/items' },
  { label: 'Shop', to: '/shop' },
  { label: 'Basket', to: '/shop/basket' },
  { label: 'Orders', to: '/shop/orders' },
  // Attention : Le logout ne fonctionnera plus par clic direct car l'event est supprimé.
  // Il faudra gérer le logout via une route spécifique ou un composant dédié plus tard.
  { label: 'Log out', to: '/shop/login' } 
]);

const menus_user = ref([
  { label: 'Virus', to: '/shop/items' },
  { label: 'Basket', to: '/shop/basket' },
  { label: 'Orders', to: '/shop/orders' },
  { label: 'Log out', to: '/shop/login' },
]);

onMounted(() => {
  shopStore.getAllViruses();
});

function isAdmin() {
  return shopStore.shopUser && shopStore.shopUser.role === 'admin';
}

function isUser() {
  return shopStore.shopUser !== null;
}
</script>