<template>
  <section class="flex w-full">
    <div class="w-full max-w-xl m-auto">
      <h1 v-if="userId === null" class="my-4 text-2xl text-center">
        Please login in order to join to chat.
      </h1>
      <div v-else>
        <h1 class="my-4 text-2xl text-center">Real Time Chat</h1>
        <div class="border roundend-lg">
          <div ref="chatContainerRef" class="p-2 overflow-y-scroll h-88">
            <div
              v-for="chat in state.chats"
              :key="chat.key"
              :class="chat.userId === userId && 'text-right'"
            >
              <div
                class="inline-block max-w-xs p-2 mb-2 text-white bg-gray-400 rounded"
                :class="chat.userId === userId && 'bg-purple-400'"
              >
                {{ chat.message }}
              </div>
            </div>
          </div>
          <div class="flex items-center h-8 p-2 mb-2">
            <input
              class="flex-1 p-1 mr-2 border rounded shadow"
              type="text"
              v-model="state.newMessage"
              @keydown.enter="sendMessage"
              placeholder="Start typing..."
            />
            <button
              class="p-1 px-4 text-white uppercase bg-green-500 border rounded shadow"
              :disabled="state.newMessage === ''"
              @click="sendMessage"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { chatsRef } from "../utilities/firebase";

export default {
  name: "Chat",
  setup() {
    const chatContainerRef = ref(null);

    const state = reactive({
      chats: [],
      newMessage: "",
    });

    const store = useStore();

    const userId = computed({
      get: () => (store.state.user !== null ? store.state.user.uid : null),
    });

    function scrollToBottom() {
      setTimeout(() => {
        chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight;
      }, 50);
    }

    function sendMessage() {
      console.log("userId in send message func", userId);
      chatsRef.push().set({ userId: userId.value, message: state.newMessage });
      state.newMessage = "";
    }

    onMounted(async () => {
      scrollToBottom();
      chatsRef.on("child_added", (snapshot) => {
        state.chats.push({ key: snapshot.key, ...snapshot.val() });
        scrollToBottom();
      });
    });

    return { state, sendMessage, userId, chatContainerRef };
  },
};
</script>
