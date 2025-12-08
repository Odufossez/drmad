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
/* ***************************
  IMPORTS
 *************************** */
import {ref} from "vue";
import {useShopStore} from "@/stores/shop.js";
import localsourceService from "@/services/localsource.service.js";
import router from "@/router/index.js";

/* ***************************
  STATE
 *************************** */
const username = ref('')
const password = ref('')
const shopStore = useShopStore()

async function authentification(){
  //console.log("authentification -> login = " + username.value + " password = " + password.value)
  const response = await localsourceService.shopLogin({login:username.value, password:password.value})
  console.log( "Response erreur = " + response.error)
  if (response.error === 0 ){
    console.log("response error 0")
    await router.push({name: 'shopbuy'});menus
  } else {
    alert(response.data)
    password.value = ''
    username.value = ''
  }
}
</script>
