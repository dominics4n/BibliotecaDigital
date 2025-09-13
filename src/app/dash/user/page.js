"use client";

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AdminDash() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const rol = localStorage.getItem('rol');
    if (!token || rol !== 'user') router.push('/login');
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenido a tu Biblioteca</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sección: Libros disponibles */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📚 Explorar Libros</h2>
          <button
            onClick={() => (window.location.href = "/dash/user/libros")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl w-full"
          >
            Ver todos los libros
          </button>
        </div>

        {/* Sección: Mis préstamos */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📖 Mis Préstamos</h2>
          <button
            onClick={() => (window.location.href = "/dash/user/prestamos")}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl w-full"
          >
            Consultar mis libros prestados
          </button>
        </div>

        {/* Sección: Perfil */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">👤 Mi Perfil</h2>
          <button
            onClick={() => (window.location.href = "/dash/user/perfil")}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl w-full"
          >
            Ver / Editar Perfil
          </button>
        </div>
      </div>
    </main>
  );
}