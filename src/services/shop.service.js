import LocalSource from "@/services/localsource.service.js";

async function shopLoginFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLogin(data) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await shopLoginFromLocalSource(data)
  }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
  }
  return response
}


async function getAllViruses() {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAllVirusesFromLocalSource()
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
  }
  return response
}

async function updateBasket(userId, basket) {
  return LocalSource.updateBasket(userId, basket)
}

async function getBasket(userId) {
  return LocalSource.getBasket(userId)
}

async function orderBasket(userId, basket) {
  return LocalSource.orderBasket(userId, basket)
}

async function getOrder(userId, orderId) {
  return LocalSource.getOrder(userId, orderId)
}

async function payOrder(userId, orderId) {
  return LocalSource.payOrder(userId, orderId)
}

async function getUserOrders(userId) {
  return LocalSource.getUserOrders(userId);
}

async function cancelOrder(userId, uuid) {
  return LocalSource.cancelOrder(userId, uuid);
}

export default {
  shopLogin,
  getAllViruses,
  updateBasket,
  getBasket,
  orderBasket,
  getOrder,
  payOrder,
  getUserOrders,
  cancelOrder
}