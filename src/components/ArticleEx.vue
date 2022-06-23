<template>
    <div class="excerpt">
        <div class="user">
            <div class="portrait">
            </div>
            <div class="desc">
                <p>{{ cur.user.name }}</p>
                <a>
                    <span>@{{ cur.user.id }}</span>
                </a>
            </div>
            <div class="look">
                <el-icon style="vertical-align: middle;" :size="18">
                    <View />
                </el-icon>
                <span style="vertical-align: middle;">
                    &nbsp;{{ cur.views }} 次查看 发布时间：{{ cur.createTime }}
                </span>
            </div>
        </div>
        <div ref="tip">
            <Tiptap :visable="true" :show="false" :data="cur.data" />
        </div>
        <div class="share">
            <div class="item chat_icon">
                <el-icon :size="28" style="vertical-align: middle;">
                    <ChatSquare />
                </el-icon>
                <span class="text">{{ comments.length }}</span>
            </div>
            <div class="item star_icon">
                <el-icon :size="28" style="vertical-align: middle;">
                    <Star />
                </el-icon>
                <span class="text">0</span>
            </div>
            <div class="item share_icon">
                <el-icon :size="28" style="vertical-align: middle;">
                    <Share />
                </el-icon>
                <span class="text">分享</span>
            </div>
        </div>
    </div>
    <div class="excerpt" style="min-height: 80px;">
        <form method="get" class="comment">
            <textarea type="textarea" name="comment" placeholder="输入看法" class="text_comment" v-model="content" />
            <button type="button" @click="comment" class="submit">评论</button>
        </form>
        <div class="user_comment" v-for="(item, index) in comments" :key="index">
            <div style="text-align: left;position: relative;">
                <div style="display: inline-block;vertical-align: top;">
                    <el-avatar shape="square" :size="50"
                        :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
                </div>
                <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="content">
                        {{ item.comment }}
                    </div>
                </div>
                <div class="time">
                    <span>{{ item.createTime }}</span>
                </div>
            </div>
        </div>
        <div class="user_comment" v-if="comments.length == 0">
            <span>暂时没有评论~</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, reactive, onUpdated, onUnmounted } from 'vue';
import Tiptap from './Tiptap.vue';
import useStore from '../store/index';
import axios from '../request';
import { ElNotification } from 'element-plus';


const store = useStore();
let cur: any = reactive({});
let comments: any = reactive([]);
let content = ref("")

const comment = () => {
    if (!store.getIsLogin) {
        alert("请登录")
    } else {
        axios.post("article/newComment", {
            "id": cur.id,
            "userId": cur.user.id,
            "name": cur.user.name,
            "comment": content.value
        }).then((res) => {
            if (res.data.code != 500) {
                comments.splice(0);
                console.log("comment", res.data.data);
                content.value = "";
                res.data.data.forEach((element: any) => {
                    comments.push(element);
                });
            }
        })
    }
}

if (<string>localStorage.getItem("curData") != null) {
    cur = JSON.parse(<string>localStorage.getItem("curData"));
    console.log("a", cur);
} else {
    cur = store.getCurInfo;
    console.log("b", cur);
    localStorage.setItem("curData", JSON.stringify(cur))
}

onMounted(() => {
    if (store.getIsLogin) {
        axios.post("article/views", cur.id).then(() => {
            console.log("object");
        });

    }
    axios.get("article/all", {
        params: {
            "id": cur.id,
        }
    }).then((res) => {
        if (res.data.code != 500) {
            console.log("comment", res.data.data);
            content.value = "";
            res.data.data.forEach((element: any) => {
                comments.push(element);
            });
        }
    })
})



onUnmounted(() => {
    localStorage.removeItem("curData")
})

const tip: any = ref(null)
</script>

<style scoped>
a {
    color: var(--link_color);
    font-size: 18px;
    transition: color .3s ease-in;
}

div {
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
}

a:hover {
    color: var(--link_hover_color);
}

p {
    margin: 0;
    font-size: 22px;
}

.time {
    position: absolute;
    right: 0;
    bottom: 0px;
}

.desc {
    height: auto;
    max-width: 74%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
}

.content {
    margin-top: 5px;
}

.name {
    color: var(--fg_check_color)
}

.comment {
    text-align: center;
}

.text_comment {
    box-sizing: border-box;
    font-size: 14px;
    width: 85%;
    height: 60px;
    border: 1px solid var(--search_border);
    border-right: none;
    padding: 5px;
    border-radius: 5px 0 0 5px;
    outline: none;
    overflow: hidden;
    background-color: rgba(204, 204, 204, 0.1);
    color: var(--fg_color);
    vertical-align: middle;
}

.user_comment {
    text-align: center;
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid var(--search_border);
}

.chat_icon,
.share_icon,
.star_icon {
    transition: color .3s;
}

.submit {
    min-width: 10%;
    height: 60px;
    line-height: 60px;
    border-radius: 0 7px 7px 0;
    vertical-align: middle;
    transition: all .3s;
}

.submit:hover {
    background-color: rgba(231, 231, 231, 0.1);
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

.excerpt:first-child {
    margin-top: 0;
}

.desc {
    display: inline-block;
    vertical-align: middle;
}

.portrait {
    width: 50px;
    height: 50px;
    background-color: skyblue;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
}

.main {
    width: 0;
}

.share {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    border-top: 1px solid var(--search_border);
    height: 40px;
    margin-top: 5px;
}

.user {
    position: relative;
    margin: 5px 0;
}

.look {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 0;
}
</style>