<script setup lang="ts">
import Header from '@/components/Header.vue'
import Nav from '../components/Nav.vue';
</script>

<template>
  <div class="flex-row home">
    <Header />
    <router-view />
  </div>
</template>


<style scoped>
.home {
  height: 100vh;
}
</style>
