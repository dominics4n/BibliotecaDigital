export const UsuarioSchema = {
  id_Usuario: Number,
  nombre: String,
  apellido: String,
  nomUsuario: String,
  contrasena: String,
  rol: {type:String, default: "user"},
  correo: String,
};