<template>
  <div class="navbar" id="navbar">
    <button v-for="(item,index) in titles" :key="index" :style="{color:item.color}" @click="goTo(index)">
      {{item.text}}
    </button>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

const props = defineProps({
  titles: Array,
})
defineEmits(["menuClicked"]);


function goTo(linkedIndex){
  try{
    router.push(props.titles[linkedIndex].routing)
  } catch (e){
    console.log(e)
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