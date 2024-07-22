const conection = require("./database/conexion");
const express = require("express");
const cors = require("cors");
const rutasUsuario = require("./routes/usuario")
const rutasEvento = require("./routes/evento")
const rutasAsistencia = require("./routes/asistencia")


console.log("INICIANDO API CALENDAR...")
// Conexion a BDD
conection();
// Crear Servidor Node
const app = express();
const port = 3900;

// Configurar Cors
app.use(cors());

// Convertir los datos del body a objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar enpoints de Rutas
app.use("/calendar", rutasUsuario);
app.use("/calendar", rutasEvento);
app.use("/calendar", rutasAsistencia);



// Enlistar el servidor para leer peticiones http
app.listen(port, () =>{
   console.log(`Servidor iniciado en puerto: ${port} para leer peticiones`)
})