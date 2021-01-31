<template>
  <div v-if="isModalVisible">
    <section
      @click="close"
      class="fixed inset-0 z-20 w-screen h-screen bg-gray-500 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex items-center justify-center h-full">
        <div class="z-30 w-1/5 p-2 m-auto bg-white rounded shadow flex-column">
          <div class="p-2">
            <h1 class="text-2xl font-bold text-center">
              <slot name="title">Title</slot>
            </h1>
            <main>
              <slot name="body">Main content</slot>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ["close"],
  setup(_, { emit }) {
    function close() {
      emit("close");
    }

    return { close };
  },
};
</script>

<style></style>
