<template>
    <div class="left_box login">
        <div v-if="!isLogin">
            <button class="join hover_one" @click="res()" style="margin-right: 5px;">{{ $t('button.reg') }}</button>
            <button class="join to_link hover_two" @click="login()" style="margin-left: 5px;">{{ $t('button.login')
            }}</button>
        </div>
        <div v-else>
            <div class="user">
                <div style="display: inline-block;vertical-align: middle;">
                    <el-avatar shape="square" :size="50" :src="state.squareUrl" />
                </div>
                <div class="desc">
                    <p style="font-size: 26px;">{{ user.name }}</p>
                    <a>
                        <span style="font-size: 16px;">@{{ user.id }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onActivated, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '../store';

const route = useRouter();

const login = () => {
    route.push("/login");
}

const state = reactive({
    squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',

})


const res = () => {
    route.push("/register");
}

const store = useStore();

let isLogin = store.getIsLogin;

onMounted(() => {
    isLogin = store.getIsLogin;
})

onActivated(() => {
    isLogin = store.getIsLogin;
})

const user = store.getUserInfo
</script>

<style scoped>
p {
    margin: 0;
}

a {
    color: var(--link_color);
    font-size: 18px;
    display: block;
    transition: color .3s ease-in;
}

a:hover {
    color: var(--link_hover_color);
}


.desc {
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
    text-align: left;
}

.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    background-color: var(--bg_box);
    border: 1px solid var(--search_border);
}
</style>