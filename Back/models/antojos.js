const db = require('../util/database');
const crypt = require('../util/crypt-util');
const usuarioController = require('../controllers/usuarioController');
const usuarioM = require('../models/usuarios');


module.exports = class Antojo{
    constructor(usuario, tipoDeAntojo, nombreDelAntojo, fechaDelAntojo, vecesDadasDelAntojo, aQuienLeDio){
        this.usuario = usuario;
        //const usuariooo = usuarioM.instancia; y arriba usuario tampoco estaba antes
        //this.usuario = usuariooo.username;
        this.tipoDeAntojo = tipoDeAntojo;
        this.nombreDelAntojo = nombreDelAntojo;
        this.fechaDelAntojo = fechaDelAntojo;
        this.vecesDadasDelAntojo = vecesDadasDelAntojo;
        this.aQuienLeDio = aQuienLeDio;
    }

    crearAntojo() {
        
        console.log(this.usuario,this.tipoDeAntojo, this.nombreDelAntojo, this.fechaDelAntojo, this.vecesDadasDelAntojo,this.aQuienLeDio);
        return db.execute(
            'INSERT INTO pregnant.antojos (usuario,tipoDeAntojo,nombreDelAntojo,fechaDelAntojo,vecesDadasDelAntojo,aQuienLeDio)VALUE(?, ?, ?, ?, ?, ?)',
            [this.usuario,this.tipoDeAntojo, this.nombreDelAntojo, this.fechaDelAntojo,this.vecesDadasDelAntojo,this.aQuienLeDio]
        );
    }
/*
    crearAntojo() {
        
        console.log(this.usuario,this.tipoDeAntojo, this.nombreDelAntojo, this.fechaDelAntojo, this.vecesDadasDelAntojo,this.aQuienLeDio);
        return db.execute(
            'INSERT INTO pregnant.antojos (usuario,tipoDeAntojo,nombreDelAntojo,fechaDelAntojo,vecesDadasDelAntojo,aQuienLeDio)VALUE("un",?, ?, ?, ?, ?)',
            [this.usuario,this.tipoDeAntojo, this.nombreDelAntojo, this.fechaDelAntojo,this.vecesDadasDelAntojo,this.aQuienLeDio]
        );
    }
*/
    static ImprimirAntojo(id) {
        return db.execute('SELECT * FROM pregnant.antojos WHERE usuario = ?', [id]);
      }

    static BorrarAntojo(id){
        return db.execute('DELETE FROM pregnant.antojos WHERE id = ?', [id]);
    }

    static dateToString(date){
        let strDate = "";
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hour = date.getHours();
        let day = date.getDay();
        let month = date.getMonth() + 1; 
        let year = date.getFullYear();
    
        strDate = hour+":"+minutes+":"+seconds+" "+day+"/"+month+"/"+year;
        return strDate;
    }
}