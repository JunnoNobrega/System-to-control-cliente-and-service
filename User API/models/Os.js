var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
const e = require("express");

class OService {

    // Create OS
    async createOs(equipamento, defeito, servico, tecnico, valor, idcli_os, tipo, situacao){
        try {
            await knex.insert({equipamento, defeito, servico, tecnico, valor, idcli_os, tipo, situacao}).table("tbos");
        } catch (error) {
            console.log(error)
        }
    }
    // busca por id
    async findById(os){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli_os","tipo","situacao"]).where({os:os}).table("tbos");
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
    // Find OS
    async findAll(){
        try {
            var result = await knex.select(["os","data_os", "equipamento", "defeito", "servico", "tecnico", "idcli_os","valor", "tipo","situacao"])
            .from("tbos")
            .innerJoin("tbclientes", "tbos.idcli_os", "tbclientes.idcli")
            .table("tbos");
            

  return result;
        } catch (error) {
            console.log(error);  
            return [];  
        }
    }
    // Edit OS
    async edit(os, equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao){
        
        var os = await this.findById(os);

        var editOs = {};

      

        editOs.equipamento = equipamento;
        editOs.defeito = defeito;
        editOs.servico = servico;
        editOs.tecnico = tecnico;
        editOs.valor = valor;
        editOs.idcli = idcli;
        editOs.tipo = tipo;
        editOs.situacao = situacao;
   
        
     
        try {
            await knex.update(editOs).where({os:os}).table("tbos");
            console.log("tudo certo")
            return {status: true}
        } catch (error) {
            console.log(error)
            return {status: false, error: "Não foi possível atualizar os dados"}
        }
    }
    // Remove OS
    async delete(os){
        var os = await this.findById(os);
        
        if (os != undefined) {
            
                try {
                    await knex.delete().where({os:os}).table("tbos");
                    return {status: true}
                } catch (err) {
                        return {status: false, err: err}
                }
        } else {
            return {status: false, err:"O usuário não existe!"}
        }
    
    }

}

module.exports = new OService();