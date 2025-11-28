<script setup>
import NavBar from "@/components/NavBar.vue";
import {ref} from "vue";

const menus = ref([
  {text:'Acheter' , color: 'blue' , routing:'/shop/buy/viruses'} ,
  {text: 'Mes commandes' , color: 'purple' , routing:'/shop/orders'} ,
  {text:'Log out',color:'red' , routing:'/shop/login'}
])

</script>

<template>
  <h1> SHOP BUY</h1>

  <NavBar :titles="menus" >  </NavBar>

</template>

<style scoped>

</style>