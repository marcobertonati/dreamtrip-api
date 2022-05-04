// RUTAS DE VIAJES
// Son las rutas DEL SERVIDOR. Definimos lo que vamos a solicitarle al servidor a través de rutas. Si vaa consultar una base de datos, que nos va a traer, etc.

// Requerimos Express
const express = require("express");
// Definimos el Routeador
const travelRouter = express.Router();

// Requerimos Controllers
const travelController = require("../controllers/dreamTripControllers");

// Autenticar
// const isAuthenticated = function (req,res,next) {
//     if (req.isAuthenticated()) return next();
//     return res.send({mesagge:'no tienes acceso'});
//     //Si no está autenticado va a la sección logín

// }

/* ROUTES: travel */
// Get all travels
travelRouter.get("/", travelController.getAllTravel);

travelRouter.get("/travel/:id_travel", travelController.getTravel);

// RUTA POSTEAR VIAJE
travelRouter.post("/create", travelController.createTravel);

// RUTA ELIMINAR VIAJE
travelRouter.delete("/delete/:id_travel", travelController.deleteTravel);

// UPDATE ROUTE
travelRouter.put("/update/:id_travel", travelController.updateTravel);

// REGISTRO USUARIO
travelRouter.post("/registro", travelController.registerUser);

// Exportamos las rutas
module.exports = travelRouter;
