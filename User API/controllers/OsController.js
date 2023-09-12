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
    
}

module.exports = new OsController();