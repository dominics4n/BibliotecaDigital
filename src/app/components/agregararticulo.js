"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function agregarArticulo() {
  const [titulo, setTitulo] = useState("");
  const [issn, setIssn] = useState("");
  const [autorId, setAutorId] = useState("");
  const [anno, setAnno] = useState("");
  const [idioma, setIdioma] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [formato, setFormato] = useState("");
  const [paginas, setPaginas] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAgregarArticulo = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!titulo || !issn || !autorId) {
      setError("Título, ISSN y autor son obligatorios");
      return;
    }

    const token = Cookies.get("token");

    try {
      const res = await fetch("/api/articulos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          ISSN: issn,
          autorId: Number(autorId),
          anno: Number(anno),
          idioma,
          categoriaId: Number(categoriaId),
          publisherId: Number(publisherId),
          fechaCarga: new Date(),
          vistas: 0,
          formato,
          paginas: Number(paginas),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Artículo agregado correctamente!");
        // Limpiar campos
        setTitulo("");
        setIssn("");
        setAutorId("");
        setAnno("");
        setIdioma("");
        setCategoriaId("");
        setPublisherId("");
        setFormato("");
        setPaginas("");
      } else {
        setError(data.error || "Error al agregar artículo");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="max-w-md p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Agregar Artículo</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form className="flex flex-col gap-2" onSubmit={handleAgregarArticulo}>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" className="p-2 rounded border outline-none" />
        <input value={issn} onChange={(e) => setIssn(e.target.value)} placeholder="ISSN" className="p-2 rounded border outline-none" />
        <input value={autorId} onChange={(e) => setAutorId(e.target.value)} placeholder="ID del autor" className="p-2 rounded border outline-none" />
        <input value={anno} onChange={(e) => setAnno(e.target.value)} placeholder="Año" type="number" className="p-2 rounded border outline-none" />
        <input value={idioma} onChange={(e) => setIdioma(e.target.value)} placeholder="Idioma" className="p-2 rounded border outline-none" />
        <input value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} placeholder="ID categoría" className="p-2 rounded border outline-none" />
        <input value={publisherId} onChange={(e) => setPublisherId(e.target.value)} placeholder="ID publisher" className="p-2 rounded border outline-none" />
        <input value={formato} onChange={(e) => setFormato(e.target.value)} placeholder="Formato" className="p-2 rounded border outline-none" />
        <input value={paginas} onChange={(e) => setPaginas(e.target.value)} placeholder="Número de páginas" type="number" className="p-2 rounded border outline-none" />
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded mt-2">Agregar Artículo</button>
      </form>
    </div>
  );
}
