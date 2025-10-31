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

  useEffect(() => {
  const frases = [
    { texto: "El dolor que sientes hoy será la fuerza que sentirás mañana.", autor: "Anónimo" },
    { texto: "En la vida hay algo peor que el fracaso: el no haber intentado nada.", autor: "Franklin D. Roosvelt"},
    { texto: "La disciplina vence al talento cuando el talento no se disciplina.", autor: "Desconocido" },
    { texto: "El fracaso es éxito si aprendemos de él.",  autor: "Malcolm Forbes"},
    { texto: "Tu cuerpo puede soportar casi todo. Es tu mente la que debes convencer.", autor: "Anónimo" },
    { texto: "La mente es todo. Lo que piensas, te conviertes.", autor: "Buda"},
    { texto: "Cree en ti mismo y serás imparable.", autor: "Anónimo" },
    { texto: "Quién se rinde ante un problema, no demuestra fuerza ni caracter", autor: "Salomón"},
    { texto: "Cada día es una nueva oportunidad para mejorar.", autor: "Desconocido" },
    { texto: "No he fracasado. He encontrado 10.000 formas que no funcionan.", autor: "Thomas Edison" },

  ];

  let index = 0;
  const fraseEl = document.getElementById("frase-texto");
  const autorEl = document.querySelector(".autor");

  const cambiarFrase = () => {
    if (fraseEl && autorEl) {
      fraseEl.classList.add("fade-out");
      autorEl.classList.add("fade-out");
      setTimeout(() => {
        index = (index + 1) % frases.length;
        fraseEl.textContent = frases[index].texto;
        autorEl.textContent = "— " + frases[index].autor;
        fraseEl.classList.remove("fade-out");
        autorEl.classList.remove("fade-out");
      }, 800);
    }
  };

  const intervalo = setInterval(cambiarFrase, 6000);
  return () => clearInterval(intervalo);
}, []);

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

        if (result.token) {
          localStorage.setItem("token", result.token);
          const decoded = parseJwt(result.token);
          setUserData(decoded); // Guardamos todo el payload del token
          const roleName = roleMap[decoded?.idRol] || null; // Convertir número a texto
          setUserRole(roleName);

          if (roleName) {
            console.log("Rol válido, login exitoso:");
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
            <img className="logo" src="/src/assets/images/logo.png"></img>
            <input type="checkbox" id="check" />
            <span className="mostrar-menu" onClick={toggleMenu}>
              &#8801;
            </span>
            <nav className={`menu ${menuOpen ? "open" : ""}`}>
              <a href="#" onClick={closeMenu}>Inicio</a>
              <a href="#contacto" onClick={closeMenu}>Contacto</a>
              <a href="#IniciarSesion" onClick={toggleForm}>Iniciar Sesion</a>
              <span className="esconder-menu" onClick={closeMenu}>
                &#215;
              </span>
            </nav>
          </header>

          <section className="seccion1">
            <h1 className="title1">Training<br />Master <br /><span className="resaltado">PRO</span></h1>
            <img className="deportista" src="/src/assets/images/corriendo.png" alt="Deportista corriendo" />
            <button onClick={toggleForm} className="login-toggle-button">
              INICIAR SESIÓN
            </button> 
          </section>

          <section id="IniciarSesion" className="seccion2">

            <div className="frase-contenedor">
              <div className="comillas">“</div>
              <p className="frase-texto" id="frase-texto">
                El dolor que sientes hoy será la fuerza que sentirás mañana.
              </p>
              <div className="autor">— Anónimo</div>
            </div>

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

            <img className="divisor" src="/src/assets/images/divisor.svg" alt="Divisor decorativo" />

          <section className="seccion3">
            <h2 className="eventos-title">PRÓXIMOS EVENTOS</h2>

            <div className="eventos-container" id="eventosContainer">
              <div className="evento-card">
                <div className="evento-info">
                  <div className="evento-fecha">JUN, 6</div>
                  <h3>Miércoles</h3>
                  <p>Texto Aquí</p>
                </div>
                <div className="evento-bg"></div>
                <button className="evento-btn">›</button>
              </div>

              <div className="evento-card">
                <div className="evento-info">
                  <div className="evento-fecha">JUN, 17</div>
                  <h3>Lunes</h3>
                  <p>Texto Aquí</p>
                </div>
                <div className="evento-bg"></div>
                <button className="evento-btn">›</button>
              </div>

              <div className="evento-card">
                <div className="evento-info">
                  <div className="evento-fecha">JUL, 18</div>
                  <h3>Martes</h3>
                  <p>Texto Aquí</p> 
                </div>
                <div className="evento-bg"></div>
                <button className="evento-btn">›</button>
              </div>
            </div>
          </section>
            
            <img className="divisor" src="/src/assets/images/divisorvolteado.svg" alt="Divisor decorativo" />

          <section className="seccion4" id="contacto">
            <div className="contacto-contenedor">
              <div className="contacto-texto">
                <h1 className="contacto-titulo">¿Tienes alguna pregunta?</h1>
                <p className="contacto-descripcion">
                  No dudes en contactarnos para hacernos cualquier pregunta o para empezar a utilizar nuestro sistema.
                </p>

                <div className="contacto-info">
                  <div className="contacto-item">
                    <h3>Dirección</h3>
                    <p>Calle 84 # 33AA - 01,<br />Medellín, COL</p>
                  </div>

                  <div className="contacto-item">
                    <h3>Teléfono</h3>
                    <p><a href="tel:+573185841030">+57 318 584 1030</a></p>
                    <p><a href="mailto:trainingmasterpro@gmail.com">trainingmasterpro@gmail.com</a></p>
                  </div>
                </div>
              </div>

              <div className="contacto-mapa">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.1462126979045!2d-75.60883282245807!3d6.2400440651089975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44299aba2ce02f%3A0x894f3fba259837cd!2sCorporaci%C3%B3n%20Universitaria%20Adventista!5e0!3m2!1ses!2sco!4v1756246927781!5m2!1ses!2sco"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
          <footer>
              <p>
                  &copy;2025 Training Master Pro. Todos los derechos reservados.
              </p>
          </footer>
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
