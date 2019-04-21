const express = require('express');

const router = express.Router();

const indexController = require('../controllers/index');

const usuarioController = require('../controllers/usuarioController');

const multer = require('multer');
const cors = require('cors');

router.use(express.static('public'))
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage })
router.use(cors());


router.post('/api-login', usuarioController.apiLogin);

router.post('/apiRegistrarse', indexController.postApiCrearUsuario);

router.post('/apiInsertarAntojo/', indexController.postapiInsertarAntojo);

router.get('/api-verAntojos/', indexController.getApiVerAntojos);

router.post('/apiBorrarAntojo/', indexController.postapiBorrarAntojo);

router.post('/uploadPictures', upload.single('image'), indexController.postApiSubirImagenes);

router.get('/imprimirImagenes', indexController.getApiImprimirImagenes);

router.post('/apiGuardarTiempos/', indexController.postapiGuardarTiempos);

router.get('/api-verContracciones', indexController.ImprimirContracciones);

module.exports = router;