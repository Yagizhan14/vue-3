import { onMounted, onUnmounted } from "vue";

export default function useWindowEvent(eventName, task) {
  onMounted(() => {
    window.addEventListener(eventName, task);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, task);
  });
}
