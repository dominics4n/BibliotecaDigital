import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const existe = await db.collection("usuarios").findOne({ correo });
    if (existe) return res.status(400).json({ error: "Usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const nuevo = {
      nombre,
      correo,
      password: hashed,
      rol: rol || "user",
    };

    const result = await db.collection("usuarios").insertOne(nuevo);
    res.status(201).json({ message: "Usuario registrado", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
