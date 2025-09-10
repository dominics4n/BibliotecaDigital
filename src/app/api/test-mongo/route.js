import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");
    const collections = await db.collections();
    return new Response(
      JSON.stringify({
        message: "✅ Conectado a MongoDB",
        colecciones: collections.map(c => c.collectionName),
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
