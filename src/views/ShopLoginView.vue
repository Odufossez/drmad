<template>
  <div>
    <h1>Login</h1>

    <span>login</span><input type="text" v-model="username" id="username"> <br>
    <span>password</span><input type="password" v-model="password" id="password">
    <button @click="authentification">Login</button>
    <p v-if="shopStore.shopUser">{{shopStore.shopUser}}</p>
  </div>

</template>

<script setup>
import { ref } from "vue";
import { useShopStore } from "@/stores/shop.js";
import router from "@/router/index.js";

const username = ref('')
const password = ref('')
const shopStore = useShopStore()

async function authentification() {
  const response = await shopStore.shopLogin({
    login: username.value,
    password: password.value
  })

  if (response.error === 0) {
    router.push({ name: 'shophome' });
  } else {
    alert(response.data)
    password.value = ''
    username.value = ''
  }
}
</script>
