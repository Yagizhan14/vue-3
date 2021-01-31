export default function auth(to, from, next, store) {
  if (!store.state.isLoggedIn) {
    store.commit("setLoginModalVisible", true);
  } else {
    next();
  }
}
