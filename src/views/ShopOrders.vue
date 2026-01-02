<template>
  <div class="shop-orders">
    <h1>Mes Commandes</h1>

    <div v-if="orders && orders.length > 0">
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Montant</th>
          <th>État</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.uuid">
          <td>{{ new Date(order.date).toLocaleDateString() }}</td>
          <td>{{ order.total }} €</td>
          <td :class="order.status">{{ order.status }}</td>
          <td>
            <template v-if="order.status === 'waiting_payment'">
              <button @click="goToPay(order.uuid)" class="pay-btn">Payer</button>
              <button @click="onCancel(order.uuid)" class="cancel-btn">Annuler</button>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Vous n'avez pas encore passé de commande.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useShopStore } from '@/stores/shop.js';
import router from '@/router/index.js';

const shopStore = useShopStore();

// On récupère les commandes depuis le store
const orders = computed(() => shopStore.shopUser?.orders || []);

onMounted(async () => {
  await shopStore.fetchUserOrders();
});

function goToPay(uuid) {
  // Redirection vers la route de paiement avec l'UUID
  router.push(`/shop/pay/${uuid}`);
}

async function onCancel(uuid) {
  if (confirm("Voulez-vous vraiment annuler cette commande ?")) {
    await shopStore.cancelOrder(uuid);
  }
}
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
.waiting_payment { color: orange; font-weight: bold; }
.finalized { color: green; }
.cancelled { color: red; }

.pay-btn { background-color: #2ecc71; color: white; margin-right: 5px; cursor: pointer; border: none; padding: 5px 10px; }
.cancel-btn { background-color: #e74c3c; color: white; cursor: pointer; border: none; padding: 5px 10px; }
</style>