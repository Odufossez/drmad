<template>
  <h1>Welcome to DrMad app</h1>
  <NavBar v-if="isAdmin()" :titles="menus_admin"/>
  <NavBar v-else-if="isUser()" :titles="menus_user"/>
  <NavBar v-else :titles="login_nav_bar"/>
  <router-view></router-view>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useShopStore} from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";
import {shopusers} from "@/datasource/data.js";

const shopStore = useShopStore();
const user_id = window.user_id;
console.log("User : " + user_id)

const login_nav_bar = ref([
  {text: 'Login' ,color: 'black' , routing: '/shop/login'}
]);

const menus_admin = ref([
  {text: 'Viruses', color: "green" , routing: '/shop/items'},
  {text: 'Shop', color: "blue" , routing: '/shop'},
  {text: 'Compte Bancaire', color: "purple" , routing: '/bank/account'},
  {text: 'Log out' , color: 'red' , routing: '/shop'}
]);

const menus_user =ref([
  {text: 'Virus' , color: 'black' , routing:''},
  {text: 'Log out' , color: 'red' , routing:'/shop'},
]);

// Dès que l'appli est lancée, on va chercher la liste des virus pour la stocker dans le store
onMounted(() => {
  shopStore.getAllViruses()
})

function isAdmin(){
  return user_id === '64762dc9066dd654632aed69' && user_id !== undefined;
}

function isUser(){
  if (user_id===undefined) return false;
  shopusers.forEach((user) => {
    return user._id === user_id
  });
}
</script>

<style scoped></style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

body {
  font-family: 'Lato',sans-serif;
}

</style>