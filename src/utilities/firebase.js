import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCpVUfeMomVo-Wj3G6FS9Aa7FuxsLwSkVA",
  authDomain: "vue-3-45f5d.firebaseapp.com",
  projectId: "vue-3-45f5d",
  storageBucket: "vue-3-45f5d.appspot.com",
  messagingSenderId: "921700338792",
  appId: "1:921700338792:web:9c642a3cef8e80b6617fdd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export const chatsRef = db.ref("chats/");
export default firebase;
