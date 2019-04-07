const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//el .salt, lo pone porque cuando nos vamos al archivo salt, tenemos que decirle que coja la const que se llama salt
const SECRET = require('../config/salt').salt; // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.header('x-access-token');
  if (!token)
    return res.status(403).send({ auth: false, message: 'Bad credentials' });

  // verifies secret and checks exp
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}


function verifyParam(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.params.token;
    if (!token) {
      token = req.body.token; //coger el token desde el body, lo uso para el post que he hecho en insertaAntojo
    }
    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }
//con el secret que ponemos, lo cojo del salt
function buildToken (key) {
  // create a token
  var token = jwt.sign({ id: key }, SECRET, {
    //expiresIn: 86400 // expires in 24 hours
    expiresIn: 3600 // expires in 1 
    
  });
  return token;
  
}


module.exports = {
  verifyToken,
  buildToken,
  verifyParam,
};