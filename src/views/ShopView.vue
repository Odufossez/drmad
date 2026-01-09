<!-- <template>
  <div class="shop-view">
    <h1>Boutique de Virus</h1>
    <router-view name="shopmain"></router-view>

  </div>
</template>

<script setup>

</script> -->


<template>
  <div class="shop-view">
    <h2>Boutique de Virus</h2>

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
      @menu-clicked="(idx) => handleMenuClick(login_nav_bar, idx)"
    />

    <router-view name="shopmain"></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useShopStore } from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue"; // On réutilise le composant

const shopStore = useShopStore();

// --- Définition des Menus de la Boutique ---

const login_nav_bar = ref([
  { text: 'Se connecter', color: 'black', routing: '/shop/login' }
]);

const menus_admin = ref([
  { text: 'Virus', color: "green", routing: '/shop/items' },
  { text: 'Boutique', color: "blue", routing: '/shop' }, // Retour accueil boutique
  { text: 'Panier', color: "orange", routing: '/shop/basket' },
  { text: 'Commandes', color: "teal", routing: '/shop/orders' },
  { text: 'Déconnexion', color: 'red', routing: '/shop/login' }
]);

const menus_user = ref([
  { text: 'Virus', color: 'black', routing: '/shop/items' },
  { text: 'Panier', color: "orange", routing: '/shop/basket' },
  { text: 'Commandes', color: "teal", routing: '/shop/orders' }, // Ajouté pour cohérence
  { text: 'Déconnexion', color: 'red', routing: '/shop/login' },
]);

// --- Chargement des données ---
onMounted(() => {
  shopStore.getAllViruses();
});

// --- Logique métier (Auth) ---
function isAdmin() {
  return shopStore.shopUser && shopStore.shopUser.role === 'admin';
}

function isUser() {
  return shopStore.shopUser !== null;
}

// --- Gestion des clics ---
function handleMenuClick(menuList, index) {
  const item = menuList[index];
  // Si le bouton est "Déconnexion" (ou Log out), on déclenche le store
  if (item.text === 'Déconnexion' || item.text === 'Log out') {
    shopStore.logout();
  }
}
</script>

<style scoped>
.shop-view {
  padding: 20px;
}
</style>
