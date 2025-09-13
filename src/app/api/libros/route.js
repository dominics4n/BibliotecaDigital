import clientPromise from "../../../lib/mongodb";

export const POST = async (req) => {
  try {
    const { titulo, ISBN, autorId, anno, editorialId, idioma, categoriaId, fechaCarga, vistas, formato, paginas } =
      await req.json();

    // Validación mínima
    if (!titulo || !ISBN || !autorId) {
      return new Response(JSON.stringify({ error: "Título, ISBN y autor son obligatorios" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("biblioteca");

    const nuevoLibro = {
      titulo,
      ISBN,
      autorId,
      anno,
      editorialId,
      idioma,
      categoriaId,
      fechaCarga: fechaCarga ? new Date(fechaCarga) : new Date(),
      vistas: vistas || 0,
      formato,
      paginas,
    };

    const result = await db.collection("libros").insertOne(nuevoLibro);

    return new Response(JSON.stringify({ message: "Libro agregado", libroId: result.insertedId }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error en servidor" }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("BibliotecaDigital");

    const libros = await db.collection("libros").find({}).toArray();

    return new Response(JSON.stringify(libros), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error al obtener libros" }), { status: 500 });
  }
};
