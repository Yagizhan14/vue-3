<template>
  <nav
    class="flex items-center w-full px-4 py-2 text-white bg-gradient-to-r from-blue-800 to-blue-600"
  >
    <router-link
      class="mr-4 text-gray-300 hover:text-white"
      v-for="route in routes"
      :to="route.path"
      :key="route.path"
      >{{ route.label }}</router-link
    >
    <button
      v-if="isLoggedIn"
      @click="onSignOut"
      class="px-3 py-1 ml-auto text-white uppercase bg-green-600 rounded"
    >
      Sign Out
    </button>
    <button
      v-else
      @click="onClickSignIn"
      class="px-3 py-1 ml-auto text-white uppercase bg-green-600 rounded"
    >
      Sign In
    </button>
  </nav>
</template>

<script>
import { routes } from "../router";
import firebase from "../utilities/firebase";

export default {
  name: "Nav",
  data() {
    return {
      routes,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    async onSignOut() {
      try {
        await firebase.auth().signOut();
        this.$store.commit("setUser", null);
        this.$store.commit("setLoggedIn", false);
        console.log("firebase successfully signed user out");
      } catch (err) {
        console.log("firebase sign out error", err);
      }
    },
    onClickSignIn() {
      this.$store.commit("setLoginModalVisible", true);
    },
  },
};
</script>
