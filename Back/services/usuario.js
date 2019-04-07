const usuarioModel = require('../models/estadisticas').model;
const NombreRegistrado = require('../controllers/usuarioController');

const findAll = (userId) => {
  return new Promise( (resolve, reject) => {
      const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
   usuarioModel.countDocuments({'name': userId}).exec(callback);
   
  });
 //([ {$match: {"_id":409}}, {$unwind: "$Rentals"}, {$group: {"_id":"$_id", "total": {$sum: 1}}} ]);
}
const create = usuario => { 
  return new Promise( (resolve, reject) => {
    const newUsuario = new usuarioModel(usuario);
    newUsuario.save( err => {
      if (err) reject(err);
      resolve(newUsuario);
    });
  });
}

module.exports = {
  findAll,
  create,
  
}
