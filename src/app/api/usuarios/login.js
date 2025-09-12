import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const { correo, password } = req.body;

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const user = await db.collection("usuarios").findOne({ correo });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, user.password);
    if (!valido) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, rol: user.rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
