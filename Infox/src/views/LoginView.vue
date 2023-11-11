<template>
   
   

  <div class="content">
    

    <div class="columns is-centered">
        <div class="column is-half ">
            <div v-if="error!=undefined">
            <div class="notification is-danger">
                <p>{{ error }}</p>
            </div>
            </div>
        
            <form  class="box" @submit.prevent="login">
              <div class="field">
                <p>Login</p>
                <input type="email" class="input" placeholder="Digite o email!" v-model="email"> 
                <p>Senha</p>
                <input type="password" class="input" placeholder="Digite a senha!" v-model="password">
                <hr>
                <button class="button is-success is-fullwidth" type="submit"> Login</button><br>
                <router-link :to="{name: 'home'}"><p class="goback"  >Clique aqui para voltar para página inicial!</p></router-link> 
              </div>

            </form>
        </div>
     </div>
</div>


</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      password: '',
      email: '',
      error: undefined,
      name: '',
      roleuser: 0
      
    }
    
  },
  methods: {
    //LOGIN FUNCTION
    login(){
        axios.post("http://localhost:8686/login",{
          //Objetc login data
        email: this.email,
        password: this.password,
        role: this.roleuser
        
      }).then(res =>{
  
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('name',res.data.name);
        localStorage.setItem('role',res.data.roleuser);
        
        this.$router.push({name : 'home'})
      }).catch(err =>{
        var msgErro = err.response.data.err;
        this.error = msgErro;

        console.log(err);
      })

    }
  }
}
</script>

<style scoped>
.content {
  height: 100vh ;
}
.content h1 {
  color: white;
  font-size: 2em;
  
}
.column.is-half {
   
    color: rgb(0, 0, 0);
    font-size: 1.5em;
    
  }
.goback {
  font-size:0.75em; 
  color: black;
}
.goback:hover {
  font-size:0.85em; 
  color: gray
}
</style>