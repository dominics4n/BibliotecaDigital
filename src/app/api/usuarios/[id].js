import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { verificarRol } from "../../../lib/auth";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("biblioteca");

  if (req.method === "GET") {
    const check = verificarRol(req, ["admin"]);
    if (check.error) return res.status(403).json({ error: check.error });

    const user = await db.collection("usuarios").findOne({ _id: new ObjectId(id) });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const check = verificarRol(req, ["admin"]);
    if (check.error) return res.status(403).json({ error: check.error });

    const data = req.body;
    await db.collection("usuarios").updateOne({ _id: new ObjectId(id) }, { $set: data });
    return res.status(200).json({ message: "Usuario actualizado" });
  }

  if (req.method === "DELETE") {
    const check = verificarRol(req, ["admin"]);
    if (check.error) return res.status(403).json({ error: check.error });

    await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "Usuario eliminado" });
  }

  res.status(405).json({ error: "Método no permitido" });
}
