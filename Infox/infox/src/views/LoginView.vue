<template>
   
  <div class="content">
    <h1>INFO X</h1>

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
                <input type="email" class="input" v-model="email"> 
                <p>Senha</p>
                <input type="password" class="input" v-model="password">
                <hr>
                <button class="button is-success is-fullwidth" type="submit"> Login</button>
                
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
      
    }
  },
  methods: {
    login(){
        axios.post("http://localhost:8686/login",{
        email: this.email,
        password: this.password,
        
        
      }).then(res =>{
          
          console.log(this.name),
          console.log(this.password)
        console.log(res)
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('name',res.data.name);
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
</style>