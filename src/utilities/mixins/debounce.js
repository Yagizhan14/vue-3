const debounce = {
  data() {
    return {
      timeout: "",
    };
  },
  methods: {
    debounce(func, waitFor = 1000) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(func, waitFor);
    },
  },
};

export default debounce;
