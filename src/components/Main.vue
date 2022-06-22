<template>
    <Nav />
    <main class="flex-row flex">
        <div style="width: 100%;display: flex;">
            <div class="flex-column main_width main-box main shrink">
                <div class="tag">
                    <a class="a" :class="{
                        check: index == data.curIndex
                    }" v-for="(index) in data.category" @click="jump(index)">
                        <span class="span">{{ $t('category[' + (index - 1) + ']') }} </span>
                    </a>
                </div>
                <el-scrollbar>
                    <ul v-infinite-scroll="load" class="infinite-list">
                        <li v-for="(item, index) in arr" @click="save(index, item)" :key="index"
                            class="infinite-list-item">
                            <div class="content">
                                <Excerpt :item="item" />
                            </div>
                        </li>
                    </ul>
                    <div v-if="isLoading" v-loading="true" element-loading-background="rgba(122, 122, 122, 0)"
                        style="height: 40px;line-height: 40px;">
                    </div>
                </el-scrollbar>
            </div>
            <div class=" view_width">
                <Category />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { type } from 'os';
import { json } from 'stream/consumers';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../request';
import useStore from '../store';
import Category from './Category.vue';
import Excerpt from './Excerpt.vue';
import Nav from './Nav.vue';
import { checkToken } from '../utils/utils';
import { category } from "../config/arrData.json";

const router = useRouter();
const stroe = useStore();

let timer: any = false;
let isLoading = ref(false);
let arr: any[] = reactive([]);
let isLoad = true;
let count = 0;

const data = reactive({
    category,
    curIndex: 1,
})

const jump = (index: number) => {
    data.curIndex = index;
    localStorage.setItem("tag", data.curIndex.toString());
    arr.splice(0);
    axios.get("article/selectAll", {
        params: {
            size: 5,
            current: 0,
            tag: index
        }
    }).then((res) => {
        if (res.data.records.length > 0) {
            res.data.records.forEach((element: any) => {
                console.log(element);
                arr.push(element)
            });
            stroe.setPage(res.data.current + res.data.records.length + 1)
        }
        isLoad = false;
    })
}

const load = () => {
    isLoading.value = true;
    clearTimeout(timer); // 清除未执行的代码，重置回初始化状态
    if (isLoad) return;
    console.log(count);
    count++;
    if (count <= 2) return;
    timer = setTimeout(function () {
        isLoad = true;
        console.log("函数防抖");
        axios.get("article/selectAll", {
            params: {
                size: stroe.getPage.size,
                current: stroe.getPage.current,
                tag: localStorage.getItem("tag")
            }
        }).then((res) => {
            if (res.data.records.length > 0) {
                res.data.records.forEach((element: any) => {
                    console.log(element);
                    arr.push(element)
                });
                stroe.setPage(res.data.current + res.data.records.length)

            }
            isLoad = false;
            isLoading.value = false;
        })
    }, 500);
}

onMounted(() => {
    localStorage.setItem("tag", "1");
    axios.get("article/selectAll", {
        params: {
            size: 5,
            current: 0,
            tag: 1
        }
    }).then((res) => {
        if (res.data.records.length > 0) {
            res.data.records.forEach((element: any) => {
                console.log(element);
                arr.push(element)
            });
            stroe.setPage(res.data.current + res.data.records.length + 1)
        }
        isLoad = false;
    })
})

onUnmounted(() => {

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
    margin-top: 80px;
    width: 0;
}



@media (max-width: 1300px) {
    .shrink {
        flex-grow: 1;
        flex-shrink: 1;
    }
}


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