
var jwt = require("jsonwebtoken");
var secret = "asçlkdfjçaslkdaçsldkfjasçldkjaçlfs";


module.exports = function( req, res, next){

    const authToken = req.headers['authorization']

    


    if(authToken != undefined){
        const bearer = authToken.split(' ');
         var token = bearer[1];      
        
        try {
            var decoded = jwt.verify(token,secret); 
            
            if (decoded.role == 1 || decoded.role == 0) {
                
                next();
                
            } else {
                res.status(403);
                res.send("Voce não tem permissão para isso!");
                return;
            }

            
        } catch (err) {
            res.status(403);
            res.send("Voce não está autenticado !");
            return;
        }


    }else {
  
        res.status(403);
        res.send("Voce não está autenticado aqui  !");
        return;
    }

}