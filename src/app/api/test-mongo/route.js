// src/app/api/test-mongo/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");

    // Listar colecciones como prueba de conexión
    const collections = await db.listCollections().toArray();

    return new Response(
      JSON.stringify({
        message: "✅ Conexión exitosa a MongoDB",
        colecciones: collections.map((c) => c.name),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    return new Response(JSON.stringify({ error: "Error de conexión a MongoDB" }), {
      status: 500,
    });
  }
}
