<script setup>
  import { ref } from "vue";
  const message = ref("Welcome to About.");
</script>
<template>
  <h1>{{ message }}</h1>
</template>