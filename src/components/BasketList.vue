<template>
  <div>
    <CheckedList
        :data="fullItems"
        :fields="['name', 'price', 'amount']"
        :item-button="{ show: true, text: 'Supprimer' }"
        :list-button="{ show: true, text: 'Vider le panier' }"
        @item-button-clicked="removeItem"
        @list-button-clicked="clearBasket"
    />

    <div class="footer-basket">
      <h3>Total : {{ basketTotal }} €</h3>
      <button class="buy-btn" @click="validateOrder">Acheter</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useShopStore } from '@/stores/shop.js';
import ShopService from '@/services/shop.service.js';
import CheckedList from './CheckedList.vue';
import router from '@/router/index.js';

const shopStore = useShopStore();


const fullItems = computed(() => {
  return shopStore.basket.items.map(entry => {
    const virus = shopStore.viruses.find(v => v._id === entry.item);
    return { ...virus, amount: entry.amount };
  });
});

const basketTotal = computed(() => {
  return fullItems.value.reduce((t, item) => t + (item.price * item.amount), 0);
});

function removeItem(index) {
  shopStore.removeFromBasket(index);
}

function clearBasket() {
  shopStore.clearBasket();
}

async function validateOrder() {
  
  const res = await ShopService.orderBasket(shopStore.shopUser._id, shopStore.basket);

  if (res.error === 0) {
    let uuid = res.data.uuid;
    if (uuid === undefined) uuid =
    await shopStore.clearBasket(); 
    await router.push('/shop/pay/' + uuid); 
  }
}
</script>

<style scoped>
.footer-basket {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
}
.buy-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px 25px;
  border: none;
  cursor: pointer;
  font-size: 1.1em;
}
</style>