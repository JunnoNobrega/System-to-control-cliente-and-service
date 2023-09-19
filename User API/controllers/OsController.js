var OService = require("../models/Os.js");

var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "asçlkdfjçaslkdaçsldkfjasçldkjaçlfs";




class OsController {

async listos(req, res){
    var os = await OService.findAll();
    res.json(os);

}
async createOs(req,res){

    var {equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao} = req.body;

    await OService.createOs(equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao);
    res.status(200);
    res.send("Tudo OK!");
}
async editOs(req,res){
    var {os, equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao} = req.body;
    
    var result = await OService.edit(os, equipamento, defeito, servico, tecnico, valor, idcli, tipo, situacao);
    console.log(result)
    if (result != undefined) {
        if (result.status == true ){
            res.status(200);
            res.send("Tudo OK atualizado com sucesso");
        }else{
            res.status(406);
            res.send(result.error);
        }
        
    } else {
        es.status(406);
        res.send(result.error);
    }
} 
   //Busca por id
   async findOs(req,res){
    var os = req.params.os;
 
    var os = await OService.findById(os);
    if (os == undefined) {

        res.status(404);
        res.json({});
    } else {
        res.status(200);
        res.json(os)
    }
}
//Remoção de usuário
    async remove(req,res){
        var os = req.params.os;
        var result = await OService.delete(os);

        console.log("aqui embaixo")
        console.log(result)

        if (result.status) {
            res.status(200);
            res.send("Tudo OK!");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new OsController();