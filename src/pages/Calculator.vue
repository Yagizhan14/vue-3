<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="mt-4 text-2xl text-center">Calculator</h1>
      <h1
        class="h-10 mt-10 mb-4 overflow-x-scroll text-3xl text-right w-50"
        style="direction:rtl"
      >
        {{ currentNumber }}
      </h1>
      <div class="h-10 mb-4">
        <small v-if="selectedOperation"
          >{{ prevNumber }} {{ selectedOperation }} {{ currentNumber }}</small
        >
      </div>
      <div class="grid grid-cols-4 gap-4">
        <button
          class="w-10 h-10 p-2 border rounded shadow"
          v-for="char in characters"
          @click="onPress(char)"
          :key="char"
        >
          {{ char }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/useWindowEvent";

export default {
  name: "Calculator",
  setup() {
    const operations = {
      add: "+",
      subtract: "-",
      divide: "/",
      multiply: "*",
      clear: "C",
      calculate: "=",
    };
    const characters = ref([
      "7",
      "8",
      "9",
      operations.divide,
      "4",
      "5",
      "6",
      operations.multiply,
      "1",
      "2",
      "3",
      operations.subtract,
      "0",
      operations.clear,
      operations.calculate,
      operations.add,
    ]);
    const currentNumber = ref("");
    const prevNumber = ref("");
    const selectedOperation = ref("");

    function onPress(char) {
      if (char === operations.calculate || char === "Enter") calculate();
      else if (char === operations.clear) clear();
      else if (Object.values(operations).includes(char)) applyOperation(char);
      else appendNumber(char);
    }

    function appendNumber(char) {
      currentNumber.value += char;
    }

    function applyOperation(operation) {
      calculate();
      prevNumber.value = currentNumber.value;
      currentNumber.value = "";
      selectedOperation.value = operation;
    }

    function calculate() {
      switch (selectedOperation.value) {
        case operations.multiply:
          currentNumber.value = (
            parseInt(prevNumber.value) * parseInt(currentNumber.value)
          ).toString();
          break;
        case operations.divide:
          currentNumber.value = (
            parseInt(prevNumber.value) / parseInt(currentNumber.value)
          ).toString();
          break;
        case operations.add:
          currentNumber.value = (
            parseInt(prevNumber.value) + parseInt(currentNumber.value)
          ).toString();
          break;
        case operations.subtract:
          currentNumber.value = (
            parseInt(prevNumber.value) - parseInt(currentNumber.value)
          ).toString();
          break;
      }

      prevNumber.value = "";
      selectedOperation.value = "";
    }

    function clear() {
      currentNumber.value = "";
      prevNumber.value = "";
      selectedOperation.value = "";
    }

    function handleKeyDown(e) {
      if (characters.value.includes(e.key) || e.key === "Enter") onPress(e.key);
    }

    useWindowEvent("keydown", handleKeyDown);

    return {
      currentNumber,
      onPress,
      characters,
      prevNumber,
      selectedOperation,
    };
  },
};
</script>

<style></style>
