//PROYECTO FINAL DREAM TRIP: programá desde tu casa
//requerimos express
const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// Ejecutamos el servidor
const app = express();

// MEIDDLEWARE SESSION STORE
const { options } = require("./config/bdConfig");
const sessionStore = new MySQLStore(options);
app.use(
  session({
    secret: "este es mi pequeño secreto",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);

// Requerimos cors
const cors = require("cors");
app.use(cors());

// Middleware que permite lectura de datos del lado del cliente:
// permite que mi app acepte json del lado del cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Requerimos la configuración de passport
// const { passport } = require("./config/passportConfig");
// app.use(passport.initialize());
// app.use(passport.session()); //passport con sesiones

// const isLogin = (req, res, next) => {
//     console.log(`Estoy en la función isLogin`)
//     if (!req.isAuthenticated()) {
//         return next();
//     }
//     return res.redirect('./index.html');
// }

// Requerimos rutas de API

const viajeRouter = require("./routes/viajes");
app.use("/api", viajeRouter);

// Login passport
app.post("/login", (req, res, next) => {
  passport.authenticate("local.login", (err, user, info) => {
    console.log("Entró en autenticar");
    // console.log(`Esto tiene info: ${info.mensaje}`)
    console.log(`Esto tiene user: ${user.nombre_usuario}`);

    if (err) {
      return next(err);
    }
    console.log(err);
    console.log("Paso Next");

    if (!user) {
      return res.send(info);
    }

    console.log(!user);
    console.log("Paso 2 Next");

    req.login(user, function (err) {
      if (err) {
        console.log(`Este el el error de la linea 60: ${err}`);
        return next(err);
      }
      console.log("Paso 3 Next");
      console.log(user);
      return res.send(user);
    });
  })(req, res, next);
});

// app.post('/login', passport.authenticate('local.login', {
//     successRedirect: 'https://www.google.com/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// LogOut
app.get("/logout", (req, res) => {
  console.log("Entro a logout");
  req.logout();
  req.session.destroy();
  console.log("Pasó logout");
});

// Protección de rutas HTML
// app.get('/' , (req,res) => {
//     console.log('Entro a la raíz de la página web')
//     if(req.isAuthenticated()) {
//         console.log('Entro a index ya que no está logueado')
//         res.redirect('index.html')
//     } else {
//         console.log('Entro login ya que no está logueado')
//         res.redirect('pages/login.html')
//     }
// })

// Envio de Front end - con esto logramos enviarle al usuario todo el front.
// app.use(express.static(path.parse(__dirname).dir + '/front'));

// chequeamos que nos esté escuchando
app.listen(8080, () => {
  console.log("escuchando en el puerto 8080");
});
