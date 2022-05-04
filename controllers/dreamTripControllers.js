// DB required
const { conexion_db } = require("../config/bdConfig");

// app.use(express.static(path.parse(__dirname).dir + '/front'));

// GET ALL
const getAllTravel = (req, res, next) => {
  console.log("REQUEST TO: getAllTravel");
  // Envio de Front end - con esto logramos enviarle al usuario todo el front.
  conexion_db.query("SELECT * FROM t_travel", (err, results) => {
    if (err) throw err;
    console.table(results);
    res.json(results);
  });
};

// GET BY ID
const getTravel = (req, res, next) => {
  console.log("REQUEST TO: getTravel");
  // Envio de Front end - con esto logramos enviarle al usuario todo el front.
  let { id_travel } = req.params;
  console.log(id_travel);
  conexion_db.query(
    "SELECT * FROM t_travel WHERE id_travel = ?",
    [id_travel],
    (err, results) => {
      if (err) throw err;
      const [travelFinded] = results;
      console.table(travelFinded);
      res.json(travelFinded);
    }
  );
};

// CREATE
const createTravel = (req, res, next) => {
  console.log(req.body);
  //Destructuring body to push into DB
  let { country, city, date, budget, comment, contact, active } = req.body;

  conexion_db.query(
    "INSERT INTO `t_travel`(`country`, `city`, `date`, `budget`, `comment`, `contact`, `active`) VALUES (?,?,?,?,?,?,?)",
    [country, city, date, budget, comment, contact, active],
    (err, results) => {
      if (err) {
        console.log("An error happends!");
        console.log(err);
        res.json({
          message: "An error happends!",
          error: err,
        });
      } else {
        console.log("Travel created!");
        res.status(200).json({
          message: "Travel created",
          travelCreated: results,
        });
      }
    }
  );
};

// DELETE
const deleteTravel = (req, res, next) => {
  console.log("El usuario quiere elimar un viaje");
  //destructuring
  const { id_travel } = req.params;
  console.log(`El id del viaje es ${id_travel}`);
  conexion_db.query(
    "DELETE FROM `t_travel` WHERE id_travel = ?",
    [id_travel],
    (err, results) => {
      if (err) throw err;
      res.json("Travel deleted!");
    }
  );
};

// UPDATE 
const updateTravel = (req, res, next) => {
  let { id_travel, country, city, date, budget, comment, contact, active } = req.body;
  conexion_db.query(
    "UPDATE `t_travel` SET country=?, city=?, date=?, budget=?, comment=?, contact=?, active=? WHERE id_travel = ?",
    [country, city, date, budget, comment, contact, active, id_travel],
    (err, results) => {
      if (err) {
        console.log("An error happends!");
        console.log(err);
        res.json({
          message: "An error happends!",
          error: err,
        });
      } else {
        console.log("Travel updated!");
        res.status(200).json({
          message: "Travel updated",
          travelCreated: results,
        });
      }
    }
  );
};

// REGISTER USER
const registerUser = (req, res, next) => {
  console.log("se ejecutó primera parte");

  //destructuramos
  let {
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    telefono_usuario,
    ciudad_usuario,
    pais_usuario,
    password_usuario,
  } = req.body;

  console.log(` /////////////
Soy la linea 31: ${req.body}
/////////////`);

  console.log("se ejecutó segunda parte");

  conexion_db.query(
    "INSERT INTO `t_usuario`(`nombre_usuario`, `apellido_usuario`, `email_usuario`, `telefono_usuario`, `ciudad_usuario`, `pais_usuario`, `password_usuario`) VALUES (?,?,?,?,?,?,?)",
    [
      nombre_usuario,
      apellido_usuario,
      email_usuario,
      telefono_usuario,
      ciudad_usuario,
      pais_usuario,
      password_usuario,
    ],

    (err, results) => {
      console.log("se ejecutó tercera parte");
      if (err) {
        console.log("ENTRO A UN ERROR");
        console.log(err);
      } else {
        console.log("ENTRO A UN BIEN");
        console.log(results);
      }
      console.log("Datos enviados");
    }
  );
  res.send("Datos enviados!");
};

module.exports = {
  getAllTravel,
  getTravel,
  createTravel,
  deleteTravel,
  updateTravel,
  registerUser,
};
