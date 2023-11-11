<template>
   <div class="content">
    <div class="dashboard is-full-height">
        <LeftPanelView/>
        <div class="dashboard-main is-scrollable">
          
            <section class="section">
              <h1>Bem Vindo! </h1>
              <h2 v-if="isAdmin == 1" >Usuário : {{ name }}</h2>
                    <ul id="navgator">
                      <router-link  class="routerlink button is-link  is-large" :to="{name: 'client'} ">Cadastro de Clientes</router-link>
                        <router-link class="routerlink button is-link  is-large" :to="{name: 'os'}">Cadastro de OS</router-link>
                        <router-link v-if="isAdmin == 1" class="routerlink button is-link  is-large" :to="{name: 'user'}">Cadastro de Usuários</router-link>
                    </ul>
            </section>
        </div>
    </div>
   </div>
          
 </template>

<script>
import LeftPanelView from './LeftPanelView.vue'
export default {
    components: {
      LeftPanelView,
    },
    data(){
      return{
        name:  localStorage.getItem('name'),
        isAdmin: localStorage.getItem('role'),
      }
    },

}
</script>

<style scoped>
  
h1 {
  color: black
}
.section{
  background-color: white ; 
  color: #024572;
  height: 100%;
}
.dashboard {
  color: aliceblue;
}
#navgator{
    width: 100%;
    display: flex;
    
}
.routerlink {
    margin: 1%;
    justify-content: space-between;
    text-align: center;
    margin: 1%;
    justify-content: space-between;
    height: 30vh;
    width: 100%;
    background: #485fc7;
}
.routerlink button {
    text-align: center;
    color: aliceblue;
}
.routerlink li:first-child {
    inline-size: none;
    background-color: red;
    padding: auto;;
}

.content ul{
  text-decoration: none;
  text-align: left;

 
}
.content ul :hover {
  
  color: #024572;
}

.menu-list a{
  text-decoration: none;
  color: white;
  border-bottom: 1px solid;
}
.input{
  margin-bottom: 1%;
}
.dashboard-panel.is-small.rigth{
  flex: 0 0 3rem;
}
.dashboard-main {
  display: flex;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
 
}
thead{
  margin: 0 auto;
  text-align: center;
  align-self: center;
}
.cabecalho {
  margin-bottom: 1%;
}
.modal-card{
  widows: inherit;
  width: 75%;
  text-align: left;
  
}
</style>