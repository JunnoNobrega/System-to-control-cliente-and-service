<template>
   <div class="content">
    <div class="dashboard is-full-height">
        <LeftPanelView/>
        <div class="dashboard-main is-scrollable">
            <section class="section">
                    
                    <ul id="navgator">
                        <button class="button is-link  is-large"><router-link :to="{name: 'home'}">Cadastro de Clientes</router-link></button>
                        <button class="button is-link  is-large"><router-link :to="{name: 'os'}">Cadastro de OS</router-link></button>
                        <button class="button is-link  is-large"><router-link :to="{name: 'user'}">Cadastro de Usuários</router-link></button>
          
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
#navgator button {
    margin: 1%;
    justify-content: space-between;
    text-align: center;
    margin: 1%;
    justify-content: space-between;
    text-align: center;
    height: 30vh;
    width: 100%;
}
#navgator button a{
    color: aliceblue;
}
#navgator li:first-child {
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