<script setup>
import { ref } from 'vue'
const count = ref(0)
setInterval(() => {
  count.value = count.value + 1;
}, 1000);
</script>

<template>
<div>count: {{ count }}</div>
</template>

<style>
</style>
