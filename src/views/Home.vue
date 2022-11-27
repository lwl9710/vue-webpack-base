<script setup>
  import useCounterStore from "@/store/counter";
  const counterStore = useCounterStore();

</script>
<template>
  <h1>这是一个计数小程序</h1>
  <h3>当前计数器的值：{{ counterStore.count }}</h3>
  <div class="controls">
    <button @click="counterStore.increment">增加计数</button>
    <button @click="counterStore.decrement">减少计数</button>
  </div>
</template>