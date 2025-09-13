import { useState } from 'react';
import Cookies from 'js-cookie';

export default function LoginForm({ setUser }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar token y user
        Cookies.set('token', data.token, { expires: 1 });
        setUser({ correo, rol: data.rol });

        // Redirigir según rol
        if (data.rol === 'admin') {
          window.location.href = '/dash/admin';
        } else {
          window.location.href = '/dash/user';
        }
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg max-w-sm mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-white">Iniciar sesión</h2>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
        className="p-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
        className="p-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition-colors p-2 rounded-xl text-white font-semibold"
      >
        Entrar
      </button>
    </form>
  );
}