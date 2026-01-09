<!-- <template>
  <div class="shop-pay">
    <h1>Paiement</h1>

    <div class="payment-container">
      <p>Veuillez confirmer l'UUID de la commande à régler :</p>

      <div class="input-group">
        <input
            type="text"
            v-model="inputUuid"
            placeholder="Ex: 01010101-0000-0000-..."
            class="uuid-field"
        />
      </div>

      <button
          @click="onPay"
          :disabled="!inputUuid"
          class="pay-button"
      >
        Payer la commande
      </button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useShopStore } from '@/stores/shop.js';
import ShopService from '@/services/shop.service.js';
import router from '@/router/index.js';

const props = defineProps({
  orderUuid: String
});

const shopStore = useShopStore();
const inputUuid = ref('');
const errorMsg = ref('');

// Initialisation au chargement
onMounted(() => {
  if (props.orderUuid) {
    inputUuid.value = props.orderUuid;
  }
});

// Si l'utilisateur change de commande sans recharger la page
watch(() => props.orderUuid, (newVal) => {
  if (newVal) inputUuid.value = newVal;
});

async function onPay() {
  errorMsg.value = '';

  if (!shopStore.shopUser) {
    errorMsg.value = "Erreur : Vous n'êtes pas connecté.";
    return;
  }

  // Appel au service pour changer le statut à "finalized"
  const response = await ShopService.payOrder(shopStore.shopUser._id, inputUuid.value);

  if (response.error === 0) {
    await shopStore.clearBasket(); //on vide le panier après commande
    // Succès : redirection vers l'historique des commandes
    router.push('/shop/orders');
  } else {
    // Échec : l'UUID n'existe pas ou n'appartient pas à cet utilisateur
    errorMsg.value = "UUID invalide ou commande introuvable.";
  }
}
</script>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.uuid-field {
  width: 100%;
  padding: 12px;
  font-family: monospace;
  font-size: 1.1em;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.pay-button {
  background-color: #27ae60;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.pay-button:disabled {
  background-color: #bdc3c7;
}
.error {
  color: #e74c3c;
  margin-top: 15px;
  font-weight: bold;
}
</style> -->

<template>
  <div class="shop-pay">
    <h1>Paiement</h1>

    <div class="payment-container">
      <h3>Commande : {{ orderUuid }}</h3>
      
      <div class="input-group">
        <label>UUID de la transaction bancaire :</label>
        <input
            type="text"
            v-model="transactionUuid"
            placeholder="Ex: 99990000-0000-..."
            class="uuid-field"
        />
      </div>

      <button
          @click="onPay"
          :disabled="!transactionUuid"
          class="pay-button"
      >
        Valider le paiement
      </button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShopStore } from '@/stores/shop.js';
import ShopService from '@/services/shop.service.js';
import router from '@/router/index.js';

const props = defineProps({
  orderUuid: String
});

const shopStore = useShopStore();
// On crée une variable dédiée pour la transaction
const transactionUuid = ref('');
const errorMsg = ref('');

async function onPay() {
  errorMsg.value = '';

  if (!shopStore.shopUser) {
    errorMsg.value = "Erreur : Vous n'êtes pas connecté.";
    return;
  }

  // Construction de l'objet contenant l'ID de commande ET l'UUID de transaction
  const paymentData = {
    uuid: props.orderUuid,
    transactionUuid: transactionUuid.value
  };

  // Appel au service avec le nouvel objet
  const response = await ShopService.payOrder(shopStore.shopUser._id, paymentData);

  if (response.error === 0) {
    // Succès
    await shopStore.clearBasket(); 
    router.push('/shop/orders');
  } else {
    // Affichage de l'erreur renvoyée par le service (ex: "Montant incorrect")
    errorMsg.value = response.data || "Erreur lors du paiement.";
  }
}
</script>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: left;
}
.input-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
.uuid-field {
  width: 100%;
  padding: 12px;
  font-family: monospace;
  font-size: 1.1em;
  box-sizing: border-box;
}
.pay-button {
  width: 100%;
  background-color: #27ae60;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.pay-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
.error {
  color: #e74c3c;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}
</style>