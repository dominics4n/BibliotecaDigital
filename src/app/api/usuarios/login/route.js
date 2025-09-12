import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { correo, contrasena } = await req.json();

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const user = await db.collection("usuarios").findOne({ correo });
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 400 });
    }

    const valido = await bcrypt.compare(contrasena, user.contrasena);
    if (!valido) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token, rol: user.rol }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error en servidor" }), { status: 500 });
  }
}
