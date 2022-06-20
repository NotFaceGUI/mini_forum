
<template>
    <el-tooltip :content="$t('editText' + '.' + title)" placement="top">
        <button class="menu-item" :class="{ 'is-active': isActive ? isActive() : null }" @click="action()">
            <svg class="remix">
                <use :xlink:href="`${data.remixiconUrl}#${icon}`" xmlns:xlink="http://www.w3.org/1999/xlink" x="0"
                    y="0" />
            </svg>
        </button>
    </el-tooltip>
</template>

<script setup lang="ts">
import { defineComponent, reactive } from "vue";
import svgIcon from "../../assets/svg/icon.svg";

const data = reactive({
    remixiconUrl: svgIcon,
});

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    action: {
        type: Function,
        required: true,
    },

    isActive: {
        type: Function,
        default: null,
    },
})



</script>

<style lang="scss">
.menu-item {
    width: 1.75rem;
    height: 1.75rem;
    color: #0d0d0d;
    border: none;
    background-color: transparent;
    border-radius: 0.4rem;
    padding: 0.25rem;
    margin-right: 0.25rem;

    svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    &.is-active,
    &:hover {
        color: #fff;
        background-color: #0d0d0d;
    }
}
</style>
