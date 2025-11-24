<template>
  <div>
    <button v-for="(item,index) in titles" :key="index" :style="{color:item.color}" @click="$emit('menuClicked',index)">
      {{item.text}}
    </button>
  </div>
</template>

<script setup>
defineProps({
  titles: Array,
})
defineEmits(["menuClicked"]);

function goTo(linkedIndex){
  switch (linkedIndex){
    case 0: this.$router.push('/shop/login')
          break;
    case 1: this.$router.push('/shop/items')
          break;
    case 2: this.$router.push('/bank/account')
          break;
    default: throw Error('Not Found');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>