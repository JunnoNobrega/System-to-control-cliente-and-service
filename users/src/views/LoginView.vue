<template>
    <div>
        <h2>Login</h2>
        <hr>
        <div class="columns is-centered ">    
      <div class="column is-half ">
        <div v-if="error!=undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>

        <p>Login</p>
        <input type="email" placeholder="Digite seu login" class="input" v-model="email">
        <p>Password</p>
        <input type="password" placeholder="********" class="input" v-model="password">
        <hr>
        <button class="is-success button is-fullwidth " @click="login">Login</button>
      </div>
    </div>
    </div>

</template>
<script>
import axios from 'axios';

export default {
  data(){
    return {
      password:'',
      email: '',
      error: undefined
    }
  },
  methods: {
    login(){
        axios.post("http://localhost:8686/login",{
        email: this.email,
        password: this.password

      }).then(res =>{
        console.log(res)
        localStorage.setItem('token',res.data.token);
        this.$router.push({name: "home"})
      }).catch(err =>{
        var msgErro = err.response.data.err;
        this.error = msgErro;
        console.log(err);
      })

    }
  }
}
</script>
.column.is-half {
    background-color: rgba(224, 224, 224, 0.978);
  }
<style>

</style>