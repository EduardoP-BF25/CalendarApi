const express = require("express");
const router = express.Router();
const multer = require("multer");

const EventoController = require("../controllers/evento");
const check = require("../middlewares/auth");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './images/eventos/');
   },
   filename: (req, file, cb) => {
      cb(null, "evento" + Date.now() + file.originalname);
   }
});

const uploads = multer({ storage });

// -----------METODOS CRUD----------------
// METODO POST (REGISTRAR EVENTO)
router.post("/evento/registrar", EventoController.registrar);
// METODO GET (TRAER TODOS LOS EVENTOS)
router.get("/eventos/traer", EventoController.getAll);
// METODO GET (TRAER UN SOLO EVENTO POR ID)
router.get("/evento/:id", EventoController.getOne);
// METODO PUT (ACTUALIZAR EVENTO)
router.put("/evento/actualizar/:id", check.auth, EventoController.actualizar);
// METODO DELETE (ELIMINAR EVENTO)
router.delete("/evento/borrar/:id", check.auth, EventoController.borrar);

// export default router;
module.exports = router;
