<template>
  <div class="m-auto">
    <h1 class="mb-5 text-2xl text-center ">DC Heros</h1>
    <ul class="text-center">
      <li
        class="flex items-center justify-between mb-2"
        v-for="(hero, index) in heros"
        :key="hero.name"
      >
        <span class="hero__name">- {{ hero.name }} </span>
        <button
          class="p-1 px-2 border border-red-500 rounded hero__remove-button"
          @click="onRemoveHero(index)"
        >
          X
        </button>
      </li>
    </ul>
    <form @submit.prevent="onAddHero">
      <input
        ref="newHeroInput"
        class="px-4 py-2 border rounded-lg "
        type="text"
        v-model="newHero"
        placeholder="Type hero name here..."
      />
      <button
        class="px-4 py-2 mt-10 mb-3 ml-4 border rounded-lg"
        type="submit"
        :disabled="newHero === ''"
      >
        Add Hero
      </button>
    </form>
    <span v-if="heroCount > 0">Total hero count is {{ heroCount }}</span>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";

export default {
  name: "Heros",
  setup() {
    const newHeroInput = ref();

    onMounted(() => {
      newHeroInput.value.focus();
    });

    const heros = ref([
      {
        name: "SuperGirl",
      },
      {
        name: "Batman",
      },
    ]);
    const newHero = ref("");

    const heroCount = computed({
      get: () => heros.value.length,
    });

    function onAddHero() {
      heros.value.push({ name: newHero.value });
      newHero.value = "";
    }

    function onRemoveHero(index) {
      heros.value.splice(index, 1);
    }

    return { heros, newHero, heroCount, onAddHero, onRemoveHero, newHeroInput };
  },
};
</script>
