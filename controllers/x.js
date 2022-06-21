//Requerimos el paquete
var nodemailer = require("nodemailer");

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "malekih229@exoacre.com",
    pass: "",
  },
});
