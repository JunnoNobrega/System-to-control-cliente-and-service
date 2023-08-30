<template>
  <div class="home">
    <a href="/">home</a><br>
    <a href="/admin/users">admin/users</a><br>
    <a href="/register">register</a><br>
    <a href="/login">login</a><br>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
