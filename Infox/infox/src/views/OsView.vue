<template>
    <div class="content">
      <div class="dashboard is-full-height">
  
        <!-- left panel -->
        <div class="dashboard-panel is-small is-small">
              <aside class="menu">
  
                <ul class="menu-list">
                  <li>
                    <a @click="showMenuCad">Cadastro ></a>
                    <a v-if="showedMenuCad" @click="showModalCreate =true">Cliente</a>
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
      <!--END left panel -->
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
          <label for=""><h4> Busca Ordens de serviços</h4></label><br>
          <input type="text" placeholder="Buscar clientes cadastrados" class="input ">
          <button class="button is-info is-fullwidth">Buscar</button>
          <hr>
          <h2 class="cabecalho">Ordens de serviços cadastradas </h2>
          <table class="table  is-bordered">
              <thead>
              <div v-if="showSuccessMessage">
                              <div class="notification is-success">
                                <p>Usuário Editado com sucesso</p>
                              </div>
              </div>
          
                <tr>
                  <th> OS</th>
                  <th>Data_OS</th>
                  <th>Equipamento</th>
                  <th>Defeito</th>
                  <th>Serviço</th>
                  <th>Tecnico</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Situacao</th>
                </tr>
              </thead>
              
            <tbody>
                <tr v-for="os in oss" :key="os.os">
                  <td>{{ os.os }}</td>
                  <td>{{ os.data_os }}</td>
                  <td>{{ os.equipamento }}</td>
                  <td>{{ os.defeito }}</td>
                  <td>{{ os.servico }}</td>
                  <td>{{ os.tecnico }}</td>
                  <td>{{ os.valor }}</td>
                  <td>{{ os.tipo }}</td>
                  <td>{{ os.situacao }}</td>
          
                  <td>
                    <button class="button is-warning is-small is-hovered" @click="editClient(user)">Editar</button> |
                    <button class="button is-danger is-small is-focused" @click="removeClient(user)">Deletar</button> 
                  </td>
                </tr>
                
            </tbody>
          </table>
          <button class="button is-success" @click="showModalCreate =true">Cadastrar novo</button>
            
            <!-- Modal Create -->
                <div :class="{modal: true, 'is-active':showModalCreate}">
                    <div class="modal-background">
                      
                    </div>
  
                    <div class="modal-content">
                        <div class="box">
                        <h1>Cadastrar novo Cliente: </h1>
                                          <div v-if="showSuccessMessage">
                                  <div class="notification is-success">
                                      <p>Usuário cadastrado com sucesso</p>
                                  </div>
                                </div>
                        <p>Nome</p>
                        <input type="text" v-model="showModalData.nomecli" placeholder="digite o nome do usuário" class="input">
                        <p>Endereço</p>
                        <input type="text" v-model="showModalData.endcli" placeholder="digite o endereço" class="input">
                        <p>Fone</p>
                        <input type="tel" v-model="showModalData.foneclie" placeholder="digite o telefone" maxlength="14" class="input">
                        <p>Email</p>
                        <input type="email" v-model="showModalData.emailcli" placeholder="digite o Email" class="input">
                        <button class="button is-success is-fullwidth" @click="createClient()">Cadastrar novo cliente</button><br>
                        <button class="button is-danger is-fullwidth" @click="showModalCreate =false">Cancelar</button>
                    </div>
                  </div>
                  <button class="modal-close is-large" aria-label="close" @click="showModalCreate =false"></button>
              </div>
            <!-- END Modal Create -->
            <!-- Modal Edit -->
              <div :class="{modal: true, 'is-active':showModalEdit}">
                    <div class="modal-background">
                    </div>
                    <div class="modal-content">
                        <div class="box">
                                  <div v-if="error!=undefined">
                        <div class="notification is-danger">
                            <p>{{ error }}</p>
                        </div>
                        </div>
                          <h1>Editar Cliente ID: {{ showModalDataEdit.idcli }} </h1>
                          <div v-if="showSuccessMessage">
                              <div class="notification is-success">
                                <p>Usuário Editado com sucesso</p>
                              </div>
                          </div> 
                          <p>Nome</p>
                          <input type="text" v-model="showModalDataEdit.nomecli" class="input">
                          <p>Endereço</p>
                          <input type="text" v-model="showModalDataEdit.endcli"   class="input">
                          <p>Fone</p>
                          <input type="tel" v-model="showModalDataEdit.foneclie" maxlength="14" class="input">
                          <p>Email</p>
                          <input type="email" v-model="showModalDataEdit.emailcli" class="input">
                          <button class="button is-success is-fullwidth" @click="updateClient()">Editar cliente</button><br>
                          <button class="button is-danger is-fullwidth" @click="showModalEdit =false">Cancelar</button>
                        </div>
                    </div>
                  <button class="modal-close is-large" aria-label="close" @click="showModalEdit =false"></button>
              </div>
            <!--END Modal Edit -->
        </section>
      </div>
        <div class="dashboard-panel is-small rigth">
            </div>
            </div>
        </div>
        
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    created(){
        axios.get("http://localhost:8686/os").then(res =>{
          this.oss = res.data;
          this.name = localStorage.getItem('name');
  
        }).catch(err =>{
          console.log(err);
        });
        
    },
    data (){
      return{
        name: '',
        oss: [],
        showedMenuCad: false,
        showedMenuRel: false,
        showModalCreate: false,
        showModalEdit: false,
        showModalData: {
          os: 0,
          data_os: '',
          equipamento: '',
          defeito: '',
          servico: '',
          tecnico: '',
          valor: 0,
          tipo: '',
          situacao: '',
        },
        showModalDataEdit: {

      },
        selectedUserId: null,
      }
    },
    methods: {
      showMenuCad(){
        this.showedMenuCad = !this.showedMenuCad
      },
      showMenuRel(){
        this.showedMenuRel = !this.showedMenuRel
      },
      //Funtion to create a new Client.
      createClient(){
        axios.post("http://localhost:8686/client", this.showModalData).then( res => {
            console.log(res)
            this.showSuccessMessage = true;
            this.showModalData.nomecli = '';
            this.showModalData.endcli = '';
            this.showModalData.foneclie = '';
            this.showModalData.emailcli = '';
            setTimeout(() => {
              this.showModalCreate = false;
              this.fetchClient()
              this.showSuccessMessage = false;
            }, 2000);
        }).catch (err => {
          console.log(err);
        })
      },
      // Funtion to reload data on page.
      fetchClient(){
        axios.get("http://localhost:8686/client").then(res =>{
          this.users = res.data;
          this.name = localStorage.getItem('name');
          console.log(res)
        }).catch(err =>{
          console.log(err);
        });
      },
      //Function to take data on model to Edit user.
      editClient(user){
        this.showModalDataEdit = {
          idcli: user.idcli,
          nomecli: user.nomecli,
          endcli: user.endcli,
          foneclie: user.foneclie,
          emailcli: user.emailcli,
          
          
        };
        this.showModalEdit = true
      },
      //Funtion to update data on database.
      updateClient(){
       
        axios.put("http://localhost:8686/client", this.showModalDataEdit).then(res =>{
          this.showSuccessMessage = true;
          console.log(res)
          setTimeout(() => {
              this.showModalEdit = false;
              this.fetchClient()
              this.showSuccessMessage = false;
            }, 2000);
        }).catch(err => {
          console.log(err)
        })
      },
      //Funtion do Remove Cliente
      removeClient(user){
  
        console.log(user.nomecli)
  
        if(confirm(`Deseja excluir o cliente ` + user.nomecli + " ?")){
          axios.delete("http://localhost:8686/client/"+user.idcli).then(res =>{
            console.log(res)
            
            setTimeout(() => {
  
              alert("Cliente removido com sucesso!")
              this.fetchClient()
              
            }, 1000);
          }).catch(err =>{
            console.log(err)
          })
        }
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
  thead{
    margin: 0 auto;
    text-align: center;
    align-self: center;
  }
  .cabecalho {
    margin-bottom: 1%;
  }
  </style>