"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css"; // importa tu CSS nativo

export default function Biblioteca() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const mockLibros = [
      {
        id: 1,
        titulo: "Fundamentos de Seguridad Informática",
        autor: "Juan Pérez",
        anno: 2022,
        idioma: "Español",
        categoria: "Seguridad",
        vistas: 15,
        url: "/books/seguridad.pdf",
      },
      {
        id: 2,
        titulo: "Machine Learning para Principiantes",
        autor: "María López",
        anno: 2021,
        idioma: "Español",
        categoria: "IA",
        vistas: 8,
        url: "/books/ml.pdf",
      },
    ];
    setLibros(mockLibros);
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <header>
        <h1>📚 Biblioteca Digital</h1>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Categorías</a></li>
            <li><a href="#">Mi cuenta</a></li>
          </ul>
        </nav>
      </header>

      <div className="grid">
        {libros.length > 0 ? (
          libros.map((libro) => (
            <div key={libro.id} className="card">
              <h2>{libro.titulo}</h2>
              <p>👤 {libro.autor}</p>
              <p>📅 {libro.anno}</p>
              <p>🌐 {libro.idioma}</p>
              <p>📂 {libro.categoria}</p>
              <p>👀 {libro.vistas} vistas</p>
              <a href={libro.url} target="_blank" rel="noopener noreferrer">
                📖 Leer PDF
              </a>
            </div>
          ))
        ) : (
          <p>No hay libros disponibles todavía.</p>
        )}
      </div>
    </main>
  );
}
