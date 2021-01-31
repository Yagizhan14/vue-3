<template>
  <div v-if="isLoginModalVisible">
    <section
      @click="closeModal"
      class="fixed top-0 z-20 w-screen h-screen bg-gray-500 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex items-center justify-center h-full">
        <div class="z-30 w-1/5 p-2 m-auto bg-white rounded shadow flex-column">
          <div class="p-2">
            <h1 class="text-2xl font-bold text-center">Login</h1>
            <LoginWithGoogle :on-sign-in-complete="closeModal" />
            <p class="my-5 text-center">Or</p>
            <form class="py-2 my-2" @submit.prevent="onSubmitForm">
              <div class="flex flex-col my-2">
                <label for="email">Email or username</label>
                <input
                  class="w-full p-2 mt-2 border rounded shadow"
                  type="email"
                  name="email"
                  required
                  v-model="email"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="password">Password</label>
                <input
                  class="w-full p-2 mt-2 border rounded shadow"
                  type="password"
                  name="password"
                  required
                  v-model="password"
                />
              </div>
              <div class="mt-6">
                <button
                  :disabled="isLoading"
                  :class="isLoading && 'pointer-events-none bg-gray-300'"
                  type="submit"
                  class="w-full p-2 text-white uppercase bg-green-500 rounded shadow-md"
                >
                  <span v-if="!isLoading">Submit</span>
                  <span v-else>Submitting... ⌛</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import LoginWithGoogle from "./login/Google";

export default {
  name: "LoginModal",
  components: { LoginWithGoogle },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  computed: {
    isLoginModalVisible() {
      return this.$store.state.isLoginModalVisible;
    },
  },
  methods: {
    async onSubmitForm() {
      this.isLoading = true;
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.isLoading = false;
        this.$store.commit("setUser", res);
        this.$store.commit("setLoggedIn", true);
        this.closeModal();
      } catch (err) {
        this.isLoading = false;
        console.log("firebase login error", err);
      }
    },
    clearForm() {
      this.email = "";
      this.password = "";
    },
    closeModal() {
      this.clearForm();
      this.$store.commit("setLoginModalVisible", false);
    },
  },
};
</script>

<style></style>
