<template>
    <div class="excerpt">
        <div class="user">
            <div class="portrait">
            </div>
            <div class="desc">
                <p>{{ item.user.name }}</p>
                <a>
                    <span>@{{ item.user.id }}</span>
                </a>
            </div>
        </div>
        <div ref="tip">
            <Tiptap :visable="visable" :show="true" :data="item.data" />
        </div>
        <div class="share">
            <div class="item chat_icon">
                <el-icon :size="28" style="vertical-align: middle;">
                    <ChatSquare />
                </el-icon>
                <span class="text">{{ JSON.parse(item.comment).length }}</span>
            </div>
            <div class="item star_icon" @click.stop="">
                <el-icon :size="28" style="vertical-align: middle;">
                    <Star />
                </el-icon>
                <span class="text">0</span>
            </div>
            <div class="item share_icon" @click.stop="">
                <el-icon :size="28" style="vertical-align: middle;">
                    <Share />
                </el-icon>
                <span class="text">分享</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, reactive } from 'vue';
import Tiptap from './Tiptap.vue';

const tip: any = ref(null)
let visable = ref(false)


const props = defineProps<{
    item: any
}>()

console.log("props", props.item);

onMounted(() => {
    nextTick(() => {
        if (tip.value.offsetHeight >= 300) {
            visable.value = true;
        }
    })
});

</script>

<style scoped>
a {
    color: var(--link_color);
    font-size: 18px;
    transition: color .3s ease-in;
}

a:hover {
    color: var(--link_hover_color);
}

p {
    margin: 0;
    font-size: 22px;
}

.chat_icon,
.share_icon,
.star_icon {
    transition: color .3s;
}

.chat_icon:hover {
    color: var(--fg_check_color);
}

.star_icon:hover {
    color: yellow;
}

.share_icon:hover {
    color: skyblue;
}

.item {
    width: 80%;
    text-align: center;
    border-radius: 5px;
}

.item:hover {
    background-color: var(--search_border);
}

.text {
    font-size: 14px;
    margin-left: 5px;
    vertical-align: middle;
}


.excerpt {
    text-align: left;
    padding: 5px 10px 0 10px;
    background-color: var(--bg_box);
    border: 1px solid var(--search_border);
    border-radius: 7px;
    margin: 10px 0;
    /* max-height: 400px; */
    overflow: hidden;
}

.desc {
    display: inline-block;
    vertical-align: middle;
}

/* .user {
    background-color: pink;
} */


.portrait {
    width: 50px;
    height: 50px;
    background-color: skyblue;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
}

.share {
    /* background-color: skyblue; */
    /* display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    border-top: 1px solid var(--search_border);
    height: 40px;
    margin-top: 5px;
}


.user {
    margin: 5px 0;
}
</style>