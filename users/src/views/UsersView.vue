<template>
<div>
    
    <div class="columns  is-centered">
        <div class="column is-half">
            
            <h1>Painel Admin</h1>
            <div class="notification is-success" v-show="isDeleted">
                <p>Usuário removido com sucesso!</p>
            </div>
            <table class="table is-fullwidth">
                    <thead class="">
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.name }}</td>
                            <td>{{user.email }}</td>
                            <td> {{ roleProsseced(user.role)}} </td>
                            
                            <td>
                                <router-link :to="{name: 'UserEdit', params:{id: user.id}}">
                                    <button class="button is-success">Editar</button> |
                                </router-link>
                                <button class="button is-danger" @click="showModalUser(user.id,user.name,user.email)">Deletar</button>
                            </td>
                        </tr>
                    
                    </tbody>
                    <tfoot>
                    
                    </tfoot>
                </table>
             </div>
        </div>
        <div :class="{modal: true, 'is-active':showModal}" >
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">

                    <p class="modal-card-title">Deseja delatar o usuário: </p>
                    <button class="delete" aria-label="close" @click="showModal =false"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="data">
                            <p>ID: {{ showModalData.id }}</p>
                            <p>Nome:  {{ showModalData.name }}</p>
                            <p>Email: {{ showModalData.email }}</p>

                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-danger" @click="deleteUser()">Deletar!  </button>
                        <button class="button" @click="showModal=false" >Cancel</button>
                    </footer>
                </div>
            </div>

</div>


</template>

<script>

import axios from 'axios';

export default {
    created(){
        var req = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        
        axios.get("http://localhost:8686/user", req).then(res =>{
            console.log(res.data)
            this.users = res.data;


        }).catch(err =>{
            console.log(err);
        })

    },
    data(){
        return{
            users: [], 
            showModal: false,
            showModalData: [],
            deleteUserId: -1,
            isDeleted: false,

        }
    },
    methods: {
        roleProsseced(role) {
            if (role === 0) {
                return "User";
            } else {
                return "Admin";
            }
        },
        showModalUser(id,name,email){
            
            this.deleteUserId = id;
            this.showModal = true;
            this.showModalData ={id,name,email};
            this.isDeleted = true
        },
        deleteUser(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.delete("http://localhost:8686/user/"+ this.deleteUserId, req).then(res =>{
                console.log(res);
                this.showModal = false;
                axios.get("http://localhost:8686/user", req).then(res =>{
                console.log(res.data)
                this.users = res.data;

                setTimeout( ()=> {
                    this.isDeleted = false;
                },1000);

        }).catch(err =>{
            console.log(err);
        })


            }).catch(err =>{
                console.log(err);
                this.showModal = false;
            });
            

        },
        
        



    }

}

</script>

<style scoped>
.modal-card-body{
    text-align: center;
    
}
.data{
    width: 50%;
    justify-content: center;
    display: flex;
    flex-flow: column;
    
    margin: 0 auto;
}
.data p{
    text-align: left;
}
</style>