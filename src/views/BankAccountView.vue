<template>
  <div>
    <h1>Account data</h1>

    <span>account number</span><input v-model="number"><button @click="resetAccountNumber">Reset</button>
    <br />
    <button :disabled="!isAccountNumberValid" @click="bankStore.getAccountAmount(number)">Get amount</button>
    <button :disabled="!isAccountNumberValid" @click="bankStore.getAccountTransactions(number)">Get transactions</button>
    <p v-if="bankStore.accountNumberState===-1">invalid account number</p>
    <hr />
    <span>available amount : </span>
    <span v-if="bankStore.accountNumberState === 1" >{{bankStore.accountAmount}}</span>
    <span v-else></span>
    <hr />
    <p>passed transactions:</p>
    <div v-if="bankStore.accountNumberState === 1">
      <ul>
        <li v-for="(trans,index) in bankStore.accountTransactions" :key="index">{{trans.amount}} the {{convertDate(trans.date.$date)}}</li>
      </ul>
    </div>
    <span v-else></span>

  </div>

</template>

<script setup>
/* ***************************
  IMPORTS
 *************************** */
import {ref, computed} from "vue";
import {useBankStore} from "@/stores/bank.js";

/* ***************************
  STATE
 *************************** */
const number = ref('')
const bankStore = useBankStore()

/* ***************************
  COMPUTED
 *************************** */
const isAccountNumberValid = computed(() => {
  const rexp = RegExp('^[A-Za-z0-9]{22}-[0-9]{7}$','g')
  return rexp.test(number.value)
})

/* ***************************
  FUNCTIONS
 *************************** */
function convertDate(date) {
  let d = new Date(date)
  return d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear()+" the "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
}

function resetAccountNumber() {
  number.value = ''
  bankStore.resetAccountNumberState()
}

</script>
