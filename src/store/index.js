import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      isLoginModalVisible: false,
      user: null,
    };
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoginModalVisible(state, payload) {
      state.isLoginModalVisible = payload;
    },
  },
});

export default store;
