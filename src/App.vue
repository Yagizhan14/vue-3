<template>
  <Nav />
  <div class="flex w-full">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal />
  </teleport>
</template>

<script>
import firebase from "./utilities/firebase";
import Nav from "./components/Nav.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
  name: "App",
  components: { Nav, LoginModal },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setUser", user);
        this.$store.commit("setLoggedIn", true);
      } else {
        this.$store.commit("setLoggedIn", false);
      }
    });
  },
};
</script>

<style>
body {
  background-color: #fff;
}

ul {
  list-style: none;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
