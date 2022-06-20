<template>
    <div class="box">
        <div>
            <span style="vertical-align: bottom;font-size: 20px;">……</span>
            <Bicycle style="width: 45px; height: 45px;vertical-align: bottom;" class="icon" @click="router.push('/')
            " />
        </div>

        <span>出了点小问题，页面似乎离家出走了呢</span>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    min-height: 200px;
    max-width: 500px;
    background-color: var(--bg_box);
    border-radius: 7px;
    border: 1px solid var(--search_border);
}

.box>span {
    font-size: 24px;
}

.icon {
    transition: color .3s;
}

.icon:hover {
    color: var(--fg_check_color);
}
</style>