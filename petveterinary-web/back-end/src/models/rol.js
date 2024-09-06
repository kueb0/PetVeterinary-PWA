const mongoose = require("mongoose");
const rolSchema = mongoose.Schema({
    cveRol:{
        type: Number,
        required: true
    },
    nomRol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Rol", rolSchema);