<template>
  <div class="bank-history">
    <div class="history-header">
      <slot name="title">
        <h2>Opérations passées</h2>
      </slot>
    </div>

    <div class="filter-section">
      <label class="filter-toggle">
        <input type="checkbox" v-model="filterEnabled">
        Filtrer par période
      </label>

      <div v-if="filterEnabled" class="date-inputs">
        <div class="input-group">
          <label for="start-date">Du :</label>
          <input 
            type="date" 
            id="start-date" 
            v-model="startDate"
          >
        </div>
        <div class="input-group">
          <label for="end-date">Au :</label>
          <input 
            type="date" 
            id="end-date" 
            v-model="endDate"
          >
        </div>
      </div>
    </div>

    <DataTable 
      :headers="headers" 
      :items="filteredTransactions" 
      itemCheck 
      itemButton 
      tableButton
      @itemClicked="onItemClick"
      @tableClicked="onTableClick"
    >
      <template #item-button>
        Détails
      </template>

      <template #table-button>
        Voir
      </template>
    </DataTable>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useBankStore } from '@/stores/bank.js';
import DataTable from '@/components/DataTable.vue';

const bankStore = useBankStore();

// --- Configuration du DataTable ---
const headers = ref([
  { label: 'Montant', name: 'amountDisplay' },
  { label: 'Date', name: 'dateDisplay' },
  { label: 'Type', name: 'type' }
]);

// --- État du Filtrage ---
const filterEnabled = ref(false);
const startDate = ref('');
const endDate = ref('');

// --- Logique de Validation des Dates ---

// Si startDate change, on vérifie si elle est postérieure à endDate
watch(startDate, (newStart) => {
  if (newStart && endDate.value && newStart > endDate.value) {
    // Si Date Début > Date Fin, on efface Date Début (selon la consigne inversée, 
    // "si le deuxième champ est déjà rempli et qu'on tape une date POSTÉRIEURE dans le premier")
    // Mais la consigne dit : "ce dernier est vidé". Ici "ce dernier" = le champ qu'on vient de taper (premier).
    startDate.value = '';
    alert("La date de début ne peut pas être postérieure à la date de fin.");
  }
});

// Si endDate change, on vérifie si elle est antérieure à startDate
watch(endDate, (newEnd) => {
  if (newEnd && startDate.value && newEnd < startDate.value) {
    // Si Date Fin < Date Début, on efface Date Fin
    endDate.value = '';
    alert("La date de fin ne peut pas être antérieure à la date de début.");
  }
});

// --- Calcul et Filtrage des Transactions ---
const filteredTransactions = computed(() => {
  // 1. Récupération des transactions brutes
  let transactions = bankStore.transactions || [];

  // 2. Transformation pour l'affichage (Mapping)
  // On crée un nouvel objet pour chaque ligne pour faciliter l'affichage dans le DataTable
  let processed = transactions.map(t => {
    // Gestion de la date : formatage et récupération de l'objet Date pour le tri
    // Note : dans data.js, la date est souvent sous la forme { $date: "..." }
    const rawDateStr = t.date.$date || t.date; 
    const dateObj = new Date(rawDateStr);
    
    return {
      ...t, // On garde les propriétés originales (uuid, etc.)
      rawDate: dateObj, // Utile pour le tri et filtrage
      amountDisplay: t.amount + ' €',
      dateDisplay: dateObj.toLocaleDateString(),
      type: t.amount < 0 ? 'S' : 'D' // S = Source (négatif), D = Destination (positif)
    };
  });

  // 3. Filtrage par date (si activé)
  if (filterEnabled.value) {
    if (startDate.value) {
      const start = new Date(startDate.value);
      // On met start à 00:00:00 pour inclure toute la journée
      start.setHours(0,0,0,0);
      processed = processed.filter(t => t.rawDate >= start);
    }
    
    if (endDate.value) {
      const end = new Date(endDate.value);
      // On met end à 23:59:59 pour inclure toute la journée
      end.setHours(23,59,59,999);
      processed = processed.filter(t => t.rawDate <= end);
    }
  }

  // 4. Tri Chronologique Décroissant (plus récent en premier)
  processed.sort((a, b) => b.rawDate - a.rawDate);

  return processed;
});

// --- Gestion des Événements ---

function onItemClick(item) {
  // Affiche l'UUID de la transaction cliquée
  alert(`UUID Transaction : ${item.uuid}`);
}

function onTableClick(selectedItems) {
  // Affiche les UUIDs de toutes les transactions cochées
  if (selectedItems.length === 0) {
    alert("Aucune transaction sélectionnée.");
    return;
  }
  const uuids = selectedItems.map(i => i.uuid).join('\n');
  alert(`UUIDs sélectionnés :\n${uuids}`);
}
</script>

<style scoped>
.bank-history {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.history-header {
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #eee;
}

.filter-toggle {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-inputs {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="date"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>