const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UsuarioPrueba = require("../models/UsuarioPrueba");
const nodemailer = require("nodemailer");

exports.validarCorreo = async (req, res, next) => {
  const { email } = req.body;
  const correo = await UsuarioPrueba.findOne({ email: email });
  console.log(req.body);
  if (!correo) {
    await res.status(401).json({ mensaje: "El correo no existe" });
    next();
  } else {
    await res.status(200).json({ mensaje: "El correo si existe" });

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "cxfcbjnw2cgxk2gp@ethereal.email",
        pass: "chFj91DUTd5MQ49g6t",
      },
    });

    let message = await transporter.sendMail({
      from: "greyson.moore11@ethereal.email",
      to: "whtvr@gmail.com",
      subject: "Reset Password",
      text: "Tu contraseña se cambiará",
      html: "<b>Esto es un HTML idk</b>",
    });

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
};

exports.actualizarPasswordd = async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const asd = await UsuarioPrueba.findByIdAndUpdate(
      { _id: id },
      { password: password },
      { new: true }
    );
    await res.status(200).json({ mensaje: "se cambio" });
  } catch (error) {
    await res.status(401).json({ mensaje: "no cambio" });
    next();
  }
};
