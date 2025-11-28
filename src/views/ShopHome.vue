<script setup>

import NavBar from "@/components/NavBar.vue";
import router from "@/router/index.js";
</script>

<template>
<H1>Bienvenue dans la boutique de Dr MAD veuillez vous connecter : </H1>
  <NavBar :titles="[{text:'Login',color:'green'}]" @menu-clicked="(route)=>{
    $router.push($router.getRoutes().path?$router.getRoutes()[route].path:'/shop/login')
  }"></NavBar>

</template>

<style scoped>

</style>