<template>
  <div id="signin">
    サインインページ
    <div>
      <button @click="googleLogin">Google ログイン</button>
    </div>
  </div>
</template>
<style>
</style>
<script>
    import firebase from 'firebase'
    import router from '../router'
    export default {
        methods: {
            googleLogin: function() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then(function() {
                router.push("/");
            }).catch(function(error) {
                alert(error.message)
                });
            }
        }
    }
</script>