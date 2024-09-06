const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validarToken = asyncHandler(async (req,res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Usuario no autorizado!");
            }
            req.usuario = decoded.usuario;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("Usuario no autorizado o el token no ha sido proporcionado");
        }
    }
});

module.exports = validarToken;