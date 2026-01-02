<template>
  <h1>Welcome to DrMad app</h1>

  <NavBar
      v-if="isAdmin()"
      :titles="menus_admin"
      @menu-clicked="(idx) => handleMenuClick(menus_admin, idx)"
  />

  <NavBar
      v-else-if="isUser()"
      :titles="menus_user"
      @menu-clicked="(idx) => handleMenuClick(menus_user, idx)"
  />

  <NavBar
      v-else
      :titles="login_nav_bar"
  />

  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useShopStore } from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";

const shopStore = useShopStore();

const login_nav_bar = ref([
  { text: 'Login', color: 'black', routing: '/shop/login' }
]);

const menus_admin = ref([
  { text: 'Viruses', color: "green", routing: '/shop/items' },
  { text: 'Shop', color: "blue", routing: '/shop' },
  {text: 'Basket' , color: "orange" , routing: '/shop/basket'},
  { text: 'Orders', color: "teal", routing: '/shop/orders' },
  { text: 'Compte Bancaire', color: "purple", routing: '/bank/account' },
  { text: 'Log out', color: 'red', routing: '/shop/login' }
]);

const menus_user = ref([
  { text: 'Virus', color: 'black', routing: '/shop/items' },
  {text: 'Basket' , color: "orange" , routing: '/shop/basket'},
  { text: 'Log out', color: 'red', routing: '/shop/login' },
]);

onMounted(() => {
  // Charge les données au lancement
  shopStore.getAllViruses();
});

// Fonctions de vérification basées sur le Store
function isAdmin() {
  return shopStore.shopUser && shopStore.shopUser.role === 'admin';
}

function isUser() {
  return shopStore.shopUser !== null;
}

// Gestion des actions de menu
function handleMenuClick(menuList, index) {
  const item = menuList[index];
  if (item.text === 'Log out') {
    shopStore.logout();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

body {
  font-family: 'Lato',sans-serif;
}

</style>