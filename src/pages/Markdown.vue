<template>
  <div class="flex flex-wrap w-full">
    <h1 class="w-full my-3 text-3xl font-bold text-center">Markdown</h1>
    <section class="flex w-8/12 h-screen m-auto">
      <article class="w-1/2 border">
        <textarea
          class="w-full h-full p-3"
          spellcheck="false"
          :value="text"
          @input="onInputChange"
        />
      </article>
      <article class="w-1/2 p-3 bg-gray-100 border" v-html="markdown"></article>
    </section>
  </div>
</template>

<script>
import marked from "marked";
import useDebounce from "../utilities/useDebounce";
import { computed, ref } from "vue";

export default {
  name: "Markdown",
  setup() {
    const { debounce } = useDebounce();

    const text = ref("");

    const markdown = computed({
      get: () => marked(text.value),
    });

    function onInputChange(e) {
      const task = () => {
        text.value = e.target.value;
      };
      debounce(task, 500);
    }

    return { text, markdown, onInputChange };
  },
};
</script>
