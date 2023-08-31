var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class Client {

    // Buscar usuário

    async findAllClient(){
        try {
            var result = await knex.select(["idcli","nomecli","endcli","foneclie","emailcli"]).table("tbclientes");
            return result;
        }catch (err) {
            console.log(err);
            return [];
        }
    }
    // busca por id
    async findById(idcli){
        try {
            var result = await knex.select(["idcli","nomecli","endcli","foneclie","emailcli"]).where({idcli: idcli}).table("tbclientes");
            
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
    // buscar por nome
    async findByEmail(emailcli){
        try {
            var result = await knex.select(["idcli","nomecli","endcli","foneclie","emailcli"]).where({emailcli: emailcli}).table("tbclientes");
            
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
    async new(nomecli,endcli,foneclie,emailcli) {

        try {

            await knex.insert({ nomecli,endcli,foneclie,emailcli}).table("tbclientes");

        } catch (error) {
            console.log(error);
        }

    }
    // faz uma consulta no banco de dados para ver se o email cadastrado já existe
    async findEmail(emailcli){
        try{
            var result = await knex.select("*").from("tbclientes").where({emailcli: emailcli}); // busca no banco knex.js
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
    async update(idcli,nomecli, endcli,foneclie,emailcli){
        var user = await this.findById(idcli);
        if (user != undefined) {
            
            var editUser = {};
            // verifica se o email já existe
            if (emailcli != undefined) {
                if (emailcli != user.emailcli) {
                    var result = await this.findEmail(emailcli);
                    if(result == false){
                        editUser.emailcli = emailcli; // Caso não encontro email será cadastrado
                    }
                }else {
                    return {status: false}
                    
                }
            }

            if(nomecli != undefined){
                editUser.namecli = nomecli;
            }
    
            // atualiza os dados
            try {
                await knex.update(editUser).where({idcli:idcli}).table("tbclientes");
                return {status: true}
            }catch (err) {
                return {status: false, err: "O Email já está cadastrado"}
            }

        } else {
            return {status: false, err: "O usuário não existe! "};
        }
    }

    //Deletar usuário

    async delete(idcli){
         var user =  await this.findById(idcli);
       
        if(user != undefined ){
            try {
                await knex.delete().where({idcli: idcli}).table("tbclientes");
                return {status: true}
            } catch (err) {
                return {status: false, err: err}
                
            }
        }else{
            return {status: false, err: "O susuário não existe!"}
        }
    }
}

module.exports = new Client();