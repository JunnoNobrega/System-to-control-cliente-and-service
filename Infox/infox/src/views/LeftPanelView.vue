<template>
  <div class="app">
    <div class="leftpanel">
        <div class="">
              <aside class="menu">
                
                <ul class="menu-list">
                  <li>
                    <router-link :to="{name: 'home'}">Cadastro de Cliente</router-link> 
                    <router-link :to="{name: 'os'}">Cadastro de OS</router-link>
                    <router-link :to="{name: 'user'}">Users</router-link>
                    <a v-if="showedMenuCad"> <router-link :to="{name: 'os'}">Os</router-link></a>
                    
  
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
    </div>
  </div>
</template>

<script>
export default {
    data (){
        return {
            showedMenuRel: false,
        }
    },
    methods: {
        showMenuRel(){
      this.showedMenuRel = !this.showedMenuRel
    },
    }

}
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