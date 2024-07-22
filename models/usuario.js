const {Schema, model} = require("mongoose");

// import mongoose  from "mongoose";

const UsuarioSchema = Schema({
   nombres: {
      type: String,
      required: true
   },
   apellidos:{
      type: String,
      required: true
   },
   role:{
      type: String,
      default: "usuario"
   },
   correo:{
      type: String,
      required: true,
      unique: true

   },
   password:{
      type: String,
      required: true
   },
   edad:{
      type: Date,
      required: false
   },
   direccion: {
      type: String,
      required: false
   },   
   telefono: {
      type: Number,
      required: false
   },
   imagen: {
      type: String,
      default: "defaultUsuario.png"
   },
   fechaDeRegistro:{
      type: Date,
      default: Date.now
   },
   status: {
      type: Boolean,
      default: true
   }
});


// export default Hospital;
module.exports = model("Usuario", UsuarioSchema, "usuarios")
