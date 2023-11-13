<template>
    <div class="content">
      <div class="dashboard is-full-height">
  
        <!-- left panel -->
        <LeftPanelView/>
      <!--END left panel -->

      <!-- main section -->
      <div class="dashboard-main is-scrollable">
        <nav class="navbar " >
          <ul >
            <li>
              <h3>Bem vindo!  </h3>
            </li>
            <li>
              <h3 v-if="isAdmin == 1" >Usuário : {{ name }}</h3>
            </li>
          </ul>
        </nav>
        <section class="section">
          <label for=""><h4> Busca Ordens de serviços</h4></label><br>
          <input type="text" placeholder="Buscar OS cadastrados" v-model="findIdOs" class="input" >
          <button class="button is-info is-fullwidth" type="submit" @click="findOs()">Buscar</button>
          
          <hr>
          <h2 class="cabecalho">Ordens de serviços cadastradas </h2>
          <button class="button is-success is-fullwidth" @click="showModalCreate =true">Cadastrar nova Ordem de serviço</button>
          <hr>
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
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Situacao</th>
                </tr>
              </thead>
              
            <tbody class="is-clipped">
                <tr v-for="os in oss" :key="os.os">
                  <td>{{ os.os }}</td>
                  <td>{{ os.data_os }}</td>
                  <td>{{ os.equipamento }}</td>
                  <td>{{ os.defeito }}</td>
                  <td>{{ os.servico }}</td>
                  <td>{{ os.tecnico }}</td>
                  <td>{{ os.valor }}</td>
                  <td>{{ os.idcli_os }}</td>
                  <td>{{ os.tipo }}</td>
                  <td>{{ os.situacao }}</td>
          
                  <td>
                    <button class="button is-warning is-small is-hovered" @click="editOs(os)">Editar</button> |
                    <button class="button is-danger is-small is-focused" @click="removeOs(os)">Deletar</button> |
                    <button class="button  is-small is-focused" @click="selectedOs =os; printOs()">Imprimir</button> 
                  </td>
                </tr>
                
            </tbody>
          </table>
          <button class="button is-success" @click="showModalCreate =true">Cadastrar novo</button>
          <button class="button is-focused" @click="printAllOs()">Gerar relatório</button>
          <button v-if="backButton" class="button is-focused" @click="findIdOs ='',fetchClient(), backButton = false ">Voltar</button>

          <!-- Modal create -->
                <div :class="{modal: true, 'is-active is-fullwidth':showModalCreate}">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title">Ordem de serviço</p>
                    <button class="delete" aria-label="close" @click="showModalCreate = false"></button>
                  </header>
                  <section class="modal-card-body">
                    <p>OS</p>
                    <input class="input" type="number" :value=nextOs disabled>
                                       
                    <p>Equipamento</p>
                    <input class="input"  v-model="showModalData.equipamento" type="text">

                    <p>Defeito</p>
                    <input class="input" v-model="showModalData.defeito" type="text">

                    <p>Serviço</p>
                    <input class="input" type="text" style="height: 100px;"  v-model="showModalData.servico">

                    <p>Técnico</p>
                    <input class="input" type="text" :value="this.name" disabled>

                    <p>Selecionar Cliente:</p>
                    <select class="select is-medium"  v-model="showModalData.idcli_os" >
                      <option value="">Selecione um cliente</option>
                      <option  v-for="clients in this.arrayDataName" :key="clients.idcli_os" :value="parseInt(clients.idcli_os)">{{ clients.idcli  }}</option>
                    </select>
                   
                    <p>Valor</p>
                    <input class="input" v-model="showModalData.valor" type="number">
                    <hr>
                    <p>Tipo</p>

                    <input class="radio" v-model="showModalData.tipo" type="radio" id="Orçamento" checked name="tipo" value="Orçamento">
                    <label class="radio"  >Orçamento</label><br>
                    <input class="radio"  v-model="showModalData.tipo"  type="radio"  name="tipo" value="OS">
                    <label class="radio">OS</label><br>
                    <hr>
                    <p>Situação</p>

                    <input  class="radio" v-model="showModalData.situacao" type="radio" name="situacao" value="Aceita">
                    <label class="radio" >Aceita</label><br>
                    <input  class="radio" type="radio"  checked name="situacao" v-model="showModalData.situacao"  value="Recusada">
                    <label class="radio" >Recusada</label><br>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button is-success" @click="createOs()">Save changes</button>
                    <button class="button" @click="showModalCreate = false">Cancel</button>
                  </footer>
                </div>
              </div>
           <!-- Modal  END create -->
           <!-- Modal edit -->
           <div :class="{modal: true, 'is-active is-fullwidth':showModalEdit}">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title">Editar Ordem de Serviço</p>
                    <button class="delete" aria-label="close" @click="showModalEdit = false"></button>
                  </header>
                  <section class="modal-card-body">
                    <p>OS</p>
                    <input class="input" type="number" :value=nextOs disabled>
                                       
                    <p>Equipamento</p>
                    <input class="input"  v-model="showModalDataEdit.equipamento" type="text">

                    <p>Defeito</p>
                    <input class="input" v-model="showModalDataEdit.defeito" type="text">

                    <p>Serviço</p>
                    <input class="input" type="text"  style="height: 100px;" v-model="showModalDataEdit.servico">

                    <p>Técnico</p>
                    <input class="input" type="text" :value="this.name" disabled>

                    <p>Valor</p>
                    <input class="input" v-model="showModalDataEdit.valor" type="number">
                    <hr>
                    <p>Tipo</p>

                    <input class="radio" v-model="showModalDataEdit.tipo" type="radio" id="Orçamento" checked name="tipo" value="Orçamento">
                    <label class="radio"  >Orçamento</label><br>
                    <input class="radio"  v-model="showModalDataEdit.tipo"  type="radio"  name="tipo" value="OS">
                    <label class="radio">OS</label><br>
                    <hr>
                    <p>Situação</p>

                    <input  class="radio" v-model="showModalDataEdit.situacao" type="radio" name="situacao" value="Aceita">
                    <label class="radio" >Aceita</label><br>
                    <input  class="radio" type="radio"  checked name="situacao" v-model="showModalDataEdit.situacao"  value="Recusada">
                    <label class="radio" >Recusada</label><br>
                  </section>
                  <footer class="modal-card-foot">
                      
                    <button class="button is-success" @click="updateOs()">Save changes</button>
                    <button class="button" @click="showModalEdit = false">Cancel</button>
                  </footer>
                  
                </div>
              </div>
           <!-- Modal  END edit -->
           
        </section>
      </div><!--Mail dashboard END-->
      <div class="dashboard-panel is-small rigth"></div>
            
      </div><!--Dashboard END-->
    </div> <!--Content END-->
          
  </template>
  
  <script>
  import axios from 'axios';
  import LeftPanelView from './LeftPanelView.vue'

  export default {
    components: {
      LeftPanelView,
      
    },
    created(){
        axios.get("http://localhost:8686/os").then(res =>{
          
          this.oss = res.data;
          // console.log("resaqui")
          console.log(res.data.idcli_os)
          this.name = localStorage.getItem('name');
          const maxOs = Math.max(...this.oss.map(os => os.os));
         
          

        // Defina o próximo valor de OS
          this.nextOs = maxOs + 1;
        }).catch(err =>{
          console.log(err);
        });
        axios.get("http://localhost:8686/client").then(res =>{
          this.arrayDataName = res.data
          console.log(this.arrayDataName)
          console.log(this.arrayDataName)
          const names = this.arrayDataName.map(objeto => objeto.nomecli)
          console.log(names)
          })
    },
    data (){
      return{
        names: [],
        arrayDataName: [],
        selectedOs: null,
        name: '',
        namecli: '',
        oss: [],
        findIdOs: '',
        backButton: false,
        showedMenuCad: false,
        showedMenuRel: false,
        showModalCreate: false,
        showModalEdit: false,
        showModalData: {
          os: 0,
          equipamento: '',
          defeito: '',
          servico: '',
          tecnico: '',
          valor: 0,
          idcli_os: '',
          tipo: '',
          situacao: '',
        },
        nextOs: "",
        showModalDataEdit: {
          os: 0,
          equipamento: '',
          defeito: '',
          servico: '',
          tecnico: this.name,
          valor: 0,
          idcli_os: this.idcli_os,
          tipo: '',
          situacao: '',
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
      printOs (){
  
        axios.get("http://localhost:8686/print/os/"+this.selectedOs.os, { responseType: 'blob' })
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
      printAllOs (){
  
        axios.get("http://localhost:8686/print/allos/", { responseType: 'blob' })
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
        //Funtion to create a new Client.
      
      createOs(){
         

            axios.get("http://localhost:8686/client").then(res =>{
            this.namecli = res.data;
            this.name = localStorage.getItem('name');
            console.log(res)
          }).catch(err =>{
            console.log(err);
          });
          console.log(this.namecli) 
          console.log("aqui em cima") 
          axios.post("http://localhost:8686/os",  { ...this.showModalData, tecnico:this.name,  }).then( res => {


           res.status = "ok"
            this.showSuccessMessage = "";
            this.showModalData.equipamento  = "";
            this.showModalData.defeito  = "";
            this.showModalData.servico  = "";
            //this.showModalData.tecnico  = "";
            this.showModalData.valor  = "";
            this.showModalData.tipo  = "";
            this.showModalData.situacao  = "";

            
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
        axios.get("http://localhost:8686/os").then(res =>{
          this.oss = res.data;
   
          this.name = localStorage.getItem('name');

          
          console.log(res)
        }).catch(err =>{
          console.log(err);
        });
      },
      //Function to take data on model to Edit user.
      editOs(os){
        this.showModalDataEdit = {
         
          os: os.os,
          equipamento: os.equipamento,
          defeito: os.defeito,
          servico: os.servico,
          tecnico: this.name,
          valor: os.valor,
          tipo: os.tipo,
          situacao: os.situacao,
          
        };
        this.showModalEdit = true
        console.log(this.showModalDataEdit)
      },
      //Funtion to update data on database.
      updateOs(){
       
        axios.put("http://localhost:8686/os", this.showModalDataEdit).then(res =>{
          console.log(this.showModalDataEdit.servico)
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
      removeOs(os){
  
        console.log(os.os)
  
        if(confirm(`Deseja excluir a OS ` + os.os + " ?")){
          axios.delete("http://localhost:8686/os/"+os.os).then(res =>{
            console.log(res)
            
            setTimeout(() => {
  
              alert("Ordem de serviço removida com sucesso!")
              this.fetchClient()
              
            }, 1000);
          }).catch(err =>{
            console.log(err)
          })
        }
      },
      // Funtion to Find Os by ID
      findOs(){
        if (this.findIdOs.trim() ===   '') {
          this.fetchClient()  
        } else {
          
          axios.get("http://localhost:8686/os/" + this.findIdOs)
          .then(res =>{
            this.backButton = true; 
            this.oss = [res.data];
          }).catch(err => {
                  console.log(err);
                  alert("Os não encontrada!")
                  this.findIdOs = '';
                  this.fetchClient()  
        });
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
    text-decoration: none;
    color: white;
    border-bottom: 1px solid;
  }
  .button {
  margin: 1%;
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