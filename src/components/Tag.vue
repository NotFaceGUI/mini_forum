<template>
    <div class="tag">
        <a class="a" :class="{
            check: index == data.curIndex
        }" v-for="(index) in data.category" @click="jump(index)">
            <span class="span">{{ $t('category[' + (index - 1) + ']') }} </span>
        </a>
    </div>
</template>

<style scoped>
.a {
    display: inline-block;
    margin: 0 5px;
    padding: 0 5px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    transition: all 0.2s;
}

.check {
    border-radius: 5px;
    background-color: var(--fg_hover);
}

.a:hover {
    border-radius: 5px;
    background-color: var(--fg_hover);

}

.tag {
    margin: auto;
    width: 30%;
    height: 40px;
    line-height: 40px;
}
</style>

<script lang="ts">
import { defineComponent, reactive, } from "vue";
import { category } from "../config/arrData.json";

export default defineComponent({
    name: 'tag',
    setup() {
        const data = reactive({
            category,
            curIndex: 1,
        })

        const jump = (index: number) => {
            data.curIndex = index;
            localStorage.setItem("tag", data.curIndex.toString())
        }

        return {
            data,
            jump
        }
    }
})
</script>