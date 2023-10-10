var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");



class User {

    // Buscar usuário
    async findAll(){
        try {
            var result = await knex.select(["id","email","role","name"]).table("users");
            return result;
        }catch (err) {
            console.log(err);
            return [];
        }
    }

    // busca por id
    async findById(id){
        try {
            var result = await knex.select(["id","email","role","name"]).where({id:id}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch (err) {
            console.log(err);
            return undefined;
        }
    }
    // buscar por email
    async findByEmail(email){
        try {
            var result = await knex.select(["id","email","password","role","name"]).where({email: email}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch (err) {
            console.log(err);
            return undefined;
        }
    }

    // Cadastra os dados no banco de dados utilizando o knex.js
    async new(email, password, name, role) {

        try {

            var hash = await bcrypt.hash(password, 10);

            await knex.insert({ email,password: hash,name,role }).table("users");

        } catch (error) {
            console.log(error);
        }

    }
    // faz uma consulta no banco de dados para ver se o email cadastrado já existe
    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email}); // busca no banco knex.js
            // se ja existir a busca retorna um array
            // se o array for m ais que 0 significa que já tem
            if(result.length > 0){
                return true; // email encontrado
            }else{
                return false;  // email não encontrado
            }
            console.log(result);
        }catch(err){
            console.log(err);
            return false;
        }
    }
    // edição de usuário
    async update(id,email,name,role){
        var user = await this.findById(id);
        if (user != undefined) {
            
            var editUser = {};
            // verifica se o email já existe
            if (email != undefined) {
                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if(result == false){
                        editUser.email = email; // Caso não encontro email será cadastrado
                    }
                }else {
                    return {status: false}
                    
                }
            }

            if(name != undefined){
                editUser.name = name;
            }
            if(role != undefined){
                editUser.role = role;
            }
            // atualiza os dados
            try {
                await knex.update(editUser).where({id:id}).table("users");
                return {status: true}
            }catch (err) {
                return {status: false, err: "O Email já está cadastrado"}
            }

        } else {
            return {status: false, err: "O usuário não existe! "};
        }
    }

    //Deletar usuário

    async delete(id){
         var user =  await this.findById(id);
       
        if(user != undefined ){
            try {
                await knex.delete().where({id: id}).table("users");
                return {status: true}
            } catch (err) {
                return {status: false, err: err}
                
            }
        }else{
            return {status: false, err: "O susuário não existe!"}
        }
    }
    // Mudar senha
    async changePassword(newPassword, id, token){
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({password: hash}).where({id:id}).table("users");
        await PasswordToken.setUsed(token);

    }
}

module.exports = new User();




