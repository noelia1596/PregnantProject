//import { error } from 'util';

const model = require('../models/usuarios');
const crypt = require('../util/crypt-util');
const Token = require ('../auth/Token');
const Usuario = require('../models/usuarios').clase;
//const salt = require("../../config/salt")
const NewUsuario = require('../services/usuario');


function doLogin(req, res) {
    const un = req.body.username;
    model.findByUsername(un)
    .then(result => {
        console.log("result: " + result);
        if(result.length !==1){
            res.redirect('/');
        }else{
            const customer = result[0];
            const pwd = req.body.password;
            //aqui el customer.password, la recoge de la base de datos, para poder compararlas
            const dbPwd = customer.password;
            const cryptPasswd = crypt.encrypt(pwd);
            console.log("dbPwd:" + dbPwd);
            console.log("crPwd :" + cryptPasswd);
            if(cryptPasswd !== dbPwd){
                res.redirect('/');
            }else{
                console.log(customer);
                model.instancia = new Usuario(customer.usuario, customer.password,customer.Nombre,customer.Apellidos, customer.FechaNacimientoMama, customer.FechaEmbarazo, customer.NombrePadre, customer.FechaNacimientoPadre, customer.ApellidosPadre)
                console.log("inicio de sesion con el usuario...",model.instancia);
                NewUsuario.create({
                    name: customer.usuario,
                    password : dbPwd,
                })
                res.render('principal',{
                    'message':{text : 'Login success', type :'success'},
                    'username' : un,
                    //fullname : customer.Nombre,
                    //ponemos que se vaya al token y haga ese funcion que esta declarada, y le pasamos la key(customer.id, porque es unica, por eso)
                    token: Token.buildToken(customer.usuario),
                                        
                });
            }   
        }
    })
    .catch(err =>{
       console.log('error',{message:{color: 'red', text :'something failed'},error: err});
       res.redirect('/');
    })
}


function apiLogin(req, res) {
    const un = req.body.username;
    model.findByUsername(un)
    .then(result => {
        console.log("result: " + result);
        if(result.length !==1){
            res.redirect('/');
        }else{
            const customer = result[0];
            const pwd = req.body.password;
            //aqui el customer.password, la recoge de la base de datos, para poder compararlas
            const dbPwd = customer.password;
            const cryptPasswd = crypt.encrypt(pwd);
            console.log("dbPwd:" + dbPwd);
            console.log("crPwd :" + cryptPasswd);
            if(cryptPasswd !== dbPwd){
                res.send(400);
            }else{
                console.log(customer);
                model.instancia = new Usuario(customer.usuario, customer.password,customer.Nombre,customer.Apellidos, customer.FechaNacimientoMama, customer.FechaEmbarazo, customer.NombrePadre, customer.FechaNacimientoPadre, customer.ApellidosPadre)
                console.log("inicio de sesion con el usuario...",model.instancia);
                NewUsuario.create({
                    name: customer.usuario,
                    password : dbPwd,
                })
                res.send(
                    {
                    customer: customer,
                    token: Token.buildToken(customer.usuario)
                    }
                );
            }   
        }
    })
    .catch(err =>{
       console.log('error',{message:{color: 'red', text :'something failed'},error: err});
       res.send(400);
    })
}
module.exports = {
  doLogin,
  apiLogin
}