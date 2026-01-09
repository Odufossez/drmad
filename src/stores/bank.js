// import { ref } from 'vue'
// import { defineStore } from 'pinia'

// import BankService from '@/services/bankaccount.service.js'


// export const useBankStore = defineStore('bank', () => {
//     let accountAmount = ref(0);
//     let accountTransactions = ref([]);

//     async function getAccountAmount (number) {;
//         let response = await BankService.getAccountAmount(number);
//         console.log(response);
//         if (response.error === 0 ){
//             accountAmount.value = response.data;
//         } else {
//             console.log(response.data);
//         }
//     }

//     async function getAccountTransaction(number){
//         let response = await BankService.getAccountTransaction(number);
//         if (response.error === 0 ){
//             accountTransactions.value = response.data;
//         } else {
//             console.log(response.data);
//         }
//     }

//     return {accountAmount, getAccountAmount , accountTransactions, getAccountTransaction};
// });




import { ref } from 'vue'
import { defineStore } from 'pinia'

import BankService from '@/services/bankaccount.service.js'

export const useBankStore = defineStore('bank', () => {
    
    // --- STATE ---
    // On stocke l'objet compte complet (id, number, amount...) ou null si pas connecté
    const account = ref(null); 
    // On stocke la liste des transactions
    const transactions = ref([]);

    // --- ACTIONS ---

    /**
     * 1. Récupère les infos d'un compte via son numéro
     * Met à jour la variable d'état 'account'
     */
    async function getAccount(number) {
        // On réinitialise d'abord pour éviter les mélanges
        account.value = null;
        transactions.value = [];

        const response = await BankService.getAccount(number);
        
        if (response.error === 0) {
            account.value = response.data;
            // Une fois le compte récupéré, on charge automatiquement ses transactions
            // (C'est souvent pratique, sinon on peut l'appeler séparément dans la vue)
            await getTransactions(account.value._id); 
        } else {
            console.log(response.data);
        }
        return response;
    }

    /**
     * 2. Récupère les transactions liées à un ID de compte
     */
    async function getTransactions(idAccount) {
        // Si aucun ID n'est fourni, on essaie de prendre celui du compte actuel
        const targetId = idAccount || (account.value ? account.value._id : null);
        
        if (!targetId) return;

        const response = await BankService.getTransactions(targetId);
        
        if (response.error === 0) {
            transactions.value = response.data;
        } else {
            // S'il n'y a pas de transactions ou erreur, on vide la liste
            transactions.value = []; 
            console.log(response.data);
        }
        return response;
    }

    /**
     * 3. Effectue un retrait (débit simple)
     * Utilise l'ID du compte actuellement stocké dans le store
     */
    async function createWithdraw(amount) {
        if (!account.value) return { error: 1, data: 'Aucun compte actif' };

        const response = await BankService.createWithdraw(account.value._id, amount);
        
        if (response.error === 0) {
            // On met à jour le solde localement pour l'affichage immédiat
            account.value.amount = response.data.amount;
            // On recharge les transactions pour voir la nouvelle ligne
            await getTransactions(account.value._id);
        }
        return response;
    }

    /**
     * 4. Effectue un virement vers un autre numéro de compte
     * Utilise l'ID du compte actuel comme émetteur
     */
    async function createPayment(amount, destNumber) {
        if (!account.value) return { error: 1, data: 'Aucun compte actif' };

        const response = await BankService.createPayment(account.value._id, amount, destNumber);
        
        if (response.error === 0) {
            // Mise à jour du solde
            account.value.amount = response.data.amount;
            // Rechargement des transactions
            await getTransactions(account.value._id);
        }
        return response;
    }

    /**
     * Action utilitaire pour la déconnexion (vidage du store)
     */
    function logout() {
        account.value = null;
        transactions.value = [];
    }

    return {
        account,
        transactions,
        getAccount,
        getTransactions,
        createWithdraw,
        createPayment,
        logout
    };
});