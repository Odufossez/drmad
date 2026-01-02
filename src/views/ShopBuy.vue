<script setup>
import { ref, watch } from 'vue';
import { useShopStore } from '@/stores/shop.js';
import CheckedList from '@/components/CheckedList.vue';

const shopStore = useShopStore();

const checkedItems = ref([]);

watch(() => shopStore.viruses, (newViruses) => {
  if (newViruses) {
    checkedItems.value = new Array(newViruses.length).fill(false);
  }
}, { immediate: true });

//mise à jour de l'état de la checked box dynamique
function updateChecked(index) {
  checkedItems.value[index] = !checkedItems.value[index];
}

function onAddOne(item) {
  shopStore.addToBasket(item);
}

function onAddSelection(selection) {
  if (selection.length > 0) {
    shopStore.addToBasket(selection);
    //décocher après ajout
    checkedItems.value = checkedItems.value.map(() => false);
  }
}
</script>

<template>
  <CheckedList
      :data="shopStore.viruses"
      :fields="['name', 'price']"
      :item-check="true"
      :checked="checkedItems"
      :item-button="{ show: true, text: 'Ajouter au panier' }"
      :list-button="{ show: true, text: 'Ajouter la sélection' }"
      :item-amount="true"
      @checked-changed="updateChecked"
      @item-button-clicked="onAddOne"
      @list-button-clicked="onAddSelection"
  />
</template>