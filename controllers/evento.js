const Evento = require("../models/evento");
const { validarEvento } = require("../validators/evento");

// METODO REGISTRAR EVENTO
const registrar = (req, res) => {
    let parametros = req.body;
    console.log(parametros);

    try {
        validarEvento(parametros);

    } catch  {
        // console.log(error)
        return res.status(400).send({
            status: "error",
            mensaje: "Datos incompletos",
        });
    }

    const evento = new Evento(parametros);

    evento.save().then((eventStored) => {
        if (!eventStored) return res.status(500).send({
            status: "error",
            msg: "Error al registrar evento"
        });
        return res.status(200).send({
            status: "success",
            msg: "Evento registrado correctamente",
            evento: eventStored
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            msg: "Error al registrar evento",
            error
        });
    });
}

// METODO TRAER TODOS LOS EVENTOS
const getAll = async (req, res) => {
    try {
        const eventos = await Evento.find({});
        return res.status(200).send({
            status: "success",
            eventos
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            mensaje: "Error al traer los eventos",
            error
        });
    }
}

// METODO TRAER UN EVENTO POR ID
const getOne = async (req, res) => {
    let id = req.params.id;
    try {
        let evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado el evento",
            });
        }
        return res.status(200).send({
            status: "success",
            evento,
        });
    } catch (error) {
        return res.status(404).send({
            status: "error",
            mensaje: "Error al buscar el evento",
            error
        });
    }
}

// METODO BORRAR UN EVENTO
const borrar = async (req, res) => {
    let idEvento = req.params.id;
    try {
        let evento = await Evento.findByIdAndDelete(idEvento);
        if (!evento) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado el evento",
            });
        }
        return res.status(200).send({
            status: "success",
            eventoEliminado: evento,
            mensaje: `Se ha eliminado el evento ${evento.nombre} exitosamente`
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            mensaje: "Error al borrar el evento",
            error
        });
    }
}

// METODO ACTUALIZAR EVENTO
const actualizar = async (req, res) => {
    let idEvento = req.params.id;
    let parametros = req.body;

    try {
        validarEvento(parametros);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            mensaje: "Datos incompletos",
        });
    }

    try {
        let evento = await Evento.findOneAndUpdate({ _id: idEvento }, parametros, { new: true });
        if (!evento) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se ha encontrado el evento",
            });
        }
        return res.status(200).send({
            status: "success",
            mensaje: "Se ha actualizado el evento exitosamente",
            evento
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            mensaje: "Error al actualizar el evento",
            error
        });
    }
}

module.exports = {
    registrar,
    getAll,
    getOne,
    borrar,
    actualizar
}
