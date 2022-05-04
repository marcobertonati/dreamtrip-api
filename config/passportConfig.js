// Requerimos passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { conexion_db } = require('./bdConfig');


//CONFIGURACIONES DE PASSPORT JS (MODULAR DESDE ACÁ HASTA DESERIALIZACIÓN)

//Controlador de Logueo, chequea el login
passport.use('local.login', new localStrategy({
    usernameField: 'email_usuario',
    passwordField: 'password_usuario',
    passReqToCallback: true
}, (req, email_usuario, password_usuario, done) => {
    conexion_db.query('SELECT * FROM t_usuario WHERE email_usuario = ?', [email_usuario],
        (err, results) => {

            // console.log(results[0].email_usuario)
            // console.log(results.length);

            if (results.length > 0) {

                console.log(results[0].email_usuario)
                    //(results[0].email_usuario === email_usuario
                    // console.log(results[0].pais_usuario)
                    // if (results[0].length > 0) {

                console.log('Encontré un usuario')

                if (results[0].password_usuario === password_usuario) {
                    console.log('Contraseña correcta')
                    return done(null, results[0]);
                    
                } else {
                    console.log('Contraseña incorrecta')
                    done(null, false, { mensaje: 'Usuario o Contraseña incorrecta', condicion: false });
                }
            } else {
                console.log('Usuario no existe')
                return done(null, false, { mensaje: 'Usuario no existe', condicion: false });
            }
        }
    )
}))

//Controlador de registro
// passport.use('local.registro', new localStrategy({
//     usernameField: 'email_usuario',
//     passwordField: 'password_usuario',
//     passReqToCallback: true
// }, (req, email_usuario, password_usuario, done) => {
//     // console.log(req.body);
//     let newUser = {
//         email_usuario,
//         password_usuario
//     }
//     conexion_db.query('INSERT INTO users SET ?', newUser, (err, results) => {
//         if (err) throw err;
//         newUser.id = results.insertId;
//         done(null, newUser);
//         console.log(results);
//     })
// }))

// Serialización hay que modular
passport.serializeUser((user, done) => {
    console.log(`SEREALIZE: Usuario ${user.email_usuario} encontrado`);
    // console.log(user);
    done(null, user.email_usuario);
});

// Deserealización
passport.deserializeUser((email_usuario, done) => {
    console.log('Entro a la deserialización')
    // console.log(email_usuario)
    conexion_db.query('SELECT * FROM t_usuario WHERE email_usuario=?', [email_usuario], (err, results) => {
        // console.log(results[0])
        done(err, results[0]);
    })
})

module.exports = { passport };