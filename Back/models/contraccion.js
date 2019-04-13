const db = require('../util/database');

module.exports = class Contraccion{
    constructor(usuario, inicio, final){
        this.usuario = usuario;
        this.inicio = inicio;
        this.final = final;
    }

    static subirContraccion(usuario, inicio, final) {
        
        return db.execute(
            'INSERT INTO pregnant.contracciones (usuario, inicio, final)VALUE(?, ? , ?)',
            [usuario, inicio, final]
        );
    }

    static ImprimirContracciones(usuario) {
        return db.execute('SELECT * FROM pregnant.contracciones WHERE usuario = ?', [usuario]);
      }
}