const db = require('../util/database');

module.exports = class Imagen{
    constructor(usuario, nombreId){
        this.usuario = usuario;
        this.nombreId = nombreId;
    }

    static subirImagen(id,usuario) {
        
        return db.execute(
            'INSERT INTO pregnant.images (id,usuario)VALUE(?, ?)',
            [id,usuario]
        );
    }

    static ImprimirImagenes(usuario) {
        return db.execute('SELECT * FROM pregnant.images WHERE usuario = ?', [usuario]);
      }
}