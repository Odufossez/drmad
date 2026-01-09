<template>
  <div class="bank-view">
    <NavBar :links="navLinks" />

    <div class="bank-layout">
      <div class="menu-column">
        <VerticalMenu :items="menuItems">
          <template #menu-title="{ label }">
            <b><u>{{ label }}</u></b>
          </template>
        </VerticalMenu>
      </div>

      <div class="content-column">
        
        <router-view name="bankmain">
          
          <template #account-amount="{ amount }">
            <input 
              type="text" 
              readonly 
              :value="amount + ' €'"
              :class="amount >= 0 ? 'solde-positif' : 'solde-negatif'"
              class="solde-input"
            >
          </template>

        </router-view>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/VerticalMenu.vue"; 

const navLinks = ref([
  { label: "Mon compte", to: "/bank/account" }
]);

const menuItems = ref([
  { type: "title", label: "Opérations" },
  { type: "link", label: "Solde", to: "/bank/amount" },
  { type: "link", label: "Débit/Virement", to: "/bank/operation" },
  { type: "title", label: "États" },
  { type: "link", label: "Historique", to: "/bank/history" }
]);
</script>

<style scoped>
.bank-layout {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 80px); 
}

.menu-column {
  width: 250px;
  background-color: #f9f9f9;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.content-column {
  flex: 1;
  padding: 20px;
}

/* --- NOUVEAUX STYLES POUR LE SOLDE --- */
.solde-input {
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: right;
}

.solde-positif {
  color: green;
  background-color: #e8f5e9;
  border-color: green;
}

.solde-negatif {
  color: red;
  background-color: #ffebee;
  border-color: red;
}
</style>