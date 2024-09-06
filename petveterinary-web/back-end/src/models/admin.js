const mongoose = require('mongoose');
const Rol = require('./rol');

const adminSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        required: false
    },
    code: {
        type: Number,
        default: null,
        required: false
    }
});

adminSchema.pre('save', async function (next) {
    if (!this.rol) {
        const rolCliente = await Rol.findOne({ cveRol: 1 });
        if (rolCliente) {
            this.rol = rolCliente._id;
        }
    }
    next();
});

module.exports = mongoose.model('Admin', adminSchema);