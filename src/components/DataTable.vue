<template>
  <div class="data-table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-if="itemCheck">select.</th>

          <th v-for="(header, index) in headers" :key="index">
            {{ header.label }}
          </th>

          <th v-if="itemButton">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          
          <td v-if="itemCheck">
            <input 
              type="checkbox" 
              :value="item" 
              v-model="selectedItems"
            />
          </td>

          <td v-for="(header, hIndex) in headers" :key="hIndex">
            {{ item[header.name] }}
          </td>

          <td v-if="itemButton">
            <button @click="onItemClick(item)">
              <slot name="item-button">Action</slot>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="tableButton" class="table-actions">
      <button @click="onTableClick">
        <slot name="table-button">Valider sélection</slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1. Définition des Props
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
    // Format attendu: [{ label: 'Titre', name: 'cle_objet' }, ...]
  },
  itemCheck: {
    type: Boolean,
    default: false
  },
  itemButton: {
    type: Boolean,
    default: false
  },
  tableButton: {
    type: Boolean,
    default: false
  }
});

// 2. Définition des Événements
const emit = defineEmits(['itemClicked', 'tableClicked']);

// 3. État local pour gérer les sélections (cases à cocher)
const selectedItems = ref([]);

// 4. Gestionnaire de clic pour le bouton de ligne
function onItemClick(item) {
  emit('itemClicked', item);
}

// 5. Gestionnaire de clic pour le bouton global
function onTableClick() {
  // On envoie la liste des objets qui ont été cochés
  emit('tableClicked', selectedItems.value);
}
</script>

<style scoped>
.data-table-container {
  margin: 20px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tr:hover {
  background-color: #f1f1f1;
}

.table-actions {
  text-align: right; /* Place le bouton global à droite */
}

button {
  cursor: pointer;
  padding: 5px 10px;
}
</style>