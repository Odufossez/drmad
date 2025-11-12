<template>
  <div>
    <button v-for="(item,index) in titles" :key="index" :style="{color:item.color}" @click="$emit('menuClicked',index)">
      {{item.text}}
    </button>
  </div>
</template>

<script setup>
defineProps({
  titles: Array,
})
defineEmits(["menuClicked"]);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>