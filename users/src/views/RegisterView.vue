<template>
  <div>
    <h2>Registro de usuário</h2>
    <hr>
    <div class="columns is-centered ">    
      <div class="column is-half ">
        <div v-if="error!=undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>
        <p>Nome</p>
        <input type="text" placeholder="Nome do usuário" class="input" v-model="name">
        <p>Email</p>
        <input type="email" placeholder="Email@email.com" class="input" v-model="email">
        <p>Password</p>
        <input type="password" placeholder="********" class="input" v-model="password">
        <hr>
        <button class="is-success button is-fullwidth " @click="register">Cadastrar</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      name: '',
      password:'',
      email: '',
      error: undefined
    }
  },
  methods: {
    
    register(){
      axios.post("http://localhost:8686/user",{
        name: this.name,
        email: this.email,
        password: this.password

      }).then(res =>{
        console.log(res)
        this.$router.push({name: "home"})
      }).catch(err =>{
        var msgErro = err.response.data.err;
        this.error = msgErro;
        console.log(msgErro);
      })

    }
  }
}
</script>

<style>
.column.is-half {
  background-color: rgba(224, 224, 224, 0.978);
}
</style>