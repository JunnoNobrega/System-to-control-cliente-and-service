<template>
  <div class="app">
    <div class="leftpanel">
        <div class="">
              <aside class="menu">

                <ul class="menu-list">
                  <li>
                    <router-link :to="{name: 'home'}">Home</router-link> 
                    <router-link :to="{name: 'client'}">Cadastro de Cliente</router-link> 
                    <router-link :to="{name: 'os'}">Cadastro de OS</router-link>
                    <router-link v-if="isAdmin == 1" :to="{name: 'home'}">Cadastro de Usuarios</router-link>
                    <router-link :to="{name: 'login'}">Login</router-link> 
         
  
                  </li>
                  <li>
                    <a @click="showMenuRel" v-if="isAdmin == 1">Relatório ></a>
                  
                    <a v-if="showedMenuRel">Clientes</a>
                    
                    <a v-if="showedMenuRel">Serviços</a>
                  </li>
                  <li>
                    <a  class="is-right"  @click="logout">logout</a>
                  </li>
                </ul>
              
              </aside>

        </div>
    </div>
  </div>
</template>

<script>

export default {
 
    data (){
        return {
            showedMenuRel: false,
            role: 0,
            showedMenuUser : false,
            isAdmin: localStorage.getItem('role'),
            
        }
        
    },
    
    methods: {
        showMenuRel(){
      this.showedMenuRel = !this.showedMenuRel
    },
    
    showMenuUser(){
      this.showedMenuUser = !this.showedMenuUser
    },
    logout () {
      localStorage.clear();
      location.reload();
      
    },
    }

}
function removerTokenDoLocalStorage() {
    localStorage.removeItem('token');
}
window.addEventListener('beforeunload', removerTokenDoLocalStorage);
</script>

<style scoped>
.leftpanel {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-flow: column;
    background: inherit;
    padding-right: 1%;
    margin-left: 0;
}

.menu a {
    color: aliceblue;
    text-transform: uppercase;
    border-bottom: 1px solid aliceblue;
}

</style>