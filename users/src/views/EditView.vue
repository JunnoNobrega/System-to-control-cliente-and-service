<template>
  <div>
    <h2>Edição de Usuário</h2>
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

        <hr>
        <button class="is-success button is-fullwidth " @click="update">Editar</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {

  
  created(){
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res =>{

      console.log(res)

      this.name = res.data.name;
      this.email = res.data.email;
      this.id = res.data.id;


    }).catch(err =>{
      console.log(err)
      this.$router.push({name: 'Users'});
    })

  },


  data(){
    return {
      name: '',
      email: '',
      id: -1,
      role: 0,
      error: undefined
    }
  },
  methods: {
    
    update(){
      var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
      axios.put("http://localhost:8686/user",{
        name: this.name,
        email: this.email,
        id: this.id

      },req).then(res =>{
        console.log(res)
        console.log(this.name)
        this.$router.push({name: "Users"})
      }).catch(err =>{
        console.log(err)
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