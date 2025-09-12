import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { correo, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const user = await db.collection("usuarios").findOne({ correo });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
    }

    // Verificar contraseña
    const valido = await bcrypt.compare(password, user.password);
    if (!valido) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 400 });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token, rol: user.rol });
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: "Error en servidor" }, { status: 500 });
  }
}
