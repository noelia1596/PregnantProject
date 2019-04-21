const model = require('../models/usuarios');
const crypt = require('../util/crypt-util');
const Token = require('../auth/Token');
const Usuario = require('../models/usuarios').clase;


function apiLogin(req, res) {
    try {
        const un = req.body.username;
        model.findByUsername(un)
            .then(result => {
                console.log("result: " + result);
                if (result.length !== 1) {
                    res.redirect('/');
                } else {
                    const customer = result[0];
                    const pwd = req.body.password;
                    //aqui el customer.password, la recoge de la base de datos, para poder compararlas
                    const dbPwd = customer.password;
                    const cryptPasswd = crypt.encrypt(pwd);
                    console.log("dbPwd:" + dbPwd);
                    console.log("crPwd :" + cryptPasswd);
                    if (cryptPasswd !== dbPwd) {
                        res.send(400);
                    } else {
                        console.log(customer);
                        model.instancia = new Usuario(customer.usuario, customer.password, customer.Nombre, customer.Apellidos, customer.FechaNacimientoMama, customer.FechaEmbarazo, customer.NombrePadre, customer.FechaNacimientoPadre, customer.ApellidosPadre)
                        console.log("inicio de sesion con el usuario...", model.instancia);
                        res.send(
                            {
                                customer: customer,
                                token: Token.buildToken(customer.usuario)
                            }
                        );
                    }
                }
            })
            .catch(err => {
                console.log('error', { message: { color: 'red', text: 'something failed' }, error: err });
                res.send(400);
            })
    } catch (error) {
        console.error('ERROR apiLogin', error);
    }

}
module.exports = {
    apiLogin
}