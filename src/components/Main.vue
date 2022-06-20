<template>
    <Nav />
    <main class="flex-row flex">
        <div style="width: 100%;display: flex;">
            <div class="flex-column main_width main-box main shrink">
                <el-scrollbar max-height="100vh">
                    <div class="content">
                        <div v-for="(item, index) in arr" @click="save(index, item)">
                            <Excerpt :item="item" />
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="view_width">
                <Category />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { type } from 'os';
import { json } from 'stream/consumers';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../request';
import useStore from '../store';
import Category from './Category.vue';
import Excerpt from './Excerpt.vue';
import Nav from './Nav.vue';

const router = useRouter();
const stroe = useStore();

let arr: any[] = reactive([]);

onMounted(() => {
    // axios.get()
    axios.get("article/getAll").then((res) => {
        res.data.forEach((element: any) => {
            arr.push(element)
        });
    })
})

const save = (index: number, item: any) => {
    stroe.setCurInfo(item)
    router.push(`/article/${item.id}`)
}
</script>

<style scoped>
main {
    margin-top: 10px;
}

.content {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    margin: 10px;
    text-align: center;
    border-radius: 4px;
}

.content {
    margin-top: 2px;
}

.content>div:first-child {
    margin-top: 0px;
}


.main {
    margin-top: 100px;
    width: 0;
}

@media (max-width: 1300px) {
    .shrink {
        flex-grow: 1;
        flex-shrink: 1;
    }
}
</style>