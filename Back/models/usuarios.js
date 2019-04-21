const db = require('../util/database');
const crypt = require('../util/crypt-util');
const Token = require('../auth/Token');
//const usuarioController = require ('../controllers/usuarioController')

var instancia;
const clase = class Usuario {
    constructor(usuario, password, nombre, apellidos, fechaNacimientoMama, fechaEmbarazo, nombrePadre, fechaNacimientoPadre, apellidosPadre) {
        console.log(password);
        this.usuario = usuario;
        this.password = crypt.encrypt(password);
        this.Nombre = nombre;
        this.Apellidos = apellidos;
        this.FechaNacimientoMama = fechaNacimientoMama;
        this.FechaEmbarazo = fechaEmbarazo;
        this.NombrePadre = nombrePadre;
        this.FechaNacimientoPadre = fechaNacimientoPadre;
        this.ApellidosPadre = apellidosPadre;
    }

    crearUsuario() {
        console.log(this.usuario, this.password, this.Nombre, this.Apellidos, this.FechaNacimientoMama, this.FechaEmbarazo, this.NombrePadre, this.FechaNacimientoPadre, this.ApellidosPadre);
        console.log("crearUusario");
        return db.execute(
            'INSERT INTO pregnant.usuarios (usuario,password,Nombre,Apellidos,FechaNacimientoMama,FechaEmbarazo,NombrePadre,FechaNacimientoPadre,ApellidosPadre)VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.usuario, this.password, this.Nombre, this.Apellidos, this.FechaNacimientoMama, this.FechaEmbarazo, this.NombrePadre, this.FechaNacimientoPadre, this.ApellidosPadre]
        );
    }
}

const TABLE = "pregnant.usuarios"
const SQL_FIND_BY_USERNAME = (un) => "select * from " + TABLE + " WHERE usuario = '" + un + "'";
const findByUsername = un => {
    const theQuery = SQL_FIND_BY_USERNAME(un);
    return new Promise((resolve, reject) => {
        db.query(theQuery, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

module.exports = { clase, findByUsername, instancia };