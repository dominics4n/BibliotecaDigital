import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📥 Body recibido:", body);

    const { nombre, correo, password } = body;
    if (!nombre || !correo || !password) {
      return new Response(JSON.stringify({ error: "Faltan campos" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const existe = await db.collection("usuarios").findOne({ correo });
    if (existe) {
      return new Response(JSON.stringify({ error: "Usuario ya existe" }), { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log("🔑 Password hasheado:", hashed);

    const nuevo = await db.collection("usuarios").insertOne({
      nombre,
      correo,
      password: hashed,
      rol: "user",
      creado: new Date(),
    });

    console.log("✅ Usuario insertado:", nuevo.insertedId);

    return new Response(JSON.stringify({ message: "Usuario registrado", id: nuevo.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("💥 Error en registro:", error);
    return new Response(JSON.stringify({ error: "Error en servidor" }), { status: 500 });
  }
}
