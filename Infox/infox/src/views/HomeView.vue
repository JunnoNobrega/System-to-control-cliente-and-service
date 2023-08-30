<template>
  <div class="content">
    <div class="dashboard is-full-height">

  <!-- left panel -->


  <div class="dashboard-panel is-small is-small">
      <aside class="menu">

        <ul class="menu-list">
          <li>
            <a @click="showMenuCad">Cadastro ></a>
            <a v-if="showedMenuCad">Cliente</a>
            <a v-if="showedMenuCad">Os</a>
            <a v-if="showedMenuCad">Usuários</a>
          </li>
          <li>
            <a @click="showMenuRel">Relatório ></a>
            <a v-if="showedMenuRel">Clientes</a>
            <a v-if="showedMenuRel">Serviços</a>
          </li>
          <li>
            <a href="/login" class="is-right">logout</a>
          </li>
        </ul>
       
      </aside>
  </div>

  <!-- main section -->
  <div class="dashboard-main is-scrollable">
    <nav class="navbar ">
      <ul>
        <li>
          <h3>Bem vindo:  </h3>
        </li>
        <li>
          <h3>{{ name }}</h3>
        </li>
        
      </ul>
    </nav>
    <section class="section">
      <label for=""><h4>  Cadastro de clientes</h4></label><br>
      <input type="text" placeholder="Buscar clientes cadastrados" class="input ">
      <button class="button is-info is-fullwidth">Buscar</button>
      <hr>
      <table class="table  is-bordered">
          <thead>
          <h2>Clientes cadastrados</h2>
            <tr>
              <th> Id</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Fone</th>
              <th>Email</th>
              <th>Opções</th>
              
            </tr>
          </thead>
          
        <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.idcli }}</td>
              <td>{{ user.nomecli }}</td>
              <td>{{ user.endcli }}</td>
              <td>{{ user.foneclie }}</td>
              <td>{{ user.emailcli }}</td>

              <td>
                <button class="button is-warning is-small is-hovered">Editar</button> |
                <button class="button is-danger is-small is-focused">Deletar</button> 
              </td>
            </tr>
            
        </tbody>
      </table>
        <button class="button is-success">Cadastrar novo</button>
    </section>

    <!-- the footer will take up all unused space at the bottom -->
 
  </div>

  <!-- right panel -->
  <div class="dashboard-panel is-small rigth">
  </div>
</div>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  created(){
      axios.get("http://localhost:8686/client").then(res =>{
        
        console.log(res);
        this.users = res.data;
        this.name = localStorage.getItem('name');
        console.log(this.name)
      }).catch(err =>{
        console.log(err);
      });
      
  },
  data (){
    return{
      name: '',
      users: [],
      showedMenuCad: false,
      showedMenuRel: false
    }
  },
  methods: {
    showMenuCad(){
      this.showedMenuCad = !this.showedMenuCad
    },
    showMenuRel(){
      this.showedMenuRel = !this.showedMenuRel
    }
  }
}
</script>

<style scoped>

h1 {
  color: black
}
.section{
  background-color: white ; 
  color: #024572;
}
.dashboard {
  color: aliceblue;
}
.content ul{
  text-decoration: none;
  text-align: left;

 
}
.content ul :hover {

  color: #024572;
}
.menu-list a{
  color: white;
  border-bottom: 1px solid;
}
.input{
  margin-bottom: 1%;
}
.dashboard-panel.is-small.rigth{
  flex: 0 0 3rem;
}
</style>