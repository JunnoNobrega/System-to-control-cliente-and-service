var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
var ClientController = require('../controllers/ClientController');
var OsController = require("../controllers/OsController");
var PrintController = require("../controllers/PrintController");
var AdminAuth = require("../middleware/AdminAuth");


const fs = require('fs');

var PdfMaker = require("pdfmake");

const PdfPrinter = require("pdfmake");

//Routes Users
router.get('/',  HomeController.index);
router.post('/user',/*AdminAuth,*/ UserController.create); // rota de criação de usuário
router.get("/user",   UserController.index); // rota que lista todos usuários
router.get("/user/:id",/*AdminAuth,*/ UserController.findUser); // rota para busca por id
router.put("/user", /*AdminAuth,*/ UserController.edit); // rota para editar usuário
router.delete("/user/:id",/*AdminAuth,*/  UserController.remove); //rota para remover usuário
router.post("/recoverpassword",/*AdminAuth,*/ UserController.recoverPassword); //recuperação de senha
router.post("/changepassword",/*AdminAuth,*/ UserController.changePassword); //mudar senha
router.post("/login",  UserController.loginUser); //faz login
router.post("/validate", AdminAuth,HomeController.validate)

//Routes tb clientes
router.get("/client",  ClientController.listclient , AdminAuth); // listar
router.get("/client/:idcli", /*AdminAuth,*/ ClientController.findUser); //buscar
router.put("/client", /*AdminAuth,*/ ClientController.edit); // rota para editar usuário
router.delete("/client/:idcli", /*AdminAuth,*/ ClientController.remove); //rota para remover usuário
router.post('/client', /*AdminAuth,*/ ClientController.create , AdminAuth); // rota de criação de usuário


// Routes tb os
router.get("/os", /*AdminAuth,*/ OsController.listos); // listar
router.post('/os', /*AdminAuth,*/ OsController.createOs); // rota de criação de usuário
router.put("/os",  /*AdminAuth,*/ OsController.editOs);
router.get("/os/:os", /*AdminAuth,*/ OsController.findOs); // rota para busca por id
router.delete("/os/:os",/*AdminAuth,*/ OsController.remove); //rota para remover OS
/**/

// Route print
router.get("/print/user", PrintController.printUsers); 
router.get("/print/client", PrintController.printClients); 
router.get("/print/os/:os", PrintController.printOs);  
router.get("/print/allos/", PrintController.printAllOs);  
module.exports = router;