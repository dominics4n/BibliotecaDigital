// src/pages/api/libros/route.js
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");
    const libros = await db.collection("libros").find({}).toArray();
    return new Response(JSON.stringify(libros), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");
    const newLibro = await request.json();

    if (!newLibro.titulo || !newLibro.autorId) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }

    const result = await db.collection("libros").insertOne(newLibro);
    return new Response(JSON.stringify({ message: "Libro creado", id: result.insertedId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");
    const { idLibro } = await request.json();

    if (!idLibro) {
      return new Response(JSON.stringify({ error: "Falta idLibro" }), { status: 400 });
    }

    const result = await db.collection("libros").deleteOne({ idLibro: idLibro });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Libro no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Libro eliminado" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db("biblioteca");
    const { idLibro, update } = await request.json();

    if (!idLibro || !update) {
      return new Response(JSON.stringify({ error: "Faltan datos para actualizar" }), { status: 400 });
    }

    const result = await db.collection("libros").updateOne(
      { idLibro: idLibro },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Libro no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Libro actualizado" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

