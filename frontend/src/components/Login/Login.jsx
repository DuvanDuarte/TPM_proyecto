import Home from "../Home/Home";
import "./Login.css";
import "../../../src/animations.css"
import { useState, useEffect } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginSuccesful, setLoginSuccesful] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(prev => !prev);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    console.log("userRole cambió a:", userRole);
  }, [userRole]);

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Token:", result.token);

        if (result.token) {
          localStorage.setItem("token", result.token);

          const decoded = parseJwt(result.token);
          console.log("Datos decodificados del token:", decoded); // <-- Aquí imprimes todo el contenido

          const roleName = roleMap[decoded?.idRol] || null; // Convertir número a texto
          setUserRole(roleName);

          if (roleName) {
            console.log("Rol válido, login exitoso:", roleName);
            setLoginSuccesful(true);
          } else {
            console.log("Rol inválido o no encontrado");
            setLoginSuccesful(false);
          }
        } else {
          setLoginSuccesful(false);
        }
      })
      .catch(console.error);
  };

  return (
    <>
      {loginSuccesful ? (
        <Home userRole={userRole} />
    ) : (
      <>
        <header>
          <h2 className="logo">TM-Pro</h2>
          <input type="checkbox" id="check" />
          <span className="mostrar-menu" onClick={toggleMenu}>
            &#8801;
          </span>
          <nav className={`menu ${menuOpen ? "open" : ""}`}>
            <a href="#" onClick={closeMenu}>Inicio</a>
            <a href="#" onClick={closeMenu}>Contacto</a>
            <a href="#IniciarSesion" onClick={closeMenu}>Iniciar Sesion</a>
            <span className="esconder-menu" onClick={closeMenu}>
              &#215;
            </span>
          </nav>
        </header>

        <section className="seccion1">
          <h1 className="title1">Deportista</h1>
          <img className="deportista" src="/src/assets/images/corriendo.png" alt="Deportista corriendo" />
        </section>

        <section id="IniciarSesion" className="seccion2">
          <button onClick={toggleForm} className="login-toggle-button">
            Iniciar Sesión
          </button>
          {showForm && (
            <div className="modal-backdrop" onClick={toggleForm}>
              <div
                className="login-form-container"
                onClick={e => e.stopPropagation()} // evitar cerrar al click dentro del form
              >
                <h2>Iniciar Sesión</h2>
                <form
                  action="/login"
                  method="post"
                  onSubmit={handdleLogin}
                >
                  <label htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    placeholder="Ingrese su usuario"
                  />

                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="Ingrese su contraseña"
                  />

                  <div className="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                  </div>

                  <button type="submit" className="submit-button">Entrar</button>
                </form>
              </div>
            </div>
          )}
        </section>
      </>
    )}
    </>
  );
};

function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error parsing JWT:", e);
    return null;
  }
}

const roleMap = {
  1: "Admin",
  2: "Entrenador",
  3: "Deportista"
};

export default Login;
