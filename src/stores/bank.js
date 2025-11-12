import { ref } from 'vue'
import { defineStore } from 'pinia'

import BankService from '@/services/bankaccount.service.js'


export const useBankStore = defineStore('bank', () => {
    let accountAmount = ref(0);
    let accountTransactions = ref([]);

    async function getAccountAmount (number) {;
        let response = await BankService.getAccountAmount(number);
        console.log(response);
        if (response.error === 0 ){
            accountAmount.value = response.data;
        } else {
            console.log(response.data);
        }
    }

    async function getAccountTransaction(number){
        let response = await BankService.getAccountTransaction(number);
        if (response.error === 0 ){
            accountTransactions.value = response.data;
        } else {
            console.log(response.data);
        }
    }

    return {accountAmount, getAccountAmount , accountTransactions, getAccountTransaction};
});




