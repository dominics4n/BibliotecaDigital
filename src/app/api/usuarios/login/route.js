import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Body recibido:", body);
    const { email, password } = body;

    if (!email || !password) {
      console.log("Te falta algo no me preguntes que:", body);
      return new Response(
        JSON.stringify({ error: "Faltan datos de email o password" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const user = await db.collection("usuarios").findOne({ correo: email });
    console.log("Usuario encontrado:", user);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 400 }
      );
    }
    console.log("hola soy password: " + password);
    console.log("hola soy user.password: " + user.contrasena);
    const valido = await bcrypt.compare(password, user.contrasena);
    console.log("Contraseña válida:", valido);
    if (!valido) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas" }),
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ token, rol: user.rol }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Error en servidor" }),
      { status: 500 }
    );
  }
}
