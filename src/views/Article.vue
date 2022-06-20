<template>
    <div class="flex-row home">
        <Header />
        <main class="flex-row flex">
            <div style="width: 100%;display: flex;">
                <div class="flex-column main_width main-box main shrink">
                    <el-scrollbar max-height="100vh">
                        <div class="content">
                            <ArticleEx />
                        </div>
                    </el-scrollbar>
                </div>
                <div class="view_width">
                    <Category />
                </div>
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">
import Nav from '../components/Nav.vue';
import Main from '../components/Main.vue';
undefined

</script>

<style scoped>
.home {
    height: 100vh;
}

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

@media (max-width: 1300px) {
    .main {
       
        flex-grow: 1 !important;
    }
}


.content {
    margin-top: 2px;
}

.content>div:first-child {
    margin-top: 0px;
}




.main {
    width: 0;
}
</style>