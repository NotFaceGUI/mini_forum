<template>
    <main class="flex-row flex">
        <div style="width: 100%;display: flex;">
            <div class="flex-column main_width main-box main shrink">
                <div class="public_setting setting">
                    <form action="/a" method="get">
                        <div class="title_box">
                            <h4 style="vertical-align: middle;margin-right: 5px;">
                                公共设置
                            </h4>
                            <el-tooltip :content="msg.publicSetting" placement="right">
                                <el-icon style=" vertical-align: middle; ">
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>

                        <div class="box">
                            <Tip :data="msg.localesMsg" />
                            <div style="padding-left: 15px;" class="item">
                                <span>语言：</span>
                                <el-select id="i18n" v-model="status" class="m-2" placeholder="Select"
                                    popper-class="select_box" @change="sleectLocales" name="lang">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>

                            <div style="padding-left: 15px;">
                                <span>所属地：</span>
                                <div class="input">
                                    <el-input v-model="data.locales" placeholder="Please input" />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="box">
                            <h4 style="text-align: left;">区域与语言</h4>
                            <div style="padding-left: 15px;">
                                <span>语言：</span>
                                <div class="input">
                                    <el-input placeholder="Please input" />
                                </div>
                            </div>
                        </div> -->
                    </form>
                </div>
                <div class="user_setting setting">
                    <h4>用户设置</h4>
                </div>
                <div class="admin_setting setting">
                    <h4>管理设置</h4>
                </div>
            </div>
            <div class="view_width right_box">
                <Login />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Login from '../components/Login.vue';
import Tip from '../components/Tip.vue';

const { locale } = useI18n();
let status: Ref<string | null>;

if (localStorage.getItem("locales") != null) {
    status = ref(localStorage.getItem("locales"))
    locale.value = <string>localStorage.getItem("locales");
} else {
    status = ref('zh')
    locale.value = 'zh';
}

const data = reactive({
    locales: ""
})

const value = ref('')

const options = [
    {
        value: 'zh',
        label: '中文',
    },
    {
        value: 'en',
        label: 'English',
    }
]

const sleectLocales = (val: string) => {
    locale.value = val;
    status.value = val;
    localStorage.setItem("locales", val)
}

const msg = reactive({
    localesMsg: "语言默认为中文，英文覆盖率为：80%，其他语言待定。",
    publicSetting: "通用配置，保存在浏览器中。"
})

</script>

<style scoped>
span {
    display: inline-block;
    text-align: justify;
    min-width: 75px;
    max-width: 75px;
}

main {
    margin-top: 10px;
}

h4 {
    display: inline-block;
    margin: 0;
    transition: color .2s ease-in;
}

h4:hover {
    color: var(--select_check_color);
}

.title_box {
    margin-bottom: 20px;
}

.setting {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 5px;
    margin: 0 10px 10px 10px;
    /* border-bottom: 1px solid var(--search_border); */
    border-radius: 5px;
}

.input {
    display: inline-block;
}

.item {
    margin-bottom: 20px;
}
</style>