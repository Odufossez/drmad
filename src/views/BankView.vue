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
        <router-view name="bankmain"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/VerticalMenu.vue"; 

// Configuration de la NavBar pour la banque
const navLinks = ref([
  { label: "Mon compte", to: "/bank/account" }
]);

// Configuration du Menu Vertical avec titres et liens
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
  min-height: calc(100vh - 80px); /* Ajustement selon la hauteur de la navbar */
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
</style>