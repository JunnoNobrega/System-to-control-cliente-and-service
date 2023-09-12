var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
const e = require("express");

class OService {

    // Create OS
    async create(){
        try {
            await knex.insert({data_os, equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao}).table("tbos");
        } catch (error) {
            console.log(error)
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
    async edit(){
        try {
            
        } catch (error) {
            
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