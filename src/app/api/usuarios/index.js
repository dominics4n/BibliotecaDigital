import clientPromise from "../../../lib/mongodb";
import { verificarRol } from "../../../lib/auth";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("biblioteca");

  if (req.method === "GET") {
    const check = verificarRol(req, ["admin"]);
    if (check.error) return res.status(403).json({ error: check.error });

    const usuarios = await db.collection("usuarios").find({}).toArray();
    return res.status(200).json(usuarios);
  }

  if (req.method === "POST") {
    const check = verificarRol(req, ["admin"]);
    if (check.error) return res.status(403).json({ error: check.error });

    const body = req.body;
    const result = await db.collection("usuarios").insertOne(body);
    return res.status(201).json({ id: result.insertedId });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
