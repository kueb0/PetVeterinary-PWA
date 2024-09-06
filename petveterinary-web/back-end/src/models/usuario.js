const mongoose = require("mongoose");
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor añade un nombre de usuario"],
    },
    email: {
        type: String,
        required: [true, "Por favor añade un correo"],
        unique: [true, "El correo ya existe"]
    },
    contrasenia: {
        type: String,
        require: [true, "Por favor añade una contraseña"]
    },
},
    {
        timestamp: true,
    }

);

module.exports = mongoose.model("Usuario", usuarioSchema);