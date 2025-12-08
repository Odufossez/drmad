<template>
  <div class="checked-list">
    <table v-if="data && data.length > 0">
      <tbody>
        <tr v-for="(item, index) in data" :key="index" class="list-item">
          <td v-if="itemCheck" class="checkbox-cell">
            <input
              type="checkbox"
              :checked="checked && checked[index]"
              @change="emit('checked-changed', index)"
            />
          </td>

          <!-- Affichage des champs demandés -->
          <td v-for="field in fields" :key="field" class="data-cell">
            {{ item[field] }}
          </td>

          <!-- Bouton d'item si itemButton.show est true -->
          <td v-if="itemButton && itemButton.show" class="button-cell">
            <span v-if="itemAmount">
              <input type="number" v-model="amounts[index]" class="amount-input" />
            </span>
            <!-- Button info-->
            <button @click="itemButtonClicked(index)">
              {{ itemButton.text }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Bouton de liste si listButton.show est true -->
    <button
      v-if="listButton && listButton.show"
      @click="listButtonClicked"
      class="list-button"
    >
      {{ listButton.text }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: Array,
  fields: Array, 
  itemCheck: Boolean,
  checked: Array, 
  itemButton: Object, // l'objet pour les boutons d'items
  listButton: Object, // l'objet pour le bouton de liste
  itemAmount: Boolean,
})

const emit = defineEmits(['checked-changed', 'item-button-clicked', 'list-button-clicked'])

const amounts = ref([]);

watch(() => props.data, (newData) => {
  if (newData) {
    amounts.value = new Array(newData.length).fill(1);
  }
}, { immediate: true });

function itemButtonClicked(index) {
  if (props.itemAmount) {
    emit('item-button-clicked', { index, amount: amounts.value[index] });
  } else {
    emit('item-button-clicked', index);
  }
}

function listButtonClicked() {
  if (props.itemAmount) {
    const selected = [];
    if (props.checked) {
      props.checked.forEach((isChecked, index) => {
        if (isChecked) {
          selected.push({ index, amount: amounts.value[index] });
          selected.checked = false; //déselectionne la case
        }
      });
    }
    emit('list-button-clicked', selected);
  } else {
    emit('list-button-clicked');
  }
}
</script>

<style scoped>



.checked-list {
  font-family: 'Lato', Arial, sans-serif;
  margin: 32px auto;
  padding: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  max-width: 700px;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-item:hover {
  background-color: #f0f0f0;
  transition: background 0.2s;
}

table {
  width: 80%;
  max-width: 700px;
  border-collapse: separate;
  border-spacing: 0 10px; /* espace vertical entre les lignes */
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.data-cell,
.checkbox-cell,
.button-cell {
  padding: 16px 12px; /* espace horizontal et vertical dans chaque cellule */
  font-size: 16px;
}

.list-item {
  border-bottom: 1px solid #eee;
}

.checkbox-cell {
  width: 32px;
  text-align: center;
}

.data-cell {
  padding: 8px;
  color: #222;
  font-size: 15px;
}

.button-cell {
  text-align: center;
  padding: 8px;
}

.button-cell button {
  padding: 4px 10px;
  background: #2196F3;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.button-cell button:hover {
  background: #1976D2;
}

.list-button {
  padding: 8px 16px;
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 8px;
}

.list-button:hover {
  background: #388E3C;
}

.amount-input {
  width: 50px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>