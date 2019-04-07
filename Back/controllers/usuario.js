const customerService = require('../services/usuario');
const Token = require ('../auth/Token');

const findAll = (req, res) => {
  userId = req.userId;
  customerService.findAll(userId)
    .then( result => { 
      console.log(result);
      res.render('estadisticas',{
        token: Token.buildToken(userId),
        result : result,
      })
    } )
    .catch( err => { res.send({"error": true, "detail":err }) });
}


module.exports = {
  findAll,
}