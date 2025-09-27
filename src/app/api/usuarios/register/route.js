import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    //console.log("📥 Body recibido, soy register/route.js btw: ", body);

    const { nombre, apellido, nomUsuario, correo, password, rol } = body;
    if (!nombre || !apellido || !nomUsuario || !correo || !password || !rol) {
      return new Response(JSON.stringify({ error: "Faltan campos" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("biblioteca");

    // Revisar si el correo ya existe
    const existe = await db.collection("usuarios").findOne({ correo });
    if (existe) {
      return new Response(JSON.stringify({ error: "Usuario ya existe" }), { status: 400 });
    }

    // Hashear contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const nuevo = await db.collection("usuarios").insertOne({
      nombre,
      apellido,
      nomUsuario,
      correo,
      contrasena: hashed,
      rol,
      creado: new Date(),
    });

    //console.log("✅ Usuario insertado:", nuevo.insertedId);

    // Crear token JWT
    const token = jwt.sign(
      { id: nuevo.insertedId, rol},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Devolver token junto con info del usuario
    return new Response(
      JSON.stringify({ message: "Usuario registrado", token, rol}),
      { status: 201 }
    );

  } catch (error) {
    console.error("💥 Error en registro:", error);
    return new Response(JSON.stringify({ error: "Error en servidor" }), { status: 500 });
  }
}
