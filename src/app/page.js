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
    // Datos de ejemplo
    setLibros([
      { id: 1, titulo: "Fundamentos de Seguridad Informática", autor: "Juan Pérez", anno: 2022, idioma: "Español", categoria: "Seguridad", vistas: 15, url: "/books/seguridad.pdf" },
      { id: 2, titulo: "Machine Learning para Principiantes", autor: "María López", anno: 2021, idioma: "Español", categoria: "IA", vistas: 8, url: "/books/ml.pdf" },
    ]);

    // Revisar si hay token en cookie
    const token = Cookies.get("token");
    if (token) {
      // Puedes llamar a tu API para obtener info real del usuario
      setUser({ nomUsuario: "Invitado" }); // ejemplo
    }
  }, []);

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

      <div className="grid">
        {libros.map(libro => (
          <div key={libro.id} className="card">
            <h2>{libro.titulo}</h2>
            <p>👤 {libro.autor}</p>
            <p>📅 {libro.anno}</p>
            <p>🌐 {libro.idioma}</p>
            <p>📂 {libro.categoria}</p>
            <p>👀 {libro.vistas} vistas</p>
            <a href={libro.url} target="_blank" rel="noopener noreferrer">📖 Leer PDF</a>
          </div>
        ))}
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
