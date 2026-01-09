import { items, shopusers, bankaccounts, transactions } from '@/datasource/data.js'
import {v4 as uuidv4} from 'uuid'
import bcryptjs from 'bcryptjs'

/* Les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Il est fortement conseillé que ces paramètres soient les mêmes que ceux qu'il faudrait envoyer à l'API.

  IMPORTANT : toutes les requêtes à l'API DOIVENT renvoyer un objet JSON au format {error: ..., status: ..., data: ...}
  Cela implique que toutes les foncitons ci-dessous renvoient un objet selon ce format.
 */

/**
 * Si le login et le mot de passe sont fournis, que le login correspond à un utilisateur existant,
 * shopLogin() renvoie un objet contenant uniquement l'id, le nom, le login, l'email
 * et un identifiant de session sous forme d'un uuid. Sinon, un texte d'erreur est renvoyé.
 * NB: pas de test du mot de passe dans cet exemple.
 * @param data
 * @returns {{error: number, status: number, data: string}|{error: number, status: number, data: {_id: string | *, name: string | *, login: string | *, email: string | *, session}}}
 */
// async function shopLogin(data) {
//     console.log("Data :" + data.login + " " + data.password);
//   if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
//   // pour simplifier : test uniquement le login
//   let user = shopusers.find(e => e.login === data.login)
//   if (!user) return {error: 1, status: 404, data: 'login incorrect'}
//   console.log(user);
//   let mdp = bcryptjs.compareSync(data.password, user.password);
//   console.log(mdp);
//   if (!mdp) return {error: 1, status: 404, data: 'pass incorrect'}

//     if (!user.session) {
//         user.session = uuidv4()
//     }

//     let userRole = 'user'; // Par défaut
//     if (user.login === 'drmad') {
//         userRole = 'admin';
//     }

//   // retourne uniquement les champs nécessaires
//   let u = {
//     _id: user._id,
//     name: user.name,
//     login: user.login,
//     email: user.email,
//     session: user.session,
//       role: userRole
//   }
//   return {error: 0, status: 200, data: u}
// }
async function shopLogin(data) {
    console.log("Data :" + data.login + " " + data.password);
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  let user = shopusers.find(e => e.login === data.login)
  if (!user) return {error: 1, status: 404, data: 'login incorrect'}
  let mdp = bcryptjs.compareSync(data.password, user.password);
  if (!mdp) return {error: 1, status: 404, data: 'pass incorrect'}

    if (!user.session) {
        user.session = uuidv4()
    }

    let userRole = 'user';
    if (user.login === 'drmad') {
        userRole = 'admin';
    }

  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session,
      role: userRole
  }
  return {error: 0, status: 200, data: u}
}

/**
 * getAllViruses() renvoie un tableau d'items dont le format est le même que celui stockée en source locale (donc aussi en BdD côté API)
 * @returns {{error: number, data}}
 */
function getAllViruses() {
  return {error: 0, data: items}
}

/**
 * Si un n° est fourni et qu'il correspond à un compte existant, getAccountAmount() renvoie uniquement le solde
 * du compte, sinon un texte d'erreur.
 * @param number
 * @returns {{error: number, status: number, data: string}|{error: number, status: number, data: number | *}}
 */
function getAccountAmount(number) {
    if (!number) {
        return {error: 1, status: 404, data: 'aucun numero fourni'};
    }
    const account = bankaccounts.find(a => a.number === number);
    if (!account) {
        return {error: 1, status: 404, data: 'account n\'existe pas '};
    }
    return {error:0 , status: 200, data: account.amount};
}

/**
 * Si un n° est fourni et qu'il correspond à un compte existant, getAccountTransactions() renvoie uniquement le solde
 * du compte, sinon un texte d'erreur.
 * @param number
 * @returns {{error: number, status: number, data: ({_id: string, amount: number, account: string, date: {$date: string}, uuid: string}|{_id: string, amount: number, account: string, date: {$date: string}, uuid: string}|{_id: string, amount: number, account: string, date: {$date: string}, uuid: string})[]}|{error: number, status: number, data: string}}
 */
function getAccountTransactions(number) {
  if(!number){
      return {error: 1, status: 404 , data : 'no account number'};
  }
  const account = bankaccounts.find(a=> a.number === number);
  if (!account) {
      return {error:1 , status:404 , data: 'nbr account nop'};
  }
  const transact = transactions.filter(t => t.account===account._id);
  if(!transact){
      return {error: 0, status: 200 , data: 'pas de transaction pour ce compte'};
  } else {
      return {error: 0, status: 200, data: transact};
  }
}

//maj du panier quand un utilisateur se connecte
function updateBasket(userId, content) {
    let user = shopusers.find(e => e._id === userId);
    if (user) {
        user.basket = JSON.parse(JSON.stringify(content));
        return { error: 0, status: 200, data: 'Panier mis à jour' }
    }
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' }
}

function getBasket(userId) {
    let user = shopusers.find(u => u._id === userId)
    if (user) {
        if (!user.basket) {
            user.basket = { items: [] }
        }
        let basket = JSON.parse(JSON.stringify(user.basket))
        return { error: 0, status: 200, data: basket }
    }
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' }
}

function orderBasket(userId, basket) {
    let user = shopusers.find(u => u._id === userId);
    if (!user) return { error: 1, data: "User not found" };

    let total = 0;
    const orderItems = [];

    basket.items.forEach(basketEntry => {
        const virus = items.find(v => v._id === basketEntry.item);
        if (virus) {
            total += virus.price * basketEntry.amount;
            orderItems.push({
                item: { ...virus },
                amount: basketEntry.amount
            });
        }
    });

    const newOrder = {
        items: orderItems,
        date: new Date(),
        total: total,
        status: 'waiting_payment',
        uuid: uuidv4()
    };

    if (!user.orders) user.orders = [];
    user.orders.push(newOrder);

    return { error: 0, status: 200, data: { uuid: newOrder.uuid } };
}

