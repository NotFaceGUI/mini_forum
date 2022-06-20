<template>
    <div>
        <button class="join hover_one" style="width: 80%;" @click="outerVisible = true">
            <el-icon style=" vertical-align: middle;margin-right: 5px;" color="#0000cc">
                <Link />
            </el-icon>
            <span style="vertical-align: middle;">我要发贴</span>
        </button>

        <el-dialog v-model="outerVisible" title="编辑帖子" lock-scroll="false" append-to-body="true" custom-class="dialog">
            <template #default>
                <EditableTiptap />
            </template>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="outerVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="innerVisible = true">发布帖子</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Tiptap from './Tiptap.vue';
import EditableTiptap from './Edit/EditableTiptap.vue';

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>

<style scoped>
.join {
    font-size: 20px;
    line-height: 20px;
}
</style>