<template>
  <div class="vertical-menu">
    <template v-for="(item, index) in items" :key="index">
      
      <div v-if="item.type === 'title'" class="menu-title">
        <slot name="menu-title" :label="item.label">
          {{ item.label }}
        </slot>
      </div>

      <span 
        v-else-if="item.type === 'link'" 
        class="menu-link" 
        @click="goTo(item.to)"
      >
        <slot name="menu-link" :label="item.label">
          <button>{{ item.label }}</button>
        </slot>
      </span>

    </template>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

// Le composant reçoit une liste d'objets { type, label, to }
const props = defineProps({
  items: Array,
})

// Fonction de navigation
function goTo(dest) {
  if (dest) {
    router.push(dest);
  }
}
</script>

<style scoped>
.vertical-menu {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacement entre les éléments */
}

.menu-title {
  margin-top: 15px; /* Un peu d'espace avant les titres */
  margin-bottom: 5px;
}

.menu-link {
  cursor: pointer;
  display: block; /* Pour que le span prenne la largeur si besoin */
}

/* Style par défaut pour le bouton si le slot n'est pas surchargé */
button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
}
</style>