<template>
  <div class="navbar">
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
.navbar {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0;
}
.navbar button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background: #eee;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.navbar button:hover {
  background: #2196F3;
  color: #fff;
}
</style>