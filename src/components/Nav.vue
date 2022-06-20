<script lang = "ts" setup >
import Tag from './Tag.vue';
</script>

<template>
    <nav class="fixed_box">
        <div class="nav">
            <div class="search_box ">
                <input type="text" name="search" placeholder="搜索" class="text">
                <button type="submit" class="search_button">搜索</button>
            </div>
            <Tag />
        </div>
    </nav>
</template>

<style scoped>

.fixed_box {
    z-index: 1;
    margin-top: -10px;
    left: 0;
    padding: 10px 0;
    position: fixed;
    width: 100%;
    background-color: var(--bg_color);
}

.search_box {
    margin: auto;
    padding: 10px 0;
    width: 35%;
    display: flex;
    text-align: left;
}


.search_button {
    width: 10%;
    height: 42px;
    border: 1px solid var(--search_border);
    background: var(--bg_box);
    text-align: center;
    color: var(--fg_color);
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    overflow: hidden;
    font-size: 20px;

}

.text {
    width: 90%;
    height: 30px;
    border: 1px solid var(--search_border);
    border-right: none;
    padding: 5px;
    border-radius: 5px 0 0 5px;
    outline: none;
    background-color: rgba(204, 204, 204, 0.1);
    color: var(--fg_color);
}

.text:focus {
    color: var(--fg_color);
}
</style>