const Asistencia = require("../models/asistencia");
const { validarAsistencia } = require("../validators/asistencia");

// METODO REGISTRAR ASISTENCIA
const registrar = (req, res) => {
    let parametros = req.body;
    console.log(parametros);

    try {
        validarAsistencia(parametros);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            mensaje: "Datos incompletos",
        });
    }

    const asistencia = new Asistencia(parametros);

    asistencia.save().then((asistenciaStored) => {
        if (!asistenciaStored) return res.status(500).send({
            status: "error",
            msg: "Error al registrar asistencia"
        });
        return res.status(200).send({
            status: "success",
            msg: "Asistencia registrada correctamente",
            asistencia: asistenciaStored
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            msg: "Error al registrar asistencia",
            error
        });
    });
};

// METODO TRAER TODAS LAS ASISTENCIAS
const getAll = async (req, res) => {
    try {
        const asistencias = await Asistencia.find({});
        return res.status(200).send({
            status: "success",
            asistencias
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            mensaje: "Error al traer las asistencias",
            error
        });
    }
};

// METODO TRAER UNA SOLA ASISTENCIA POR ID
const getOne = async (req, res) => {
    let id = req.params.id;
    try {
        let asistencia = await Asistencia.findById(id);
        if (!asistencia) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado la asistencia",
            });
        }
        return res.status(200).send({
            status: "success",
            asistencia,
        });
    } catch (error) {
        return res.status(404).send({
            status: "error",
            mensaje: "Error al buscar la asistencia",
            error
        });
    }
};

// METODO BORRAR UNA ASISTENCIA
const borrar = async (req, res) => {
    let idAsistencia = req.params.id;
    try {
        let asistencia = await Asistencia.findByIdAndDelete(idAsistencia);
        if (!asistencia) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado la asistencia",
            });
        }
        return res.status(200).send({
            status: "success",
            asistenciaEliminada: asistencia,
            mensaje: `Se ha eliminado la asistencia exitosamente`
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            mensaje: "Error al borrar la asistencia",
            error
        });
    }
};

// METODO ACTUALIZAR ASISTENCIA
const actualizar = async (req, res) => {
    let idAsistencia = req.params.id;
    let parametros = req.body;

    try {
        validarAsistencia(parametros);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            mensaje: "Datos incompletos",
        });
    }

    try {
        let asistencia = await Asistencia.findOneAndUpdate({ _id: idAsistencia }, parametros, { new: true });
        if (!asistencia) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado la asistencia",
            });
        }
        return res.status(200).send({
            status: "success",
            mensaje: "Se ha actualizado la asistencia exitosamente",
            asistencia
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            mensaje: "Error al actualizar la asistencia",
            error
        });
    }
};

module.exports = {
    registrar,
    getAll,
    getOne,
    borrar,
    actualizar
};
