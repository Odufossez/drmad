<template>
  <h1>Welcome to DrMad app</h1>
  <NavBar :titles="menus" @menuClicked="(route)=>{
    $router.push($router.getRoutes()[(route % $router.getRoutes().length)].path)}"></NavBar>
  <router-view></router-view>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useShopStore} from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";

const shopStore = useShopStore()

const menus = ref([
  {text: 'Viruses', color: "green"},
  {text: 'Shop Login', color: "blue"},
  {text: 'Compte Bancaire', color: "red"},
])

// Dès que l'appli est lancée, on va chercher la liste des virus pour la stocker dans le store
onMounted(() => {
  shopStore.getAllViruses()
})
</script>

<style scoped></style>
