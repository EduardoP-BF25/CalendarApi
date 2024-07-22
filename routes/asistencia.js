const express = require("express");
const router = express.Router();

const AsistenciaController = require("../controllers/asistencia");
const check = require("../middlewares/auth");

// -----------METODOS CRUD----------------
// METODO POST (REGISTRAR ASISTENCIA)
router.post("/asistencia/registrar", check.auth, AsistenciaController.registrar);

// METODO GET (TRAER TODAS LAS ASISTENCIAS)
router.get("/asistencias/traer", check.auth, AsistenciaController.getAll);

// METODO GET (TRAER UNA SOLA ASISTENCIA POR ID)
router.get("/asistencia/:id", check.auth, AsistenciaController.getOne);

// METODO PUT (ACTUALIZAR ASISTENCIA)
router.put("/asistencia/actualizar/:id", check.auth, AsistenciaController.actualizar);

// METODO DELETE (ELIMINAR ASISTENCIA)
router.delete("/asistencia/borrar/:id", check.auth, AsistenciaController.borrar);

module.exports = router;
