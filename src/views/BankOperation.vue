<template>
  <div class="bank-operation">
    <slot name="title">
      <h2>Débit / Virement</h2>
    </slot>

    <div class="operation-form">
      <div class="form-group">
        <label for="amount">Montant :</label>
        <input 
          id="amount" 
          type="number" 
          v-model.number="amount" 
          placeholder="0.00"
          min="0"
        />
      </div>

      <div class="form-group checkbox-group">
        <input 
          id="recipient-check" 
          type="checkbox" 
          v-model="hasRecipient" 
        />
        <label for="recipient-check">Destinataire</label>
      </div>

      <div v-if="hasRecipient" class="form-group">
        <label for="recipient">N° de compte destinataire :</label>
        <input 
          id="recipient" 
          type="text" 
          v-model="recipientNumber" 
          placeholder="Ex: FR..." 
        />
      </div>

      <button @click="validateOperation" class="btn-validate">
        Valider
      </button>

      <p v-if="successMessage" class="success-msg">
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBankStore } from '@/stores/bank.js';

const bankStore = useBankStore();

// --- Données Réactives ---
const amount = ref(0);
const hasRecipient = ref(false); // État de la case à cocher
const recipientNumber = ref('');
const successMessage = ref('');

// --- Validation ---
async function validateOperation() {
  // Réinitialisation du message
  successMessage.value = '';

  // Vérification basique du montant
  if (amount.value <= 0) {
    alert("Veuillez saisir un montant positif.");
    return;
  }

  let response;

  // Cas 1 : Virement (avec destinataire)
  if (hasRecipient.value) {
    if (!recipientNumber.value) {
      alert("Veuillez saisir un numéro de compte destinataire.");
      return;
    }
    // Appel à l'action du store crée précédemment
    response = await bankStore.createPayment(amount.value, recipientNumber.value);
  } 
  // Cas 2 : Débit simple (sans destinataire)
  else {
    response = await bankStore.createWithdraw(amount.value);
  }

  // Gestion de la réponse
  if (response.error === 0) {
    // SUCCÈS
    const uuid = response.data.uuid;
    successMessage.value = `L'opération est validée avec le n° : ${uuid}. Vous pouvez la retrouver dans l'historique`;

    // Reset du formulaire (optionnel mais recommandé)
    amount.value = 0;
    recipientNumber.value = '';
    hasRecipient.value = false;

    // Effacer le message après 5 secondes
    setTimeout(() => {
      successMessage.value = '';
    }, 5000);

  } else {
    // ÉCHEC : Boîte de dialogue (Alert)
    alert(response.data); // data contient le message d'erreur renvoyé par le service
  }
}
</script>

<style scoped>
.bank-operation {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 500px;
}

.operation-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="number"],
.form-group input[type="text"] {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.btn-validate {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-validate:hover {
  background-color: #42b983;
}

.success-msg {
  color: #27ae60;
  font-weight: bold;
  background-color: #eafaf1;
  padding: 10px;
  border: 1px solid #27ae60;
  border-radius: 4px;
  margin-top: 10px;
}
</style>