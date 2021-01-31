<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="my-5 text-2xl text-center ">Reusable Modal</h1>
      <Modal :is-modal-visible="isModalVisible" @close="isModalVisible = false">
        <template #title>
          Modal
        </template>
        <template #body>
          Modal body
        </template>
      </Modal>
      <button
        class="w-full p-2 border rounded shadow"
        @click="isModalVisible = true"
      >
        Show Modal
      </button>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import Modal from "../components/Modal";

export default {
  name: "ReusableModal",
  components: { Modal },
  setup() {
    const isModalVisible = ref(true);

    return { isModalVisible };
  },
};
</script>

<style></style>
