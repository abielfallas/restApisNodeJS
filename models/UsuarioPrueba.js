const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioPruebaSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UsuarioPrueba", usuarioPruebaSchema);
