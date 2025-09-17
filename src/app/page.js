"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginModal from "./loginModal";
import "../styles/globals.css";

export default function Biblioteca() {
  const [libros, setLibros] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Solo para usuarios
    if (user && user.rol === "user") {
      fetch("/api/libros")
        .then((res) => res.json())
        .then((data) => setLibros(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <main style={{ padding: "2rem" }}>
      <header>
        <h1>📚 Biblioteca Digital</h1>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Categorías</a></li>
            <li>
              {user ? (
                <>
                  <span>Bienvenido, {user.nomUsuario}</span>
                  <button onClick={() => { Cookies.remove("token"); setUser(null); }}>Cerrar sesión</button>
                </>
              ) : (
                <button onClick={() => setIsLoginOpen(true)}>Mi Cuenta</button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libros.length === 0 ? (
          <p className="text-white col-span-full text-center">
            No hay libros disponibles
          </p>
        ) : (
          libros.map((libro) => (
            <div key={libro.idLibro} className="bg-gray-800 p-4 rounded-2xl shadow-md">
              <h2>{libro.titulo}</h2>
              <p>👤 Autor: {libro.autorId}</p>
              <p>📅 Año: {libro.anno}</p>
              <p>🌐 Idioma: {libro.idioma}</p>
              <p>📂 Categoría: {libro.categoriaId}</p>
              <p>👀 Vistas: {libro.vistas}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal de login y registro */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </main>
  );
}