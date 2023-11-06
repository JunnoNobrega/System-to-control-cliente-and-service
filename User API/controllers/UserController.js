var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "asçlkdfjçaslkdaçsldkfjasçldkjaçlfs";




class UserController {
    // Lista os usuários
    async index(req, res) {

        var user = await User.findAll()
        res.json(user);
        
     
    }
    // lista os clientes

    //Busca por id
    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
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
        var { email, name, password, role } = req.body;


        if (email == undefined || email == "" || email == " ") {
            res.status(400);
            res.json({ err: "O email é inválido!" })
            return;
        }
        // verifica se já há email cadastrado
        var emailExistis = await User.findEmail(email);

        // Caso exista retorna o erro abaixo
        if(emailExistis){
            res.status(406);
            res.json({err: "O email já está cadastrado!"})
            return;
        }

        // caso não tenha segue passando os dados para o Model User.js
        await User.new(email, password, name, role);
        res.status(200);
        res.send("tudo ok! ");
    }
    //edição de usuário

    async edit(req,res){
        var {id,name,role,email} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
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
        var id = req.params.id;
        
        var result = await User.delete(id);
        
        if (result.status) {
            
            res.status(200);
            res.send("Tudo OK!");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }
    //recupereação de senha
    async recoverPassword(req,res){
        var email =req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
            res.status(200);
            console.log(result.token)
            // aqui deve ser colocado a função de enviar email para usuário
            res.send(""+result.token);
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
    // mudar passwored
    async changePassword(req,res){
        
        var token = req.body.token;
        var password = req.body.password;
        
        var isTokenValid = await PasswordToken.validate(token);
        
        if (isTokenValid.status) {
            
            await User.changePassword(password,isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada com sucesso!")

        } else {
            res.status(406)
            res.send("Token inválido! ");
        }
    }
    // Login de usuário
    async loginUser(req,res){
        var {email,password} = req.body;
        
        var user = await User.findByEmail(email);
        
        if (user != undefined) {
            var resultado = await bcrypt.compare(password,user.password);
            
            if (resultado) {
                
                var token = jwt.sign({email: user.email, role: user.role,}, secret);
                var name = user.name
                var roleuser = user.role
                res.status(200);
                res.json({token: token, name: name, roleuser : roleuser});

            } else {
                res.status(406);
                res.json({status: false, err:"Senha incorreta!" });
            }
        } else {
            res.status(406)
            res.json({status: false, err:"Login inválido!" })
        }
    }

    
}

module.exports = new UserController();