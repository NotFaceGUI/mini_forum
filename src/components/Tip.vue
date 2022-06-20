<template>
    <div class="tip">
        <h3 style="margin: 1px; text-align: left;margin-bottom: 3px;">Tip</h3>
        <span>{{ data }}</span>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'tip',
    props: ['data'],
    setup(props: any) {
        const data = props.data;
        return { data }
    }
})
</script>


<style scoped>
.tip {
    min-height: 50px;
    margin: 5px 5px 10px 10px;
    padding: 5px;
    padding-left: 10px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--bg_box_60);
    border: 1px solid var(--search_border);
    border-left: 5px solid var(--fg_check_color);
}

.tip>span {
    margin-left: 1px;
    font-size: 14px;
}
</style>