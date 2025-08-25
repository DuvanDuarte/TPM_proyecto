import Home from "../Home/Home";
import "./Login.css";
import "../../../src/animations.css"
import { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginSuccesful, setLoginSuccesful] = useState(false);

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.token);

        if (result.token) {
          localStorage.setItem("token", result.token);
          setLoginSuccesful(true);
        } else {
          setLoginSuccesful(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>{loginSuccesful ? (<Home />

    ) : (
      <>
        <header>
          <h2 className="logo">TM-Pro</h2>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="mostrar-menu">
            &#8801;
          </label>
          <nav className="menu">
            <a href="#">Inicio</a>
            <a href="#">Contacto</a>
            <a href="#IniciarSesion">Iniciar Sesion</a>
            <label htmlFor="check" className="esconder-menu">
              &#215;
            </label>
          </nav>
        </header>

        <section className="seccion1">
          <h1 className="title1">Deportista</h1>
          <img className="deportista" src="/src/assets/images/corriendo.png" alt="Deportista corriendo" />
        </section>

        <section id="IniciarSesion" className="seccion2">
          <div id="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handdleLogin} action="/login" method="post">
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

              <button type="submit">Entrar</button>
            </form>
          </div>
        </section>
      </>
    )}
    </>
  );
};


export default Login;
