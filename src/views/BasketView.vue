<template>
  <div class="basket-view">
    <h1>Votre Panier</h1>

    <div v-if="shopStore.basket.items && shopStore.basket.items.length > 0">
      <BasketList></BasketList>

    </div>

    <p v-else>Votre panier est vide pour le moment.</p>

    <button @click="router.push('/shop/buy')">Retour à la boutique</button>
  </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shop.js';
import BasketList from "@/components/BasketList.vue";
import router from "@/router/index.js";

const shopStore = useShopStore();
</script>

<style scoped>
.basket-view {
  padding: 20px;
  text-align: center;
}
</style>