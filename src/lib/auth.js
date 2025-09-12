// src/lib/auth.js
import jwt from "jsonwebtoken";

export function verificarRol(req, rolesPermitidos = []) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return { error: "No autorizado" };

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!rolesPermitidos.includes(decoded.rol)) {
      return { error: "Permiso denegado" };
    }

    return { user: decoded };
  } catch (err) {
    return { error: "Token inválido" };
  }
}
