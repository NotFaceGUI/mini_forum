<template>
    <header class="flex-column end grow shrink">
        <div class="view_width">
            <div class="box fixed flex-column view_width" style="height: 98vh;">
                <div class="logo"></div>
                <ul>
                    <li v-for="(value, index) in data.publicName">
                        <a class="link" :class="{ click: data.curIndex == index }" @click="jump(index)">
                            <span>{{ $t(`navData.` + value) }}</span>
                        </a>
                    </li>
                </ul>
                <div class="grow shrink"></div>
                <Post />
            </div>
        </div>
    </header>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import navData from "../config/navData.json"
import { useRoute, useRouter } from 'vue-router';
import Post from './Post.vue';


export default defineComponent({
    name: "Header",
    props: {},
    setup() {
        const router = useRouter();
        const data = reactive({
            publicName: titleInit(),
            curIndex: 0
        });
        if (sessionStorage.getItem("curIndex") != null) {
            data.curIndex = parseInt(<string>sessionStorage.getItem("curIndex"));
        }
        const jump = (index: number) => {
            data.curIndex = index;
            router.push(navData[index].path);
            sessionStorage.setItem("curIndex", data.curIndex.toString());
        };
        return {
            data,
            jump
        };
    },
    components: { Post }
})

function titleInit() {
    let publicName: Array<String> = []

    navData.forEach((value) => {
        publicName.push(value.name)
    })

    return publicName;
}
</script>


<style scoped>
header {
    z-index: 10;
}

li {
    font-size: 18px;
}

@media (min-width: 1300px) {
    .grow {
        flex-grow: 1;
    }
}

@media (min-width: 1300px) {
    .shrink {
        flex-shrink: 1;
    }
}

.logo {
    height: 65px;
    margin: 10px 0;
    padding: 0 10px;
    line-height: 100px;
    font-size: 30px;
    background: url("../assets/logo.png") no-repeat center center;
    background-size: 65px 65px;
}


.end {
    align-items: flex-end;
}

.box {
    /* background-color: rgb(252, 162, 162); */
    color: var(--fg_color);
    text-align: center;
    height: 400px;
}


.link {
    box-sizing: content-box;
    display: block;
    padding: 0px 1px 1px 1px;
    margin: 2px auto;

    height: 40px;
    width: 70%;
    line-height: 40px;
    transition: all .4s ease-out;
}

.click {
    color: var(--fg_check_color);
    transform: translate(4px);
    border-right: 5px solid var(--fg_check_color);
    border-radius: 5px;

}

.link:hover {
    background-color: var(--fg_hover);
    border-radius: 5px;
    transform: translate(4px);
    border-right: 5px solid var(--fg_check_color);
    transition: transform 0.4s;
}
</style>