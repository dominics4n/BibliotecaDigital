export const UsuarioSchema = {
  id_Usuario: Number,
  nombre: String,
  apellido: String,
  nomUsuario: String,
  password: String,
  rol: {type:String, default: "user"},
  correo: String,
};