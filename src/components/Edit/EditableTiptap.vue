<template>
    <div v-if="editor">
        <menu-bar :editor="editor" />
        <editor-content :editor="editor" class="Editable" />
    </div>

</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        EditorContent,
        MenuBar
    },

    setup(props, context) {
        const currentData = () => {
            context.emit("changeData", {
                data: editor.value?.getJSON(),
            })
        }

        const editor = useEditor({
            content: '',
            extensions: [
                StarterKit,
                Highlight.configure({ multicolor: true }),
                Link.configure({
                    openOnClick: true,
                    linkOnPaste: true,
                }),
                Image
            ],
            onUpdate({ editor }) {
                currentData();
            },
        })

        return { editor }
    },
})

</script>

<style lang="scss">
/* Basic editor styles */
.Editable {
    border: 1px solid var(--search_border);
    border-radius: 7px;
    padding: 5px;
    margin: 5px 0;
    min-height: 300px;

    >*+* {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    ol {
        list-style: decimal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }
}

.ProseMirror:focus-visible {
    outline: none;
}
</style>