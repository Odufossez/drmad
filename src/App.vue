<template>
  <div class="app-container">
    <h1>Bienvenue sur DrMad App</h1>

    <NavBar :links="main_menu">
      <template #nav-button="{ label }">
        <span v-if="label === 'boutique'" style="font-weight: bold;">
          {{ label }}
        </span>
        <span v-else-if="label === 'banque'">
           <!-- <img src="@/assets/bank.png" alt="banque" style="height: 20px; vertical-align: middle;"/> -->
           Banque
        </span>
        <span v-else>
          {{ label }}
        </span>
      </template>
    </NavBar>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";

const main_menu = ref([
  { label: 'boutique', to: '/shop' },
  { label: 'banque', to: '/bank/account' } 
]);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

body {
  font-family: 'Lato', sans-serif;
  text-align: center;
}
</style>