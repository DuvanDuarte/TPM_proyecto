import Home from "../Home/Home";
import "./Login.css";
import { useState, useEffect } from "react";
import { roleMap } from '../../utils/roles';

const Login = () => {
  const [password, setPassword] = useState("");
  const [documento, setDocumento] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loginSuccesful, setLoginSuccesful] = useState(false);
  const [userData, setUserData] = useState(null);
  const toggleForm = () => setShowForm(prev => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    console.log("userRole cambió a:", userRole); //Aparece el nuevo rol loggeado
  }, [userRole]);

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = { documento, password };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Token:", result.token); //Aparece en web el token

        if (result.token) {
          localStorage.setItem("token", result.token);
          const decoded = parseJwt(result.token);
          console.log("Datos decodificados del token:", decoded); // <-- Aquí imprimes todo el contenido
          setUserData(decoded); // Guardamos todo el payload del token
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
        <Home userRole={userRole} userData={userData} />
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
              <a href="#IniciarSesion" onClick={toggleForm}>Iniciar Sesion</a>
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
                  className="form-container single-column"
                  onClick={e => e.stopPropagation()} // evitar cerrar al click dentro del form
                >
                  <h2>Iniciar Sesión</h2>
                  <form
                    action="/login"
                    method="post"
                    onSubmit={handdleLogin}
                  >
                    <div className="form-group">
                      <label htmlFor="documento">Documento</label>
                      <input
                        type="text"
                        id="documento"
                        name="documento"
                        value={documento}
                        onChange={(event) => setDocumento(event.target.value)}
                        required
                        placeholder="Ingrese su documento"
                      /></div>

                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        placeholder="Ingrese su contraseña"
                      /></div>

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

export default Login;
