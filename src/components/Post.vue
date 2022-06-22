<template>
    <div>
        <button class="join hover_one" style="width: 80%;" @click="outerVisible = true">
            <el-icon style=" vertical-align: middle;margin-right: 5px;" color="#0000cc">
                <Link />
            </el-icon>
            <span style="vertical-align: middle;">我要发贴</span>
        </button>

        <el-dialog v-model="outerVisible" title="编辑帖子" lock-scroll="true" append-to-body="false" custom-class="dialog">
            <template #default>
                <EditableTiptap @changeData="changeData" />
            </template>
            <template #footer>
                <div class="dialog-footer">
                    <button type="button" class="cancel_button" @click="outerVisible = false">取消</button>
                    <button type="button" class="confirm" @click="release">发布帖子</button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Tiptap from './Tiptap.vue';
import EditableTiptap from './Edit/EditableTiptap.vue';
import useStore from '../store';
import axios from '../request';
import { ElNotification } from 'element-plus';

const outerVisible = ref(false)
const innerVisible = ref(false)
const store = useStore();

let data = {};

const changeData = (res: any) => {
    data = res.data;
}

const release = () => {
    if (!store.getIsLogin) {
        alert("请登录")
    } else {
        axios.post("article/newArticle", {
            data: JSON.stringify(data),
            views: 0,
            userId: store.getUserInfo.name
        }).then((res) => {
            console.log(res);
        })
    }
}
</script>

<style scoped>
.join {
    font-size: 20px;
    line-height: 20px;
}
</style>