<template>
  <div>
    <h1>Les virus</h1>
    <span>Filtres :</span>
    <hr />
    <label for="filterpriceactive">par prix</label><input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <label for="filternameactive">par nom</label><input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <label for="filterstockactive">par stock</label><input type="checkbox" v-model="filterStockActive" id="filterstockactive">
    <hr />
    <table>
      <tbody>
      <tr>
        <td v-if="filterPriceActive">
          <label for="filterprice">prix inférieur à : </label><input v-model="priceFilter" id="filterprice">
        </td>
        <td v-if="filterNameActive">
          <label for="filtername">nom contient : </label><input v-model="nameFilter" id="filtername">
        </td>
        <td v-if="filterStockActive">
          <label for="filterstock">en stock</label><input type="checkbox" v-model="stockFilter" id="filterstock">
        </td>
      </tr>
      </tbody>
    </table>
    <hr />

    <!-- version avec liste séparée : décommenter pour tester

    <p>Liste filtrée par prix</p>
    <ul>
      <li v-for="(virus, index) in filterVirusesByPrice" :key="index">{{virus.name}} : {{virus.price}}</li>
    </ul>
    <hr />
    <p>Liste filtrée par nom</p>
    <ul>
      <li v-for="(virus, index) in filterVirusesByName" :key="index">{{virus.name}} : {{virus.price}}</li>
    </ul>
    <hr />
    <p>Liste filtrée par stock</p>
    <table>
      <tbody>
      <tr>
        <th>Nom</th><th>Prix</th>
      </tr>
      <tr v-for="(virus, index) in filterVirusesByStock" :key="index">
        <td>{{virus.name}}</td>
        <td>{{virus.price}}</td>
      </tr>
      </tbody>
    </table>

    -->

    <!-- version avec filtre multi-critères -->
    <table>
      <tbody>
      <tr>
        <th>Nom</th><th>Prix</th>
      </tr>
      <tr v-for="(virus, index) in filterViruses" :key="index">
        <td>{{virus.name}}</td>
        <td>{{virus.price}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
/* ***************************
  IMPORTS
 *************************** */
import {ref, computed} from "vue"
import {useShopStore} from "@/stores/shop.js";

/* ***************************
  STATE
 *************************** */
const shopStore = useShopStore()
const priceFilter = ref(0)
const nameFilter = ref('')
const stockFilter = ref(true)
const filterPriceActive = ref(false)
const filterNameActive = ref(false)
const filterStockActive = ref(false)

/* ***************************
  COMPUTED
 *************************** */
const filterVirusesByPrice = computed(() => {
  // active filter => get filtered list
  if (filterPriceActive.value) {
    let price = parseInt(priceFilter.value)
    if (isNaN(price)) return []
    if (price > 0) return shopStore.viruses.filter(v => v.price < price)
  }
  return shopStore.viruses
})

const filterVirusesByName = computed(() => {
  // active filter => get filtered list
  if (filterNameActive.value) {
    if (nameFilter.value) return shopStore.viruses.filter(v => v.name.includes(nameFilter.value))
  }
  return shopStore.viruses
})

const filterVirusesByStock = computed(() => {
  // active filter => get filtered list
  if (filterStockActive.value) {
    if (stockFilter.value) return shopStore.viruses.filter(v => v.stock > 0)
  }
  return shopStore.viruses
})

/**
 * filterViruses ne peut pas réutiliser les 3 fonctions précédentes puisqu'elles
 * utilisent toutes comme base shopStore.viruses. Or, s'il y a plus de un filtre,
 * il faut faire un filtrage cumulatif, donc reprendre le résultat du filtre précédent
 * @type {ComputedRef<[]>}
 */
const filterViruses = computed(() => {
  let list = shopStore.viruses
  if (filterPriceActive.value) {
    let price = parseInt(priceFilter.value)
    if ((!isNaN(price)) && (price > 0)) {
      list = list.filter(v => v.price < price)
    }
  }
  if (filterNameActive.value) {
    if (nameFilter.value) list = list.filter(v => v.name.includes(nameFilter.value))
  }
  if (filterStockActive.value) {
    if (stockFilter.value) list = list.filter(v => v.stock > 0)
  }
  return list
})

</script>
