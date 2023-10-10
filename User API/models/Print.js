var knex = require("../database/connection");



class Print {

    async reportUsers(){
        try {
            var result = await knex.select(["id","email","role","name"]).table('users');
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    async reportClients(){
        try {
            var result = await knex.select(["idcli","nomecli","endcli","foneclie","emailcli"]).table("tbclientes");
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    async reportOs(os){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli","tipo","situacao"]).where({os:os}).table("tbos");
        
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    async reportAllOs(){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli","tipo","situacao"]).table("tbos");
        
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
}

  module.exports = new Print();