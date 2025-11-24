<template>
  <div>
    <ul>
      <li v-for="(item,index) in data" :key="index">
          <span v-if="item.itemCheck()">
            <input type="checkbox" v-model="item.checked">
          </span>
        {{ item.fields }}
        <span v-if="item.itemButton.show"><input type="button" :content="item.itemButton.text"></span>
      </li>
    </ul>
    <span v-if="listButton.show">
    <input type="button" :content="listButton.text"/>
    </span>
  </div>
</template>

<script setup>
defineProps({
  data: Array, // les données sources
  fields: Array, // le tableau contenant le nom des champs
  itemCheck: Boolean, // s'il y a des case à cocher
  checked: Array, // le tableau des cases cochées
  itemButton: Object, // l'objet pour les boutons d'items
  listButton: Object, // l'objet pour le bouton de liste
})
</script>

<style scoped>
</style>