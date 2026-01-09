// import LocalSource from "@/services/localsource.service.js";

// /**
//  *
//  * @param number
//  */
// function getAccountAmountFromLocalSource(number)  {
//     return LocalSource.getAccountAmount(number);
// }

// function getTransactionFromLocalSource(number){
//     return LocalSource.getAccountTransactions(number);
// }



// /**
//  *
//  * @param number
//  */
// async function getAccountAmount(number) {
//     let response = null;
//     try {
//         response = await getAccountAmountFromLocalSource(number);
//     } catch (error) {
//         response = {error: 1, statusCode: 500, data: error};
//     }
//     return response;
// }

// async function getAccountTransaction(number){
//     let response=null;
//     try {
//         response = await getTransactionFromLocalSource(number);
//     } catch(error){
//         response = {error: 1, status: 500, data: error};
//     }
//     return response;
// }

// export default {
//     getAccountAmount,
//     getAccountTransaction,
// }





import LocalSource from "@/services/localsource.service.js";

// --- Fonctions Secondaires (appels directs à la source locale) ---

function getAccountFromLocalSource(number) {
    return LocalSource.getAccount({number: number});
}

function getTransactionsFromLocalSource(idAccount) {
    return LocalSource.getTransactions({idAccount: idAccount});
}

function createWithdrawFromLocalSource(idAccount, amount) {
    return LocalSource.createWithdraw({idAccount: idAccount, amount: amount});
}

function createPaymentFromLocalSource(idAccount, amount, destNumber) {
    return LocalSource.createPayment({idAccount: idAccount, amount: amount, destNumber: destNumber});
}

// On garde les anciennes fonctions secondaires si elles sont utilisées ailleurs
function getAccountAmountFromLocalSource(number)  {
    return LocalSource.getAccountAmount(number);
}
function getTransactionFromLocalSource(number){
    return LocalSource.getAccountTransactions(number);
}


// --- Fonctions Principales (appels depuis le store/composants) ---

async function getAccount(number) {
    let response = null;
    try {
        response = await getAccountFromLocalSource(number);
    } catch (error) {
        response = {error: 1, status: 500, data: error};
    }
    return response;
}

async function getTransactions(idAccount) {
    let response = null;
    try {
        response = await getTransactionsFromLocalSource(idAccount);
    } catch (error) {
        response = {error: 1, status: 500, data: error};
    }
    return response;
}

async function createWithdraw(idAccount, amount) {
    let response = null;
    try {
        response = await createWithdrawFromLocalSource(idAccount, amount);
    } catch (error) {
        response = {error: 1, status: 500, data: error};
    }
    return response;
}

async function createPayment(idAccount, amount, destNumber) {
    let response = null;
    try {
        response = await createPaymentFromLocalSource(idAccount, amount, destNumber);
    } catch (error) {
        response = {error: 1, status: 500, data: error};
    }
    return response;
}

// Anciennes fonctions principales conservées
async function getAccountAmount(number) {
    let response = null;
    try {
        response = await getAccountAmountFromLocalSource(number);
    } catch (error) {
        response = {error: 1, statusCode: 500, data: error};
    }
    return response;
}

async function getAccountTransaction(number){
    let response=null;
    try {
        response = await getTransactionFromLocalSource(number);
    } catch(error){
        response = {error: 1, status: 500, data: error};
    }
    return response;
}

export default {
    getAccount,
    getTransactions,
    createWithdraw,
    createPayment,
    getAccountAmount,
    getAccountTransaction
}