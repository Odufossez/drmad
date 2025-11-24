<template>
  <div>
    <h1>Les virus</h1>
    <span>Filtres :</span>
    <hr/>
    <label for="filterpriceactive">par prix</label><input type="checkbox" v-model="filterPriceActive"
                                                          id="filterpriceactive">
    <label for="filternameactive">par nom</label><input type="checkbox" v-model="filterNameActive"
                                                        id="filternameactive">
    <label for="filterstockactive">par stock</label><input type="checkbox" v-model="filterStockActive"
                                                           id="filterstockactive">
    <hr/>
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

    <CheckedList
        :data="filterViruses"
        :fields="['name', 'price']"
        :item-check="true"
        :checked = "checked"
        :item-button="{show: true, text: 'Info'}"
        :list-button="{show: true, text: 'Voir sélection'}"
        @item-button-clicked="viewVirusInfo"
        @list-button-clicked="viewCheckedViruses"
        @checked-changed="changeSelected"
    />

  </div>
</template>

<script setup>
/* ***************************
  IMPORTS
 *************************** */
import {ref, computed} from "vue"
import {useShopStore} from "@/stores/shop.js";
import CheckedList from "@/components/CheckedList.vue";

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
let selected = ref([]) //contient des indices globaux
const checked = computed(() => {
  return filterViruses.value.map(v => {
    const globalIndex = shopStore.viruses.indexOf(v)
    return selected.value.includes(globalIndex)
  })
})
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

//la boite d'alerte quand on clique sur info
function viewVirusInfo(index) {
  let item = filterViruses.value[index]
  let stock = ""
  if (item.stock <= 0) stock = "non";
  else stock = "oui";
  alert("Name : " + item.name + "\nPrice : " + item.price + "\nStock : " + stock + "");
}

//la boite d'alerte quand on clique sur le bouton "Voir sélection".
function viewCheckedViruses() {
  const virusNames = selected.value
      .map(i => shopStore.viruses[i].name)
      .join(', ')
  if (virusNames.length === 0) alert("No viruses selected")
  else alert(virusNames)
}

function changeSelected(filteredIdx) {
  const virus = filterViruses.value[filteredIdx]

  // on cherche l’indice dans la liste complète
  const globalIndex = shopStore.viruses.indexOf(virus)

  const pos = selected.value.indexOf(globalIndex)

  if (pos === -1) {
    selected.value.push(globalIndex)
  } else {
    selected.value.splice(pos, 1)
  }
}


</script>
