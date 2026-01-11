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


const props = defineProps({
  items: Array,
})


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
  gap: 10px; 
}

.menu-title {
  margin-top: 15px; 
  margin-bottom: 5px;
}

.menu-link {
  cursor: pointer;
  display: block; 
}


button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
}
</style>