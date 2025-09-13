"use client";

import { useState } from "react";
import AgregarLibro from "./libro"; // tu componente de agregar libro
// Puedes importar más componentes como ListaUsuarios, Estadisticas, etc.

export default function AdminDash() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  const renderSeccion = () => {
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
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">{renderSeccion()}</main>
    </div>
  );
}
