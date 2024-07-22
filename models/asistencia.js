const { Schema, model } = require("mongoose");

const AsistenciaSchema = Schema({
   usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
   },
   eventoId: {
      type: Schema.Types.ObjectId,
      ref: 'Evento',
      required: true
   },
   fechaDeRegistro: {
      type: Date,
      default: Date.now
   }
});

module.exports = model("Asistencia", AsistenciaSchema, "asistencias");
