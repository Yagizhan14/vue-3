import { ref } from "vue";
export default function useDebounce() {
  const timeout = ref("");

  function debounce(func, waitFor = 1000) {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(func, waitFor);
  }

  return { debounce };
}
