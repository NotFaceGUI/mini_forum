<template>
    <div>
        <template v-for="(item, index) in data.items">
            <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
            <menu-item v-else :key="index" v-bind="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, getCurrentInstance, defineComponent } from "vue";
import MenuItem from "./MenuItem.vue";

const props = defineProps({
    editor: {
        type: Object,
        required: true,
    },
})

const menuItem = defineComponent({
    MenuItem
});

const data = reactive({
    items: [
        {
            icon: "bold",
            title: "bold",
            action: () => props.editor.chain().focus().toggleBold().run(),
            isActive: () => props.editor.isActive("bold"),
        },
        {
            icon: "italic",
            title: "italic",
            action: () => props.editor.chain().focus().toggleItalic().run(),
            isActive: () => props.editor.isActive("italic"),
        },
        {
            icon: "strikethrough",
            title: "strikethrough",
            action: () => props.editor.chain().focus().toggleStrike().run(),
            isActive: () => props.editor.isActive("strike"),
        },
        // {
        //     icon: 'code-view',
        //     title: 'Code',
        //     action: () => props.editor.chain().focus().toggleCode().run(),
        //     isActive: () => props.editor.isActive('code'),
        // },
        {
            icon: "mark-pen-line",
            title: "mark_pen_line",
            action: () => props.editor.chain().focus().toggleHighlight().run(),
            isActive: () => props.editor.isActive("highlight"),
        },
        {
            type: "divider",
        },
        {
            icon: "h-1",
            title: "h1",
            action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 1 }),
        },
        {
            icon: "h-2",
            title: "h2",
            action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 2 }),
        },
        {
            icon: "h-3",
            title: "h3",
            action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 3 }),
        },
        {
            icon: "paragraph",
            title: "paragraph",
            action: () => props.editor.chain().focus().setParagraph().run(),
            isActive: () => props.editor.isActive("paragraph"),
        },
        {
            icon: "list-unordered",
            title: "list_unordered",
            action: () => props.editor.chain().focus().toggleBulletList().run(),
            isActive: () => props.editor.isActive("bulletList"),
        },
        {
            icon: "list-ordered",
            title: "list_ordered",
            action: () => props.editor.chain().focus().toggleOrderedList().run(),
            isActive: () => props.editor.isActive("orderedList"),
        },
        // {
        //     icon: 'list-check-2',
        //     title: 'Task List',
        //     action: () => props.editor.chain().focus().toggleTaskList().run(),
        //     isActive: () => props.editor.isActive('taskList'),
        // },
        {
            icon: "code-box-line",
            title: "code",
            action: () => props.editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => props.editor.isActive("codeBlock"),
        },
        {
            type: "divider",
        },
        {
            icon: "double-quotes-l",
            title: "blockquote",
            action: () => props.editor.chain().focus().toggleBlockquote().run(),
            isActive: () => props.editor.isActive("blockquote"),
        },
        {
            icon: "separator",
            title: "separator",
            action: () => props.editor.chain().focus().setHorizontalRule().run(),
        },
        {
            type: "divider",
        },
        {
            icon: "text-wrap",
            title: "text_wrap",
            action: () => props.editor.chain().focus().setHardBreak().run(),
        },
        {
            icon: "format-clear",
            title: "format_clear",
            action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
        {
            type: "divider",
        },
        {
            icon: "arrow-go-back-line",
            title: "undo",
            action: () => props.editor.chain().focus().undo().run(),
        },
        {
            icon: "arrow-go-forward-line",
            title: "redo",
            action: () => props.editor.chain().focus().redo().run(),
        },
        {
            type: "divider",
        },
        {
            icon: "image",
            title: "image",
            action: () => {
                const url = window.prompt("URL");

                if (url) {
                    props.editor.chain().focus().setImage({ src: url }).run();
                }
            },
        },
    ],
});

</script>

<style lang="scss">
.divider {
    display: inline-block;
    width: 2px;
    height: 1.25rem;
    background-color: rgba(#000, 0.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
}
</style>
