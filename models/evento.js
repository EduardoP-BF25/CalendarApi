const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
   nombre: {
      type: String,
      required: true
   },
   fecha: {
      type: Date,
      required: true
   },
   hora: {
      type: String,
      required: true
   },
   descripcion: {
      type: String,
      required: false
   },
   invitados: {
      type: [String],
      required: false
   },
   costo: {
      type: Number,
      default: 0
   },
   lugar: {
      type: String,
      required: true
   },
   estado: {
      type: String,
      enum: ['activo', 'inactivo', 'cancelado', 'concluido'],
      default: 'activo'
   },
   anfitrion: {
      type: String,
      required: true
   },
});

module.exports = model("Evento", EventoSchema, "eventos");
