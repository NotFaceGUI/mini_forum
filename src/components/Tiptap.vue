<template>
  <div class="editor" :class="{ editorNone: isActive || !show }">
    <editor-content :editor="editor" />
  </div>
  <div v-if="show">
    <div class="icon" v-if="visable">
      <el-icon v-if="!isActive" @click="isActive = true">
        <ArrowDownBold />
      </el-icon>
      <el-icon v-if="isActive" @click="isActive = false">
        <ArrowUpBold />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onMounted, ref, nextTick, getCurrentInstance, defineComponent, onUpdated } from 'vue';

export default defineComponent({
  components: {
    EditorContent,
  },
  props: ['visable', 'show', 'data'],
  setup(props: any) {
    const editor = useEditor({
      editable: false,
      content: JSON.parse(props.data),
      extensions: [
        StarterKit,
      ],
    })
    const isActive = ref(false);
    

    onMounted(() => {
    })
    return { editor, isActive }
  },
})
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
    list-style: circle;
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

.editor {
  max-height: 300px;
  overflow: hidden;

}

.editorNone {
  max-height: none;
}

.icon {
  position: relative;
  top: -20px;
  text-align: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--bg_box) 100%);
}
</style>