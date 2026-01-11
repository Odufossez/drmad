<template>
  <div class="navbar">
    <button 
      v-for="(link, index) in links" 
      :key="index" 
      @click="goTo(link.to)"
    >
      <slot name="nav-button" :label="link.label">
        {{ link.label }}
      </slot>
    </button>
  </div>
</template>

<script setup>
import router from "@/router/index.js";


const props = defineProps({
  links: Array,
})


function goTo(dest) {
  if (dest) {
    router.push(dest);
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0;
}
.navbar button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background: #eee;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.navbar button:hover {
  background: #2196F3;
  color: #fff;
}
</style>