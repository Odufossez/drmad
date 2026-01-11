<template>
  <div class="bank-amount">
    <h3>Consultation du solde</h3>
    
    <div v-if="account">
      <p>Votre solde actuel est de :</p>
      
      <slot name="account-amount" :amount="account.amount">
        <span>{{ account.amount }}</span>
      </slot>
    </div>

    <div v-else>
      <p>Chargement des informations du compte...</p>
    </div>
  </div>
</template>

<script setup>
import { useBankStore } from '@/stores/bank.js';
import { storeToRefs } from 'pinia';

const bankStore = useBankStore();
const { account } = storeToRefs(bankStore);
</script>

<style scoped>
.bank-amount {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
}
</style>