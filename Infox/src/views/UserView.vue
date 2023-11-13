<template>
    
    <div class="content">

      <div class="dashboard is-full-height">
       
        <!-- left panel -->
        <LeftPanelView/>
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
          <label for=""><h4>  Cadastro de Usuários</h4></label><br>
          <input type="text" placeholder="Buscar Usuários cadastrados" v-model="findIdUser" class="input ">
          <button class="button is-info is-fullwidth" type="submit" @click="findUser()">Buscar</button>
          
          <hr>
          <table class="table  is-bordered">
              <thead>
              <h2>Usuários cadastrados</h2>
              <div v-if="showSuccessMessage">
                              <div class="notification is-success">
                                <p>Usuário Editado com sucesso</p>
                              </div>
              </div>
          
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Opções</th>
                  
                </tr>
              </thead>
              
            <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button class="button is-warning is-small is-hovered" @click="editClient(user)">Editar</button> |
                    <button class="button is-danger is-small is-focused" @click="removeClient(user)">Deletar</button> 
                  </td>
                </tr>
                
            </tbody>
          </table>
          <button class="button is-success" @click="showModalCreate =true">Cadastrar novo usuário</button>
          <button class="button is-focused" @click="printUser()">Gerar relatório</button>
          <button v-if="backButton" class="button is-focused" @click="findIdUser ='',fetchClient(), backButton = false ">Voltar</button>
  
          <!-- Modal Create -->
                <div :class="{modal: true, 'is-active':showModalCreate}">
                    <div class="modal-background">
                      
                    </div>
  
                    <div class="modal-content">
                        <div class="box">
                        <h1>Cadastrar novo Usuário: </h1>
                                          <div v-if="showSuccessMessage">
                                  <div class="notification is-success">
                                      <p>Usuário cadastrado com sucesso</p>
                                  </div>
                                </div>
                        <p>Nome</p>
                        <input type="text" v-model="showModalData.name" placeholder="digite o nome do usuário" class="input">
                        <p>Email</p>
                        <input type="email" v-model="showModalData.email" placeholder="digite o Email" class="input">
                        <p>Senha</p>
                        <input type="password" v-model="showModalData.password" placeholder="Digite a Senha" class="input">
                        <input type="password" v-model="showModalData.passwordconfirm" placeholder="Confirme  a Senha" class="input">
                        <p>Função</p>
                        <input class="radio" v-model="showModalData.role" type="radio" id="Orçamento" checked name="tipo" value=0>
                        <label class="radio"  >Usuário</label><br>
                        <input class="radio"  v-model="showModalData.role"  type="radio"  name="tipo" value=1>
                        <label class="radio">Adminitrador</label><br>

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
                          <input type="text" v-model="showModalDataEdit.name" class="input">
                          <p>Email</p>
                          <input type="email" name="email" v-model="showModalDataEdit.email" class="input">

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
  import LeftPanelView from './LeftPanelView.vue'
  export default {
    components: {
      LeftPanelView,
    },
      
    created(){
        axios.get("http://localhost:8686/user").then(res =>{
          this.users = res.data;
          console.log(res.data)
          this.name = localStorage.getItem('name');
  
        }).catch(err =>{
          console.log(err);
        });
        
    },
    data (){
      return{
        name: '',
        users: [],
        findIdUser: '',
        backButton: false,
        showedMenuCad: false,
        showedMenuRel: false,
        showModalCreate: false,
        showModalEdit: false,
        showModalData: {
          nome: '',
          email: '',
          showSuccessMessage: false,
        },
        showModalDataEdit: {
        id: 0,
        nome: '',
        email: '',
        password: '',
        role: 1,
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
      printUser (){
        axios.get("http://localhost:8686/print/user", { responseType: 'blob' })
          .then(res => {
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Abra o PDF em uma nova janela
            window.open(url, '_blank');
          })
          .catch(err => {
            console.error(err);
          });
      },     
      createClient() {
        // Função para validar um email
        function validarEmail(email) {
          const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return regex.test(email);
        }

        if (this.showModalData.password === this.showModalData.passwordconfirm) {
          // Validar o email antes de fazer a requisição
          if (!validarEmail(this.showModalData.email)) {
            alert("O email inserido não é válido. Por favor, insira um email válido.");
            return; // Saia da função se o email for inválido
          }

              axios.post("http://localhost:8686/user", this.showModalData)
                .then(res => {
                  this.showSuccessMessage = true;
                  this.showModalData.name = '';
                  this.showModalData.email = '';
                  this.showModalData.password = '';
                  this.showModalData.passwordconfirm = '';
                  console.log(res);
                  setTimeout(() => {
                    this.showModalCreate = false;
                    this.fetchClient();
                    this.showSuccessMessage = false;
                  }, 2000);
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("A senha que você digitou na confirmação não corresponde à senha criada. Certifique-se de que ambas as senhas sejam idênticas para continuar.");
            }
          },
      // Funtion to reload data on page.
      fetchClient(){
        axios.get("http://localhost:8686/user").then(res =>{
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
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        };
        this.showModalEdit = true
      },
      //Funtion to update data on database.
      updateClient(){
       
        axios.put("http://localhost:8686/user", this.showModalDataEdit).then(res =>{
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
  
        console.log(user.name)
  
        if(confirm(`Deseja excluir o Usuário ` + user.name + " ?")){
          axios.delete("http://localhost:8686/user/"+user.id).then(res =>{
            console.log(res)
            
            setTimeout(() => {
  
              alert("Usuário  removido com sucesso!")
              this.fetchClient()
              
            }, 1000);
          }).catch(err =>{
            console.log(err)
          })
        }
      },
      findIdName(users, findIdUser){
     
      
            for (const key in users){
              if(Object.prototype.hasOwnProperty.call(users, key)) {
                const element = users[key];
            
                if(element.email === findIdUser ){
                 
                  return element.id
                } 
                if(findIdUser){
                  return element.id
                }
            }
            }
      },
      findUser(){

        if(this.findIdUser.trim() ===   ''){
          this.fetchClient()  
        }else {
          const idEncontrado = this.findIdName(this.users,this.findIdUser )

      
          if (idEncontrado !== null){
            axios.get("http://localhost:8686/user/" + idEncontrado)
              .then(res => {
                this.backButton = true; 
                console.log(res);
                // Atualiza a propriedade users com o cliente encontrado
                this.users = [res.data];
              
              })
              .catch(err => {
                console.log(err);
                alert("Usuário não encontrado!")
                this.findIdUser = '';
                this.fetchClient()  
              
                // Limpa a tabela se o cliente não for encontrado
              
              });
          }else {
            this.users = []
          }
        }
      },
    }
  }

  </script>
  <script>

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
  .content {
    flex-grow: 1;
}
  .content ul{
    text-decoration: none;
    text-align: left;
  
   

  }
  .button {
  margin: 1%;
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