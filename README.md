minifork idk
# 🌸 Biblioteca Digital 🌸
Pequeña propuesta de plataforma para una biblioteca digital, orientada a temas de Ingeniería. Para que usuarios puedan leer y revisar PDFs y administradores puedan agregar libros y demás

![Progreso](https://img.shields.io/badge/Development-In_progress-991e34?style=for-the-badge&logo=apache-spark)
![Documentacion](https://img.shields.io/badge/Documentation-In_progress-490c19?style=for-the-badge&logo=hackthebox)
![Deep Learning](https://img.shields.io/badge/Test-In_progress-991e34?style=for-the-badge&logo=tensorflow)

## Cómo instalar
### 1️⃣ Clonar el repositorio
```
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
### 2️⃣ Instalar dependencias

Asegúrate de tener Node.js(versión LTS) instalado, usando:
```
npm install
```
### Configurar variables de entorno 

Crea un archivo .env.local en la raíz del proyecto con el siguiente contenido:
```
MONGODB_URI="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<DBNAME>?retryWrites=true&w=majority"
JWT_SECRET="tu_secreto_super_seguro"

```
> Nota: considera que el **JWT_SECRET** debe de ser lo más extenso posible

### 4️⃣ Ejecutar el servidor en modo desarrollo
En terminal debes de escribir
```
npm run dev
```
Posteriormente en tu navegador de confianza debes ir a:
```
http://localhost:3000/
```

## Objetivo

Actividad con constante seguimiento y evolución dado a que está pensada para una materia en específico en el que se planea:

- Identificar posibles **riesgos** y **vulnerabilidades** de aplicaciones en la red
- Implementación de medidas para contrarrestar *riesgos* o *vulnerabilidades*


## Implentaciones

Para este proyecto se usaron los siguientes elementos:

### Lenguajes

 <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,mongo,css&perline=5" alt="Lenguajes y tecnologías"/>
  </a>

### Herramientas

 <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,tailwind,nodejs&perline=5" alt="Lenguajes y tecnologías"/>
  </a>

## Estatus
- **Frontend:** en progreso
- **Backend:** en progreso
- **Base de datos:** conectada
- **Funcionalidad administrador:** en progreso
- **Funcionalidad usuario:** en progreso
- **Registro usuarios:** en progreso

## Novedades

- ✅ Implementación de roles
- ✅ Implementación de formularios para registro y login
- ✅ Validación y seguridad de contraseñas
- ✅ Correxión de datos en base de datos y mododelos JS

## Próximamente

- Dashboard para administradores y usuarios
- Mejoras de UI
- Funcionalidad de búsqueda avanzada
- Adición de categorías
- Adición de libros
- Añadir otro tipo de artículos y documentos académicos

### Revisiones

- usar cors
- 