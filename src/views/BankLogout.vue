<template>
  <div class="bank-logout">
    <div class="message-box">
      <h2>Déconnexion en cours...</h2>
      <p>Merci de votre visite.</p>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBankStore } from '@/stores/bank.js';

const router = useRouter();
const bankStore = useBankStore();

onMounted(() => {
  
  setTimeout(() => {
    
    bankStore.logout();
    
   
    router.push('/bank');
  }, 1000);
});
</script>

<style scoped>
.bank-logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  text-align: center;
}

.message-box {
  padding: 40px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h2 {
  color: #c0392b; /* Rouge pour symboliser la déconnexion */
  margin-bottom: 10px;
}

/* Petit spinner simple en CSS */
.spinner {
  margin: 20px auto 0;
  width: 30px;
  height: 30px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #c0392b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>