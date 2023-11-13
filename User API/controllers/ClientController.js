var Client = require("../models/Client");






class ClientController {

    // lista os clientes
    async listclient(req, res ) {

        var users = await Client.findAllClient();
        res.json(users);

    }
    //Busca por id
    async findUser(req,res){
        var idcli = req.params.idcli;
        var user = await Client.findById(idcli);
        if (user == undefined) {
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user)
        }
    }
    // criação de usuário
    async create(req, res) {
        var { cpf, nomecli, endcli, foneclie,emailcli } = req.body;

        if (emailcli == undefined || emailcli == "" || emailcli == " ") {
            res.status(400);
            res.json({ err: "O email é inválido!" })
            return;
        }
        // verifica se já há email cadastrado
        var emailExistis = await Client.findEmail(emailcli);

        // Caso exista retorna o erro abaixo
        if(emailExistis){
            res.status(406);
            res.json({err: "O email já está cadastrado!"})
            return;
        }

        // caso não tenha segue passando os dados para o Model User.js
        await Client.new(cpf, nomecli, endcli, foneclie,emailcli);
        res.status(200);
        res.send("tudo ok! ");
    }
    //edição de usuário

    async edit(req,res){
        var {idcli, cpf,nomecli,endcli,foneclie,emailcli} = req.body;
      
        var result = await Client.update(idcli,cpf,nomecli,endcli,foneclie,emailcli);
        if(result != undefined){
            if(result.status ==true){
                res.status(200);
                res.send("Tudo OK! ");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }
    //Remoção de usuário
    async remove(req,res){
        var idcli = req.params.idcli;
        
        var result = await Client.delete(idcli);
        
        if (result.status) {
            
            res.status(200);
            res.send("Tudo OK!");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    
}

module.exports = new ClientController();