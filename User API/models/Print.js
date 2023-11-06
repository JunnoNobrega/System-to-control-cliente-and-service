var knex = require("../database/connection");



class Print {
    // GET FROM DATABASE DATA FOR CRETE REPORT USERS
    async reportUsers(){
        try {
            var result = await knex.select(["id","email","role","name"]).table('users');
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    // GET FROM DATABASE DATA FOR CRETE REPORT cLIENTS
    async reportClients(){
        try {
            var result = await knex.select(["idcli","nomecli","endcli","foneclie","emailcli"]).table("tbclientes");
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    // GET FROM DATABASE DATA FOR CRETE REPORT OS
    async reportOs(os){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli_os","tipo","situacao"]).where({os:os}).table("tbos");
        
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
    // GET FROM DATABASE DATA FOR CRETE REPORT FROM ALL OS
    async reportAllOs(){
        try {
            var result = await knex.select(["os","data_os","equipamento","defeito","servico","tecnico","valor","idcli_os","tipo","situacao"]).table("tbos");
        
            return result;
        } catch (error) {
            console.log(error);
            return {error, err: "Não foi possível gerar relatório!"};
        }
    }
}

  module.exports = new Print();