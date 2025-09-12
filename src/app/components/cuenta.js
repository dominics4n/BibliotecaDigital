"use client"

import { useState, useEffect } from 'react';
import LoginForm from './loginform.js';
import RegisterForm from './registrer.js';

export default function MiCuenta() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) setUser({ token });
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  return (
    <div className="mi-cuenta">
      <button className="nav-button" onClick={() => setMenuOpen(!menuOpen)}>
        Mi Cuenta
      </button>
      {menuOpen && (
        <div className="mi-cuenta-menu">
          {user ? (
            <>
              <p>¡Hola, usuario!</p>
              <button className="nav-button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <LoginForm setUser={setUser} />
              <RegisterForm setUser={setUser} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
