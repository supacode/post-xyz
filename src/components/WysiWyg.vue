<template>
  <div>
    <div ref="editorRef" />
    <div ref="contentRef" class="hidden" v-html="modelValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, onUnmounted } from 'vue';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { defaultMarkdownSerializer } from 'prosemirror-markdown';

import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-example-setup/style/style.css';

const editorRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const emits = defineEmits(['update:modelValue']);

const schema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: basicSchema.spec.marks,
});

const { modelValue } = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: '',
  },
);

const onEditorChange = new Plugin({
  view() {
    return {
      update(view, prevState) {
        if (view.state.doc !== prevState.doc) {
          const content = defaultMarkdownSerializer.serialize(view.state.doc);
          emits('update:modelValue', content);
        }
      },
    };
  },
});

let editorView: EditorView | null = null;

onMounted(() => {
  editorView = new EditorView(editorRef.value, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(contentRef.value ?? document.createElement('div')),
      plugins: exampleSetup({ schema }).concat(onEditorChange),
    }),
  });
});

onUnmounted(() => editorView?.destroy());
</script>

<style lang="scss">
.ProseMirror {
  min-height: 200px;
  background: #fff;
  padding: 1rem;
  outline: none;

  &-menubar {
    padding: 0.5rem;
  }

  &-prompt {
    top: 20% !important;
  }

  &-menubar-wrapper {
    border: 1px solid #d0d2d7;
    border-radius: 1rem;
    overflow: hidden;
  }
}
</style>
