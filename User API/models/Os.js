var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
const e = require("express");

class OService {

    // Create OS
    async createOs(equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao){
        try {
            await knex.insert({equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao}).table("tbos");
        } catch (error) {
            console.log(error)
        }
    }
    // busca por id
    async findById(os){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli","tipo","situacao"]).where({os:os}).table("tbos");
            if(result.length > 0){
                return result[0].os;
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
            var result = await knex.select(["os","data_os", "equipamento", "defeito", "servico", "tecnico", "valor", "idcli", "tipo","situacao"]).table("tbos");
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
    async remove(){
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = new OService();