import LocalSource from "@/services/localsource.service.js";

/**
 *
 * @param number
 */
function getAccountAmountFromLocalSource(number)  {
    return LocalSource.getAccountAmount(number);
}

function getTransactionFromLocalSource(number){
    return LocalSource.getAccountTransactions(number);
}



/**
 *
 * @param number
 */
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
    getAccountAmount,
    getAccountTransaction,
}