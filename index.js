const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
//Cors permite que un cliente se conecte a un servidor para el intercambio de recursos
const cors = require("cors");
const morgan = require("morgan");

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
});

//Crear el servidor

const app = express();
app.use(morgan("dev"));

//Carpeta Publica
app.use(express.static("uploads"));

//Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Definir un dominio(s) para recibir las peticiones
const whitelist = [
  process.env.FRONTEND_URL,
  "http://localhost:5000",
  "http://cloudmich.fun",
];
//Opciones de CORS
const corsOptions = {
  origin: (origin, callback) => {
    //console.log(origin);
    //Revisar si la petición viene de un servidor que está en la whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("NO permitido por CORS"));
    }
  },
};

//Hablilitar CORS
app.use(cors());
//app.use(cors(corsOptions));

//Rutas de la App
app.use("/", routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

//Puerto
//app.listen(5000);
app.listen(port, host, () => {
  console.log("El sevidor esta funcionando");
});
