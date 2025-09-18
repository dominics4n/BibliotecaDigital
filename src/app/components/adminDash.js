"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginModal from "./loginModal";
import AgregarLibro from "./libro"; // componente de agregar libro
import "../styles/globals.css";

export default function AdminDash() {
  const [libros, setLibros] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  // Fetch de libros
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch("/api/libros");
        const data = await res.json();
        setLibros(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLibros();
  }, []);

  // Render del dashboard de admin
  const renderAdmin = () => {
    switch (seccionActiva) {
      case "agregarLibro":
        return <AgregarLibro />;
      case "usuarios":
        return <p className="text-white">Aquí iría la lista de usuarios</p>;
      case "estadisticas":
        return <p className="text-white">Aquí irían las estadísticas</p>;
      default:
        return <p className="text-white">Bienvenido al dashboard de Admin</p>;
    }
  };

  // Render del contenido principal
  const renderContenido = () => {
    if (user?.rol === "admin") {
      return (
        <div className="min-h-screen bg-gray-900 flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 p-4 text-white flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={() => setSeccionActiva("inicio")}
            >
              Inicio
            </button>
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={() => setSeccionActiva("agregarLibro")}
            >
              Agregar Libro
            </button>
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={() => setSeccionActiva("usuarios")}
            >
              Usuarios
            </button>
            <button
              className="hover:bg-gray-700 p-2 rounded"
              onClick={() => setSeccionActiva("estadisticas")}
            >
              Estadísticas
            </button>
            <button
              className="hover:bg-gray-700 p-2 rounded mt-auto"
              onClick={() => {
                Cookies.remove("token");
                setUser(null);
              }}
            >
              Cerrar sesión
            </button>
          </aside>

          {/* Contenido */}
          <main className="flex-1 p-6">{renderAdmin()}</main>
        </div>
      );
    } else {
      // Vista normal de la biblioteca para usuarios
      return (
        <main style={{ padding: "2rem" }}>
          <header className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl">📚 Biblioteca Digital</h1>
            <nav>
              <ul className="flex gap-4">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Categorías</a></li>
                <li>
                  {user ? (
                    <>
                      <span>Bienvenido, {user.nomUsuario}</span>
                      <button
                        onClick={() => { Cookies.remove("token"); setUser(null); }}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      Mi Cuenta
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {libros.map(libro => (
              <div key={libro.idLibro} className="p-4 bg-white/10 backdrop-blur-md rounded shadow">
                <h2 className="font-bold text-lg">{libro.titulo}</h2>
                <p>👤 Autor ID: {libro.autorId}</p>
                <p>📅 Año: {libro.anno}</p>
                <p>🌐 Idioma: {libro.idioma}</p>
                <p>📂 Categoría ID: {libro.categoriaId}</p>
                <p>👀 Vistas: {libro.vistas}</p>
                <p>📄 Formato: {libro.formato}</p>
                <p>📖 Páginas: {libro.paginas}</p>
              </div>
            ))}
          </div>
        </main>
      );
    }
  };

  return (
    <>
      {renderContenido()}

      {/* Modal de login y registro */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </>
  );
}