function getOrder(userId, orderId) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) return { error: 1, data: "User not found" };
    const order = user.orders.find(o => o.uuid === orderId);
    if (!order) return { error: 1, data: "Order not found" };
    return { error: 0, status: 200, data: order };
}

// function payOrder(userId, orderId) {
//     const user = shopusers.find(u => u._id === userId);
//     if (!user) return { error: 1, data: "User not found" };
//     const order = user.orders.find(o => o.uuid === orderId);
//     if (!order) return { error: 1, data: "Order not found - Payment impossible" };
//     order.status = 'finalized';
//     return { error: 0, status: 200, data: order };
// }

function payOrder(userId, orderData) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) return { error: 1, data: "User not found" };

    const targetUuid = orderData.uuid || orderData; 
    const order = user.orders.find(o => o.uuid === targetUuid);
    
    if (!order) return { error: 1, data: "Order not found - Payment impossible" };

    const transactionUuid = orderData.transactionUuid;
    if (!transactionUuid) {
        return { error: 1, data: "Transaction UUID missing" };
    }

    const transaction = transactions.find(t => t.uuid === transactionUuid);
    if (!transaction) {
        return { error: 1, data: "Transaction bancaire introuvable" };
    }

    if (transaction.amount !== -order.total) {
        return { error: 1, data: "Le montant de la transaction ne correspond pas" };
    }

    if (transaction.destination !== "65d721c44399ae9c8321832c") {
        return { error: 1, data: "Le destinataire n'est pas la boutique" };
    }

    order.status = 'finalized';
    return { error: 0, status: 200, data: order };
}

function getUserOrders(userId) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) return { error: 1, data: "User not found" };
    const orders = user.orders || [];
    return { error: 0, status: 200, data: orders };
}

function cancelOrder(userId, uuid) {
    const user = shopusers.find(u => u._id === userId);
    if (!user || !user.orders) return { error: 1, data: "Commande introuvable" };

    const order = user.orders.find(o => o.uuid === uuid);
    if (order) {
        order.status = 'cancelled';
        return { error: 0, status: 200, data: "Commande annulée" };
    }
    return { error: 1, data: "Échec de l'annulation" };
}

function getAccount(data) {
  if (!data.number) return { error: 1, status: 404, data: 'aucun numero fourni' };
  let account = bankaccounts.find(a => a.number === data.number);
  if (account) {
    return { error: 0, status: 200, data: JSON.parse(JSON.stringify(account)) };
  }
  return { error: 1, status: 404, data: 'numéro de compte invalide' };
}

function getTransactions(data) {
    if (!data.idAccount) return { error: 1, status: 404, data: 'aucun id de compte fourni' };
    let trans = transactions.filter(t => t.account === data.idAccount);
    if (trans && trans.length > 0) {
        return { error: 0, status: 200, data: JSON.parse(JSON.stringify(trans)) };
    }
    return { error: 1, status: 404, data: 'aucune transaction pour ce compte' };
}

function createWithdraw(data) {
    let account = bankaccounts.find(a => a._id === data.idAccount);
    if (!account) return { error: 1, status: 404, data: 'id de compte invalide' };
    
    // Valeur absolue pour le calcul
    let amountVal = Math.abs(data.amount); 
    
    let newTrans = {
        _id: uuidv4(),
        amount: -amountVal, // Montant négatif
        account: data.idAccount,
        date: { $date: new Date().toISOString() },
        uuid: uuidv4()
    };
    
    transactions.push(newTrans);
    account.amount -= amountVal;
    
    return { error: 0, status: 200, data: { uuid: newTrans.uuid, amount: account.amount } };
}

function createPayment(data) {
     let senderAccount = bankaccounts.find(a => a._id === data.idAccount);
     if (!senderAccount) return { error: 1, status: 404, data: 'id de compte invalide' };
     
     let destAccount = bankaccounts.find(a => a.number === data.destNumber);
     if (!destAccount) return { error: 1, status: 404, data: 'compte destinataire inexistant' };
     
     let amountVal = Math.abs(data.amount);
     let date = { $date: new Date().toISOString() };
     
     // Transaction 1: Débit expéditeur
     let transDebit = {
         _id: uuidv4(),
         amount: -amountVal,
         account: senderAccount._id,
         date: date,
         uuid: uuidv4(),
         destination: destAccount._id
     };
     
     // Transaction 2: Crédit destinataire
     let transCredit = {
         _id: uuidv4(),
         amount: amountVal,
         account: destAccount._id,
         date: date, // Même date
         uuid: uuidv4() // UUID différent
     };
     
     transactions.push(transDebit);
     transactions.push(transCredit);
     
     senderAccount.amount -= amountVal;
     destAccount.amount += amountVal;
     
     return { error: 0, status: 200, data: { uuid: transDebit.uuid, amount: senderAccount.amount } };
}

// export default{
//     shopLogin,
//     getAllViruses,
//     getAccountAmount,
//     getAccountTransactions,
//     updateBasket,
//     getBasket,
//     orderBasket,
//     getOrder,
//     payOrder,
//     getUserOrders,
//     cancelOrder
// }

export default{
    shopLogin,
    getAllViruses,
    getAccountAmount,
    getAccountTransactions,
    updateBasket,
    getBasket,
    orderBasket,
    getOrder,
    payOrder,
    getUserOrders,
    cancelOrder,
    // Exports bancaires
    getAccount,
    getTransactions,
    createWithdraw,
    createPayment
}