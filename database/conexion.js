const mongoose = require("mongoose");

const connection =  async () => {

   try {
      await mongoose.connect("mongodb://0.0.0.0:27017/calendar");
      console.log("Conectado a BDD a Calendar");
   } catch (error) {
      console.log( "No se ha podido conectar correctamente a la BBD Calendar");
    
   }
}

module.exports = connection