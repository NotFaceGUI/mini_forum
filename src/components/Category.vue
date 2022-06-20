<template>
    <div class="flex-column flex1 view_width fixed right">
        <Login />
        <Hotspot />
    </div>
</template>

<script setup lang="ts">
import Hotspot from './Hotspot.vue';
import Login from './Login.vue';
import Post from './Post.vue';
</script>

<style scoped>
.right {
    z-index: 10;
}

</style>