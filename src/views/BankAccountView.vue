<template>
  <div>
    <h1>Données du compte</h1>

    <span>Numéro de compte : </span>
    <input v-model="number" placeholder="FR...">
    <button @click="reset">Reset</button>
    <br />

    <button :disabled="!isAccountNumberValid" @click="fetchAccount">
      Valider
    </button>

    <p v-if="errorMsg" style="color: red;">{{ errorMsg }}</p>

    <hr />

    <div v-if="bankStore.account">
      
      <span>Solde disponible : </span>
      <span :style="{ color: bankStore.account.amount >= 0 ? 'green' : 'red', fontWeight: 'bold' }">
        {{ bankStore.account.amount }} €
      </span>
      
      <hr />
      
      <p>Transactions passées :</p>
      <ul>
        <li v-for="(trans, index) in bankStore.transactions" :key="trans.uuid || index">
          {{ trans.amount }} € 
          le {{ convertDate(trans.date.$date || trans.date) }}
        </li>
      </ul>
    </div>
    
    <div v-else-if="!errorMsg && number">
      <p>Veuillez valider le numéro de compte.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBankStore } from "@/stores/bank.js";

// --- STATE ---
const number = ref('FRBADORG78901234567890-0000001'); // Valeur par défaut pour tester plus vite
const bankStore = useBankStore();
const errorMsg = ref('');

// --- COMPUTED ---
const isAccountNumberValid = computed(() => {
  // Regex pour vérifier le format du compte
  const rexp = /^[A-Za-z0-9]{22}-[0-9]{7}$/g;
  return rexp.test(number.value);
});

// --- FUNCTIONS ---

async function fetchAccount() {
  errorMsg.value = '';
  
  // On appelle la méthode du store mise à jour précédemment
  const response = await bankStore.getAccount(number.value);
  
  if (response.error !== 0) {
    errorMsg.value = response.data || "Erreur inconnue";
  }
}

function convertDate(dateVal) {
  const d = new Date(dateVal);
  return d.toLocaleDateString() + " à " + d.toLocaleTimeString();
}

function reset() {
  number.value = '';
  errorMsg.value = '';
  bankStore.logout(); // Vide le store
}
</script>

<style scoped>
input {
  margin: 0 10px;
  padding: 5px;
}
button {
  margin-right: 5px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>