const Usuario = require('../models/usuarios').clase;
const Antojo = require('../models/antojos');
const Token = require('../auth/Token');
const Imagenes = require('../models/imagenes');
const Contraccion = require('../models/contraccion');

exports.postApiCrearUsuario = (req, res, next) => {
  try {
    const username = req.body.usuario;
    const password = req.body.password;
    const Nombre = req.body.Nombre;
    const Apellidos = req.body.Apellidos;
    const FechaNacimientoMama = req.body.FechaNacimientoMama;
    const FechaEmbarazo = req.body.FechaEmbarazo;
    const NombrePadre = req.body.NombrePadre;
    const FechaNacimientoPadre = req.body.FechaNacimientoPadre;
    const ApellidosPadre = req.body.ApellidosPadre;

    const usuario = new Usuario(username, password, Nombre, Apellidos, FechaNacimientoMama, FechaEmbarazo, NombrePadre, FechaNacimientoPadre, ApellidosPadre);
    //Instancia = usuario;
    usuario
      .crearUsuario()
      .then(() => {
        res.send(
          usuario
        );
      })
      .catch(err => console.log(err));
  }
  catch (error) {
    console.error('ERROR postApiCrearUsuario', error);
  }
};


exports.postapiInsertarAntojo = (req, res, next) => {
  try {
    const usuario = req.body.usuario;
    const nombreDelAntojo = req.body.NombreAntojo;
    const tipoDeAntojo = req.body.TipoDeAntojo;
    const fechaDelAntojo = req.body.FechaAntojo;
    const vecesDadasAntojo = req.body.VecesAntojo;
    const aQuienDio = req.body.aQuienDio;
    const antojo = new Antojo(usuario, tipoDeAntojo, nombreDelAntojo, fechaDelAntojo, vecesDadasAntojo, aQuienDio);
    console.log(antojo);
    antojo
      .crearAntojo()
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  } catch (error) {
    console.error('ERROR postapiInsertarAntojo', error);
  }
};


exports.postapiBorrarAntojo = (req, res, next) => {
  try {
    const id = req.body.arraySelect;
    const objetoArraySelect = JSON.parse(id)
    console.log("postapiBorrarAntojo", objetoArraySelect);
    objetoArraySelect.map((element, i) => {
      Antojo
        .BorrarAntojo(element)
        .then(() => {
          if (objetoArraySelect.length - 1 == i) {
            res.sendStatus(200);
          }
        })
        .catch(err => console.log(err));
    })
  } catch (error) {
    console.error('ERROR postapiBorrarAntojo', error);
  }
};

exports.postApiSubirImagenes = (req, res) => {
  try {
    if (req.file) {
      const id = req.file.filename;
      const usuario = req.body.usuario;
      Imagenes.subirImagen(id, usuario)
      res.json({
        imageUrl: id
      });
    }
    else
      res.status("409").json("No Files to Upload.")
  } catch (error) {
    console.error('ERROR postApiSubirImagenes', error);
  }
}


exports.getApiImprimirImagenes = (req, res) => {
  try {
    const usuario = req.headers.usuario;
    Imagenes.ImprimirImagenes(usuario)
      .then((rows) => {
        let imagenes = rows[0];
        res.send(imagenes);
      })
      .catch(err => console.log(err));
  } catch (error) {
    console.error('ERROR getApiImprimirImagenes', error);
  }
}


exports.getApiVerAntojos = (req, res, next) => {
  try {
    if (req.body.username) {
      userId = req.body.username;//coge el usuario que se ha insertado
      Antojo.ImprimirAntojo(userId)
        .then((rows) => {
          let antojos = rows[0];
          console.log("getApiVerAntojos", antojos);
          res.send(
            antojos
          )
        })
        .catch(err => console.log(err));
    } else if (req.headers.username) {
      userId = req.headers.username;//coge el usuario que se ha insertado
      Antojo.ImprimirAntojo(userId)
        .then((rows) => {
          let antojos = rows[0];
          console.log("getApiVerAntojos", antojos);
          res.send(
            antojos
          )
        })
        .catch(err => console.log(err));
    } else {
      console.error('ERROR getApiVerAntojos no nos llega username ', req);
    }
  }
  catch (error) {
    console.error('ERROR getApiVerAntojos', error);
  }
};


exports.postapiGuardarTiempos = (req, res, next) => {
  try {
    const inicio = req.body.inicio;
    const final = req.body.final;
    const usuario = req.body.usuario;
    Contraccion
      .subirContraccion(usuario, inicio, final)
      .then((result) => {
        res.send(
          result
        );
      })
      .catch(err => console.log(err));
  } catch (error) {
    console.error('ERROR postapiGuardarTiempos', error);
  }
};


exports.ImprimirContracciones = (req, res, next) => {
  try {
    if (req.headers.username) {
      userId = req.headers.username;//coge el usuario que se ha insertado
      Contraccion.ImprimirContracciones(userId)
        .then((rows) => {
          let contracciones = rows[0];
          res.send(
            contracciones
          )
        })
        .catch(err => console.log(err));
    } else {
      console.error('ERROR getApiVerContracciones no nos llega username ', req);
    }
  }
  catch (error) {
    console.error('ERROR getApiVerContracciones', error);
  }
};

