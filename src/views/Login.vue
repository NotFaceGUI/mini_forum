<template>
    <div style="height:95vh ;display: flex;justify-content: center;align-items: center;">
        <div class="icon_bar">
        </div>
        <div class="login" style="display:flex;justify-content: center;align-items: center;">
            <el-icon style="box-sizing: content-box; flex-grow: 1;align-self: flex-start;margin: 10px;width: 10%;">
                <router-link to="/" class="link">
                    <ArrowLeftBold style="vertical-align: middle;" />
                    <span style="vertical-align: middle;">切换到首页</span>
                </router-link>
            </el-icon>
            <img src="../assets/logo.png" alt="" style="width: 100px; height: auto;margin: 5px 20px 5px 0;">
            <div style="width: 25%;">
                <div v-if="!showCustomFrom" class="flex-column"
                    style="justify-content: center;align-items: center;margin: 5px 20px;">
                    <div>
                        <button class="button wechat">
                            <svg class="remix">
                                <use :xlink:href="`${icon}#wechat`" xmlns:xlink="http://www.w3.org/1999/xlink" x="0"
                                    y="0" />
                            </svg>
                            <span class="remix">通过微信登录</span>
                        </button>
                    </div>

                    <button class="button qq">
                        <svg class="remix">
                            <use :xlink:href="`${icon}#qq`" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" />
                        </svg>
                        <span class="remix">通过QQ登录</span>
                    </button>
                    <button class="button github">
                        <svg class="remix">
                            <use :xlink:href="`${icon}#github`" xmlns:xlink="http://www.w3.org/1999/xlink" x="0"
                                y="0" />
                        </svg>
                        <span class="remix">通过Github登录</span>
                    </button>
                </div>
                <div v-else>
                    <form ref="form" method="post" class="flex-column">
                        <!-- <input type="text" placeholder="id" name="id">
                    <input type="text" placeholder="用户名" name="name"> -->
                        <input type="email" placeholder="邮箱" name="email" v-model="formData.email">
                        <input type="password" placeholder="密码" name="password" v-model="formData.password">
                        <button type="button" @click="submit()" class="push">提交</button>
                    </form>

                </div>

            </div>
            <el-icon style="box-sizing: content-box; flex-grow: 1;align-self: flex-start;margin: 10px;width: 10%;">
                <div class="right_link" @click="showCustomFrom = !showCustomFrom">
                    <span style="vertical-align: middle;">切换登录方式</span>
                    <ArrowRightBold style="vertical-align: middle;" />
                </div>
            </el-icon>
        </div>
    </div>

</template>

<script setup lang="ts">
import { url } from 'inspector';
import { reactive, ref } from 'vue';
import icon from '../assets/svg/buttonIcon.svg'
import axios from '../request';
import Nav from '../components/Nav.vue';
import useStore from '../store'
import { useRouter } from 'vue-router';
import { infoRequest } from '../utils/utils';

const showCustomFrom = ref(true);

const login = useStore().getConfigMap.get('plugin').RegisterComponents;

const formData = reactive({
    email: "",
    password: ""
})

const router = useRouter();

const submit = () => {
    axios.postForm(
        "user/login",
        formData,
    ).then((res) => {
        if (res.data.code == 10086) {
            // router.push("/")
            location.href = "/"
        }
    })
}
</script>

<style scoped>
input {
    margin: 10px 0;
    padding: 0 5px;
    height: 35px;
    border: 1px solid var(--search_border);
    border-right: none;
    border-radius: 5px;
    outline: none;
    background-color: rgba(204, 204, 204, 0.1);
    color: var(--fg_color);
}

.link,
.right_link {
    list-style: none;
    color: var(--fg_color);
    font-size: 16px;
    font-style: normal;
    text-decoration: none;
    transition: all .3s;
}

.link:hover {
    color: var(--fg_check_color);
    transform: translateX(-8px);
}

.right_link:hover {
    color: var(--fg_check_color);
    transform: translateX(8px);
}

.push {
    margin-top: 5px;
    height: 35px;
    transition: all .3s;
}

.push:active {
    transform: scale(.9);
}

.login {
    text-align: center;
    width: 800px;
    height: 60%;
    background-color: var(--bg_box);
    border: 1px solid var(--search_border);
    border-radius: 7px;
}

.button {
    width: 150px;
    height: 40px;
    margin-top: 10px;
    transition: all .2s;
}

.button:active {
    transform: scale(.9);
}

.wechat {
    background-color: var(--bg_button_1);
    ;
}

.qq {
    background-color: #409eff;
}

.remix {
    vertical-align: middle;
}

svg {
    width: 28px;
    height: 100%;
    fill: currentColor;
}
</style>