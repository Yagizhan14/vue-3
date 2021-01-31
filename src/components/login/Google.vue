<template>
  <section class="my-4 text-center">
    <button
      @click="onSigninWithGoogle"
      class="w-full p-2 text-white uppercase bg-green-500 rounded shadow-md"
    >
      <span>Sign In With Google</span>
    </button>
  </section>
</template>

<script>
import firebase from "../../utilities/firebase";

export default {
  name: "LoginWithGoogle",
  props: {
    onSignInComplete: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async onSigninWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await firebase.auth().signInWithPopup(provider);
        this.$store.commit("setUser", res.user);
        this.$store.commit("setLoggedIn", true);
        this.$props.onSignInComplete();
      } catch (err) {
        console.log("firebase login with google error", err);
      }
    },
  },
};
</script>

<style></style>
