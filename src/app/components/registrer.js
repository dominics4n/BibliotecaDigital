import { useState } from 'react';
import Cookies from 'js-cookie';

export default function RegisterForm({ setUser }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nomUsuario, setNomUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido,
          nomUsuario,
          contrasena: password,
          correo,
          rol: "user", // valor por defecto según tu esquema
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set('token', data.token, { expires: 1 });
        setUser({ correo, nomUsuario });
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la conexión");
    }
  };

  return (
    <form onSubmit={handleRegister} className="glass-card">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nomUsuario}
        onChange={(e) => setNomUsuario(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
