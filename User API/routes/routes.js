var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', AdminAuth,UserController.create); // rota de criação de usuário
router.get("/user", UserController.index); // rota que lista todos usuários
router.get("/client", UserController.listclient);
router.get("/user/:id",AdminAuth, UserController.findUser); // rota para busca por id
router.put("/user", AdminAuth, UserController.edit); // rota para editar usuário
router.delete("/user/:id",/*AdminAuth,*/  UserController.remove); //rota para remover usuário
router.post("/recoverpassword",UserController.recoverPassword); //recuperação de senha
router.post("/changepassword", UserController.changePassword); //mudar senha
router.post("/login", UserController.loginUser); //faz login
router.post("/validate", AdminAuth,HomeController.validate)
module.exports = router;

/**/