<template>
    <div class="left_box top">
        <div style="margin-bottom: 5px;">
            {{ $t('public.hot') }}
        </div>
        <div style="text-align: left;max-width: 53px;" v-for="(item, index) in 5" :key="index">
            <el-space direction="vertical" alignment="flex-start">
                <!-- <div>
                    <label style="margin-right: 16px">Switch Loading</label>
                    <el-switch v-model="loading" />
                </div> -->
                <el-skeleton style="width: 240px" :loading="index % 2 != 0" animated>
                    <template #template>
                        <div style="padding: 5px">
                            <el-skeleton-item variant="h3" style="width: 50%" />
                            <div
                                style="display: flex;align-items: center;justify-items: space-between;margin-top: 5px;height: 16px;">
                                <el-skeleton-item variant="text" style="width: 40%;margin-right: 16px" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>
                        </div>
                    </template>
                    <template #default>
                        <div class="content">
                            <h3>标题</h3>
                            <span>正文</span>
                        </div>
                    </template>
                </el-skeleton>
            </el-space>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
const currentDate = new Date().toDateString()
</script>

<style scoped>
h3 {
    margin: 0 0 5px 5px;
}



.content>span {
    margin-left: 5px;
}

.top {
    box-sizing: border-box;
    padding: 5px;
    background-color: var(--bg_box);
    border: 1px solid var(--search_border);
}
</style>