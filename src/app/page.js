"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginModal from "./loginModal";
import "../styles/globals.css";
import AgregarLibro from "./components/agregarlibro"; // Ajusta la ruta si es necesario
// import AgregarUsuario from ".components/agregarUsuario"; // Si tienes este componente
import AgregarArticulo from "./components/agregararticulo";

export default function Biblioteca() {
  const [libros, setLibros] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [usuario, setUser] = useState(null);
  const [articulos, setArticulos] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        if (payload) {
          const parsed = JSON.parse(atob(payload)); // decodifica payload del JWT
          setUser(parsed);
        }
      } catch (err) {
        console.error("Error leyendo token", err);
        setUser(null);
      }
    }
  }, []);
  useEffect(() => {
    if (!usuario) return;
    // Carga libros para ambos roles
    fetch("/api/libros")
      .then((res) => res.json())
      .then((data) => setLibros(data))
      .catch((err) => console.error(err));
    // Solo admin carga artículos
    if (usuario.rol === "admin") {
      fetch("/api/articulos")
        .then((res) => {
          if (!res.ok) throw new Error("No se pudo cargar artículos");
          return res.json();
        })
        .then((data) => setArticulos(data))
        .catch((err) => {
          console.error(err);
          setArticulos([]); // limpia artículos si error
        });
    } else {
      setArticulos([]); // limpia artículos si no es admin
    }
  }, [usuario]);

  const renderAdminSeccion = () => {
    switch (seccionActiva) {
      case "agregarLibro":
        return <AgregarLibro />; // Asegúrate de importar o definir
      case "agregarArticulo":
        return <AgregarArticulo />
      case "agregarUsuario":
        return <AgregarUsuario />; // Asegúrate de importar o definir
      case "libros":
        return libros.length === 0 ? (
          <p className="text-white text-center">No hay libros disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libros.map((libro) => (
              <div key={libro.idLibro} className="bg-gray-800 p-4 rounded-2xl shadow-md">
                <h2>{libro.titulo}</h2>
                <p>👤 Autor: {libro.autorId}</p>
                <p>📅 Año: {libro.anno}</p>
                <p>🌐 Idioma: {libro.idioma}</p>
                <p>📂 Categoría: {libro.categoriaId}</p>
                <p>👀 Vistas: {libro.vistas}</p>
              </div>
            ))}
          </div>
        );
      case "articulos":
        return articulos.length === 0 ? (
          <p className="text-white text-center">No hay artículos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articulos.map((art) => (
              <div key={art.idArticulo} className="bg-gray-800 p-4 rounded-2xl shadow-md">
                <h2>{art.titulo}</h2>
                <p>👤 Autor: {art.autorId}</p>
                <p>📅 Año: {art.anno}</p>
                <p>🌐 Idioma: {art.idioma}</p>
                <p>📂 Categoría: {art.categoriaId}</p>
                <p>👀 Vistas: {art.vistas}</p>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">Bienvenido, {usuario.nomUsuario}</h2>
            <p>Selecciona una sección del menú lateral para comenzar.</p>
          </div>
        );
    }
  };

  const AdminSidebar = () => (
    <aside className="w-64 bg-gray-800 p-4 text-white flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <button className="hover:bg-gray-700 p-2 rounded" onClick={() => setSeccionActiva("inicio")}>Inicio</button>
      <button className="hover:bg-gray-700 p-2 rounded" onClick={() => setSeccionActiva("agregarLibro")}>Agregar Libro / Artículo</button>
      <button className="hover:bg-gray-700 p-2 rounded" onClick={() => setSeccionActiva("agregarUsuario")}>Nuevo Usuario / Admin</button>
      <button className="hover:bg-gray-700 p-2 rounded" onClick={() => setSeccionActiva("libros")}>Libros</button>
      <button className="hover:bg-gray-700 p-2 rounded" onClick={() => setSeccionActiva("articulos")}>Artículos</button>
      <button className="hover:bg-red-700 bg-red-600 p-2 rounded mt-4"
        onClick={() => {
          Cookies.remove("token");
          setUser(null);
          window.location.href = "/";
        }}
      >
        🚪 Cerrar Sesión
      </button>
    </aside>
  );
  if (usuario && usuario.rol === "admin") {
    return (
      <div className="min-h-screen flex bg-gray-900">
        <AdminSidebar />
        <main className="flex-1 p-6">{renderAdminSeccion()}</main>
      </div>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <header>
        <h1>📚 Biblioteca Digital</h1>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Categorías</a></li>
            <li>
              {usuario ? (
                <>
                  <span>Bienvenido, {usuario.nomUsuario}</span>
                  <p></p>
                  <button className="hover:bg-red-700 bg-red-600 p-2 rounded mt-4"
                    onClick={() => {
                      Cookies.remove("token");
                      setUser(null);
                      window.location.href = "/";
                    }}>
                    🚪 Cerrar Sesión
                  </button>
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
          <p className="text-white col-span-full text-center">No hay libros disponibles</p>
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
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} setUser={setUser} />
    </main>
  );
}