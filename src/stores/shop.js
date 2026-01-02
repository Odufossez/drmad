import { ref } from 'vue'
import { defineStore } from 'pinia'

import ShopService from '@/services/shop.service'
import {shopusers} from "@/datasource/data.js";

export const useShopStore = defineStore('shop', () => {

  const viruses = ref([]);
  const shopUser = ref(null)
  const basket = ref({items: []})

  async function shopLogin(data) {
    let response = await ShopService.shopLogin(data)
    if (response.error === 0) {
      shopUser.value = response.data
      await initBasket() // On récupère le panier de l'utilisateur qui vient de se connecter
    }
    return response
  }

  function logout() {
    shopUser.value = null
  }

  async function getAllViruses() {
    console.log('récupération des viruses');
    let response = await ShopService.getAllViruses()
    if (response.error === 0) {
      viruses.value = response.data
    }
    else {
      console.log(response.data)
    }
  }

  async function addToBasket(selection) {
    console.log(selection);
    const itemsToAdd = Array.isArray(selection) ? selection : [selection];

    itemsToAdd.forEach(itemSelection => {
      let virusID;
      let amountToAdd = itemSelection.amount || 1; //1 par def

      if (itemSelection.index !== undefined) {
        //selection depuis la checked list (on a passé un tableau)
        const virus = viruses.value[itemSelection.index];
        virusID = virus._id;
      } else {
        virusID = itemSelection._id;
      }

      const existing = basket.value.items.find(entry => entry.item === virusID);

      if (existing) {
        existing.amount += amountToAdd;
      } else {
        basket.value.items.push({ item: virusID, amount: amountToAdd });
      }
    });

    // On enregistre dans la source locale (BdD simulée)
    await ShopService.updateBasket(shopUser.value._id, basket.value);
  }

  async function removeFromBasket(index) {
    // On supprime l'élément du tableau local
    basket.value.items.splice(index, 1);

    // On synchronise avec la source locale
    await ShopService.updateBasket(shopUser.value._id, basket.value);
  }

  async function initBasket() {
    if (!shopUser.value) return
    let response = await ShopService.getBasket(shopUser.value._id)
    if (response.error === 0) {
      basket.value = response.data
    }
  }

  async function clearBasket() {
    basket.value = { items: [] };
    if (shopUser.value) {
      await ShopService.updateBasket(shopUser.value._id, basket.value);
    }
  }

  async function fetchUserOrders() {
    if (!shopUser.value) return;
    const response = await ShopService.getUserOrders(shopUser.value._id);
    if (response.error === 0) {
      //maj bdd
      shopUser.value.orders = response.data;
    }
  }

  async function cancelOrder(uuid) {
    if (!shopUser.value) return;
    const response = await ShopService.cancelOrder(shopStore.shopUser._id, uuid);
    if (response.error === 0) {
      await fetchUserOrders();
    }
  }


  return {
    viruses,
    shopUser,
    basket, // export du panier
    shopLogin,
    getAllViruses,
    addToBasket,
    removeFromBasket,
    logout,
    initBasket,
    clearBasket,
    fetchUserOrders,
    cancelOrder
  }
})